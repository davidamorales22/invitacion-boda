
import { useMediaQuery, useTheme } from '@material-ui/core'
import { useFormik } from 'formik'
import { useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import * as Yup from 'yup'
import Api from '../../commons/Api'
import { formikUtil, msg } from '../../commons/utils'

const MySwal = withReactContent(Swal)

export default function useController () {
  const theme = useTheme()
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  /*
   * OBJECTI DE FORMULARIO Y VALIDACIONES
  */
  const formik = useFormik({
    initialValues: {
      nombre: '',
      asistira: 'SI'
    },
    validationSchema: Yup.object().shape({
      nombre: Yup.string().required(msg.required),
      asistira: Yup.string().required(msg.required)
    }),
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true)
      accept()
    }
  })
  const formikUtils = formikUtil(formik)
  const accept = async () => {
    /*
      ENVIA LA INFORAMCION DE LA CARTA
    */
    setLoading(true)
    try {
      setOpen(false)
      await Api.frAdd('confirmados_civil', {
        nombre: formik.values.nombre,
        asistira: formik.values.asistira
      })
      MySwal.fire('', 'Gracias por confirmas tu asistencia, te esperamos el 6 de Marzo.', 'success')
      formik.resetForm()
    } catch (error) {
      MySwal.fire('ERROR', 'Ocurrio un error', 'error')
      console.log(error)
    }
    setLoading(false)
  }
  return {
    formik: formik,
    formikProps: formikUtils.formikProps,
    formikArrayProps: formikUtils.formikArrayProps,
    isSm: useMediaQuery(theme.breakpoints.down('sm')),
    loading,
    open,
    handleOpen: () => {
      setOpen(true)
    },
    handleClose: () => {
      setOpen(false)
      formik.resetForm()
    }
  }
}