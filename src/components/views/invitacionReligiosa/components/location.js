import { faWaze } from '@fortawesome/free-brands-svg-icons'
import { faChurch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Box,
  Button,
  Typography
} from '@material-ui/core'
import React from 'react'

const location = () => {
  return (
    <>
      <Typography
        align='center'
        variant='h3'
        style={{
          borderBottom: '1px solid #d6a03d',
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: '#424242'
        }}
      >
            Sabado 15 de mayo del 2021
      </Typography>
      <Box height={16} />
      <Box maxWidth={600} margin='auto'>
        <Box flex={1} padding={1}>
          <FontAwesomeIcon
            icon={faChurch}
            size='5x'
            display='block'
            color='#125490'
          />
          <Typography align='center' variant='body2'>
                  Misa
          </Typography>
          <Typography align='center' variant='h2'>
                  4:00 pm
          </Typography>
          <Typography align='center' variant='h4'>
            {'Parroquia Nuestra Señora de Guadalupe (Colonia Las Delicias, Santa Tecla)'}
          </Typography>
          <Box height={16} />
          <a
            href='https://waze.com/ul?ll=13.67113984,-89.30049062&navigate=yes'
            target='_blank'
            style={{ textDecoration: 'none' }}
          >
            <Button
              size='large'
              startIcon={<FontAwesomeIcon icon={faWaze} />}
              // variant='outlined'
              style={{ background: '#4caf50', color: 'white' }}
              color='secondary'
            >
              Ver ubicación
            </Button>
          </a>
        </Box>
        <Box height={80} />
        <Typography align='right' variant='h5' style={{ padding: 8, borderRadius: 8, background: '#ffffffee' }}>
            y luego...
        </Typography>
      </Box>

    </>
  )
}

export default location
