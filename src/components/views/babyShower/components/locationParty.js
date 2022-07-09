import { faWaze } from '@fortawesome/free-brands-svg-icons'
import { faGlassCheers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Box,
  Button,
  Divider,
  Typography
} from '@material-ui/core'
import React from 'react'

const LocationParty = ({ invitado }) => {
  return (
    <>
      <Typography
        align='left'
        variant='h3'
        style={{
          fontSize: '1.65rem',
          color: '#424242',
          fontWeight: 'bold',
          background: 'white',
          borderRadius: 8,
          padding: 4,
          marginTop: 80
        }}
      >
          Acompañanos a nuestra recepción
      </Typography>
      <Box height={8} />
      <Box maxWidth={600} margin='auto'>
        <Box display='flex' alignItems='center' />
        <Box flex={1} padding={2}>
          <Box minWidth={150}>
            <FontAwesomeIcon
              icon={faGlassCheers}
              size='5x'
              display='block'
              color='#125490'
            />
          </Box>
          <Typography align='center' variant='h2'>
              6:00 PM
          </Typography>
          <Typography align='center' variant='h4'>
              Hacienda de Los Miranda, acceso sobre la calle Antigua Ferrocarril
          </Typography>
          <Divider />
          {invitado && (
            <Box>
              <Typography style={{ fontSize: '2rem', fontWeight: 'bold', color: '#212121' }}>{`Hemos reservado ${invitado.count} espacios`}</Typography>
              <Typography style={{ color: '#f57c00', fontWeight: 'bold', marginTop: 16 }}>Favor confirmar asistencia.</Typography>
            </Box>
          )}
          <a
            href='https://waze.com/ul?ll=13.67828111,-89.24509764&navigate=yes'
            target='_blank'
            style={{ textDecoration: 'none' }}
          >
            <Button
              size='large'
              startIcon={<FontAwesomeIcon icon={faWaze} />}
              style={{ background: '#4caf50', color: 'white' }}
              color='secondary'
            >
                Ver ubicación
            </Button>
          </a>
        </Box>
        <Box height={40} />
        <Typography align='right' variant='h5' style={{ padding: 8, borderRadius: 8, background: '#ffffffee' }}>
            Confirmar asistencia...
        </Typography>
      </Box>

    </>
  )
}

export default LocationParty
