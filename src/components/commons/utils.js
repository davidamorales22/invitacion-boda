/*
  FORMIK UTILS
*/
export const formikUtil = formik => ({
  formikProps: (name, label, emptyValue = '') => ({
    name: name,
    label: label,
    value:
      typeof formik.values[name] !== 'undefined'
        ? formik.values[name]
        : emptyValue,
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    error: !!(formik.touched[name] && formik.errors[name]),
    helperText: formik.touched[name] ? formik.errors[name] : emptyValue
  }),
  formikArrayProps: (array, index, name, label, emptyValue = '') => {
    return {
      name: `${array}.${index}.${name}`,
      label: label,
      value:
        typeof formik.values[array][index][name] !== 'undefined'
          ? formik.values[array][index][name]
          : emptyValue,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
      error: !!(
        formik.touched[array] &&
        formik.touched[array][index] &&
        formik.touched[array][index][name] &&
        formik.errors[array] &&
        formik.errors[array][index] &&
        formik.errors[array][index][name]
      ),
      helperText:
        formik.touched[array] &&
        formik.touched[array][index] &&
        formik.touched[array][index][name] &&
        formik.errors[array] &&
        formik.errors[array][index] &&
        formik.touched[array][index][name]
          ? formik.errors[array][index][name]
          : emptyValue
    }
  }
})
export const msg = {
  required: 'Este campo es requerido',
  email: 'Ingresa un correo electronico valido',
  phonneLength: 'El numero debe ser de 8 digitos'
}
