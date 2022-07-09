import { faPaperPlane, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button, Container, Grid, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import React from 'react'
import ChildrensForm from './ChildrensForm'
import ParentsForm from './ParentsForm'

const Main = ({ ctrl, theme, classes }) => {
  return (
    <Container>
      <Box height={24} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
          <Typography variant='h4' align='center' className={classes.title}>
            <strong>
                  Querido Santa...
            </strong>
          </Typography>
          <Typography align='center' variant='h6' color='secondary'>
                Llena todos los campos y da click en ENVIAR
          </Typography>
          {/* LISTADO DINAMICO CARTA A SANTA POR CADA HIJO */}
          {ctrl.childrens &&
            new Array(ctrl.childrens)
              .fill(0, 0, ctrl.childrens)
              .map((_loop, index) => (
                <ChildrensForm
                  key={`children-form-${index}`}
                  formikProps={ctrl.formikArrayProps}
                  level={index}
                  onDelete={ctrl.handleDelete}
                />
              ))}
          {/* AGREGAR UNA CARTA EN LA MISMA PETICiON */}
          <Box textAlign='center'>
            <Button
              size='small'
              className={classes.addButton}
              startIcon={<FontAwesomeIcon icon={faPlus} />}
              onClick={ctrl.handleAdd}
              disabled={ctrl.loading}
            >
              Agregar otra carta
            </Button>
          </Box>
          <Box height={theme.spacing(2)} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} style={{ borderLeft: '4px solid #E0E0E0' }}>
          <ParentsForm formikProps={ctrl.formikProps} />

          <Box height={theme.spacing(8)} />

        </Grid>
      </Grid>
      <Button
        fullWidth
        variant='contained'
        disableElevation
        size='large'
        type='submit'
        className={classes.submitButton}
        startIcon={<FontAwesomeIcon icon={faPaperPlane} />}
        disabled={ctrl.loading}
      >
        Enviar Carta
      </Button>
      <Box height={theme.spacing(2)} />
      {!ctrl.formik.isValid && (
        <Alert severity='error'>Existen campos sin completar</Alert>
      )}
      <Box height={24} />
      <Box height={theme.spacing(3)} />
    </Container>
  )
}

export default Main
