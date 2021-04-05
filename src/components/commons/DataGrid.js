import { faSync } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import loadable from '@loadable/component'
import React, { useEffect, useMemo, useState } from 'react'

import AddBox from '@material-ui/icons/AddBox'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import Check from '@material-ui/icons/Check'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Clear from '@material-ui/icons/Clear'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import FilterList from '@material-ui/icons/FilterList'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'

// import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'
import { getCollection, update } from './utils/firebaseUtils'

export const TableIcons = {
  Add: React.forwardRef((props, ref) => <AddBox {...props} ref={ref} color='#2196F3' />),
  Check: React.forwardRef((props, ref) => <Check {...props} ref={ref} htmlColor='#2196F3' />),
  Clear: React.forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: React.forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: React.forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: React.forwardRef((props, ref) => <Edit {...props} ref={ref} htmlColor='#2196F3' />),
  Export: React.forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: React.forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: React.forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: React.forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: React.forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: React.forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: React.forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: React.forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: React.forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: React.forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: React.forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
}
// const MySwal = withReactContent(Swal)
const MaterialTable = loadable(() => import('material-table'))

const MatGrid = ({ collectionName, condition, columns, data, actions, extraFields, ...props }) => {
  const tableRef = React.createRef()
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState([])
  const refresh = _callback => {
    setLoading(true)
    getCollection({
      name: collectionName,
      condition: condition,
      callback: resp => {
        const dataList = resp.map(dt => ({ ...dt.data, id: dt.id }))
        setList(dataList)
        setLoading(false)
        typeof _callback === 'function' && _callback()
      }
    })
  }
  const actionsList = collectionName ? [
    {
      icon: () => <FontAwesomeIcon icon={faSync} />,
      onClick: refresh,
      // onClick: () => tableRef.current && tableRef.current.onQueryChange(),
      isFreeAction: true
    }
  ].concat(actions || []) : (actions || [])
  const editableConfig = {
    onRowAdd: newData =>
      new Promise((resolve, reject) => {
        try {
          if (props.addCondition) {
            if (!props.addCondition.validation()) {
              reject(new Error('Condición'))
              window.alert(props.addCondition.message)
              return
            }
          }
          setLoading(true)
          update({
            name: collectionName,
            oper: 'add',
            values: {
              ...newData,
              ...(extraFields || {})
            },
            callback: () => {
              setLoading(false)
              refresh(resolve)
            }
          })
        } catch (error) {
          reject(error)
        }
      }),
    onRowUpdate: (newData, oldData) =>
      new Promise((resolve, reject) => {
        try {
          setLoading(true)
          update({
            name: collectionName,
            oper: 'edit',
            id: oldData.id,
            values: {
              ...newData
            },
            callback: () => {
              setLoading(false)
              refresh(resolve)
            }
          })
        } catch (error) {
          reject(error)
        }
      }),
    onRowDelete: oldData =>
      new Promise((resolve, reject) => {
        try {
          setLoading(true)
          update({
            name: collectionName,
            oper: 'del',
            id: oldData.id,
            callback: () => {
              setLoading(false)
              refresh(resolve)
            }
          })
        } catch (error) {
          reject(error)
        }
      })
  }
  useEffect(() => {
    collectionName && refresh()
    !collectionName && setList(data)
    console.log('use Effect data Grid')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, condition])
  const columnsConfig = useMemo(() => columns)
  return (
    <MaterialTable
      icons={TableIcons}
      tableRef={tableRef}
      style={{
        background: 'transparent',
        boxShadow: 'none',
        width: '100%'
      }}
      localization={{
        body: {
          editRow: {
            deleteText: 'Esta seguro de eliminar este registro?'
          }
        },
        toolbar: {
          searchPlaceholder: 'Buscar'
        },
        grouping: {
          groupedBy: 'Agrupado por:'
        }
      }}
      isLoading={loading}
      data={list}
      editable={editableConfig}
      options={{
        addRowPosition: 'first',
        pageSizeOptions: [10, 20, 50, 100],
        pageSize: 10,
        paginationType: 'normal',
        headerStyle: {
          background: '#fcfcfc',
          whiteSpace: 'nowrap',
          width: 'auto'
        },
        exportButton: true
      }}
      actions={actionsList}
      // columns={JSON.parse(JSON.stringify(columnsConfig))}
      columns={columnsConfig}
      {...props}
    />
  )
}

export default MatGrid
