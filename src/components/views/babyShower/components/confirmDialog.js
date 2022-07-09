import { faCheckDouble, faThumbsUp, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@material-ui/core'
import React from 'react'

const ConfirmDialog = ({ ctrl }) => {
  return (
    <Dialog
      open={ctrl.open}
      onClose={ctrl.handleClose}
      fullWidth
      maxWidth='sm'
      fullScreen={ctrl.isSm}
    >
      <form onSubmit={ctrl.formik.handleSubmit} noValidate autoComplete='off'>
        <DialogContent
          style={{ height: ctrl.isSm ? 'calc(100vh - 60px)' : 'auto' }}
        >
          <Typography align='center' variant='h4' style={{ color: '#424242' }}>
            <FontAwesomeIcon icon={faCheckDouble} style={{ marginRight: 8 }} />
            Confirmar asistencia
          </Typography>
          <Box height={24} />
          <Box padding={1}>
            <TextField
              {...ctrl.formikProps('nombre', 'Nombre')}
              fullWidth
              variant='outlined'
            />
            <Box height={16} />
            <FormControl component='fieldset'>
              <RadioGroup row {...ctrl.formikProps('asistira', 'Asistire')}>
                <Typography variant='h5' style={{ alignSelf: 'center' }}>
                  Asistire
                </Typography>
                <Box width={16} />
                <FormControlLabel
                  value='SI'
                  control={<Radio color='primary' />}
                  label='SI'
                />
                <FormControlLabel
                  value='NO'
                  control={<Radio color='primary' />}
                  label='NO'
                />
              </RadioGroup>
            </FormControl>
          </Box>
          <Divider />
          <Box height={24} />
          {/* <Box padding={2} bgcolor='#fffde7' borderRadius={16}>
            <Typography align='center' variant='h6'>
              IMPORTANTE
            </Typography>
            <Typography align='justify' variant='body1'>
              {`
                Estaremos tomando todas las medidas de bioseguridad. Recuerda mantener el distanciamiento físico, llevar tu mascarilla, alcohol gel pero sobre todo ganas de disfrutar.
              `}
            </Typography>
          </Box> */}
          <Typography style={{
            zIndex: 12,
            color: '#333',
            fontSize: '.85rem',
            fontWeight: 'bold'
          }}
          >
            {'*Agradecemos muestras de cariño en regalo de sobre'}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            type='submit'
            variant='contained'
            disabled={!ctrl.formik.isValid}
            disableElevation
            style={{ width: 200, color: 'white' }}
            color='primary'
            startIcon={<FontAwesomeIcon icon={faThumbsUp} />}
          >
            ACEPTAR
          </Button>
          <Button onClick={ctrl.handleClose} startIcon={<FontAwesomeIcon icon={faTimes} />}>CANCELAR</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default ConfirmDialog
