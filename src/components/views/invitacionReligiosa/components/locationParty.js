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
          fontSize: '1.35rem',
          color: '#424242',
          fontWeight: 'bold',
          background: 'white',
          borderRadius: 8,
          padding: 4
        }}
      >
          Nos gustaría que nos acompañes a celebrar
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
              color='#f57c00'
            />
          </Box>
          <Typography align='center' variant='h4'>
              8:30 PM
          </Typography>
          <Typography align='center' variant='h5'>
              Hotel Barolo
          </Typography>
          <Divider />
          {invitado && (
            <Box>
              <Typography style={{ color: '#f57c00', fontWeight: 'bold' }}>TE SENTARÁS EN</Typography>
              <Typography style={{ fontSize: '2rem', fontWeight: 'bold', color: '#212121' }}>{`MESA ${invitado.table}`}</Typography>
              <Divider />
              <Typography style={{ color: '#f57c00', fontWeight: 'bold', marginTop: 16 }}>RESERVADO PARA</Typography>
              <Typography style={{ fontSize: '2rem', fontWeight: 'bold', color: '#212121' }}>{`${invitado.count} PERSONAS`}</Typography>
            </Box>
          )}
          <a
            href='https://waze.com/ul?ll=13.7089805,-89.2359586&navigate=yes'
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
