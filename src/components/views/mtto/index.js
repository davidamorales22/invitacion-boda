import { faSync } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import loadable from '@loadable/component'
import { getCollection, update } from '../../commons/utils/firebaseUtils'
import { TableIcons } from '../../commons/DataGrid'
const MaterialTable = loadable(() => import('material-table'))
const Invitados = () => {
  const tableRef = React.createRef()
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState([])
  const collectionName = 'invitados'
  const refresh = _callback => {
    setLoading(true)
    getCollection({
      name: collectionName,
      callback: resp => {
        const dataList = resp.map(dt => ({ ...dt.data, id: dt.id }))
        setList(dataList)
        setLoading(false)
        typeof _callback === 'function' && _callback()
      }
    })
  }
  const actionsList = [{
    icon: () => <FontAwesomeIcon icon={faSync} />,
    onClick: refresh, // onClick: () => tableRef.current && tableRef.current.onQueryChange(),
    isFreeAction: true
  }]
  const editableConfig = {
    onRowAdd: newData => new Promise(
      (resolve, reject) => {
        try {
          setLoading(true)
          console.log('newData', newData)
          update({
            name: collectionName,
            oper: 'add',
            values: {
              ...newData
            },
            callback: () => {
              setLoading(false)
              refresh(resolve)
            }
          })
        } catch (error) {
          console.log('error => ', error)
          reject(error)
        }
      }
    ),
    onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {
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
    onRowDelete: oldData => new Promise((resolve, reject) => {
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
    refresh()
  }, [])
  return (
    <div>

      <MaterialTable
        icons={TableIcons}
        tableRef={tableRef}
        title='Invitados'
        columns={[
          {
            title: 'Nombre',
            field: 'name'
          },
          {
            title: 'Acompañantes',
            field: 'count',
            type: 'number'
          },
          // {
          //   title: 'Mesa',
          //   field: 'table',
          //   type: 'number',
          //   defaultGroupOrder: 0,
          //   defaultSort: 'asc',
          //   customSort: (a, b) => Number(a) - Number(b)
          // },
          {
            title: 'Asistira',
            field: 'asistira',
            type: 'boolean'
          },
          {
            title: 'Link',
            editable: 'never',
            render: rowData => (
              <a target='_blank' href={`/invitado/${rowData.id}`}>Generar link</a>
            )
          }
        ]}
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
          exportButton: true,
          grouping: true
        }}
        actions={actionsList}
      />
    </div>
  )
}

export default Invitados
