import { faCheckDouble } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import loadable from '@loadable/component'
import {
  Backdrop,
  Box,
  Button,
  CircularProgress, Container,
  Hidden,
  Typography,
  useMediaQuery,
  useTheme
} from '@material-ui/core'
import firebase from 'gatsby-plugin-firebase'
import React, { useEffect, useState } from 'react'
import Foto1 from './components/fotos1'
import Hojas2 from './components/hojas2'
import useController from './controller'
import useStyle from './style'

const FlipPage = loadable(() => import('react-flip-page'))
const ConfirmDialog = loadable(() => import('./components/confirmDialog'))
const Hojas = loadable(() => import('./components/hojas'))
const Location = loadable(() => import('./components/location'))
const LocationParty = loadable(() => import('./components/locationParty'))

const Invitacion = props => {
  const classes = useStyle()
  const ctrl = useController()
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))
  const path = props.location.pathname.split('/')
  const id = path[path.length - 1]
  const [invitado, setInvitado] = useState(null)
  const init = async () => {
    try {
      const doc = await firebase
        .firestore()
        .collection('invitados')
        .doc(id)
        .get()
      if (doc.exists) {
        setInvitado({ ...doc.data(), id: doc.id })
      } else {
        console.log('no existe')
      }
    } catch (error) {}
  }
  useEffect(
    () => {
      init()
    },
    [id]
  )
  return (
    <Container maxWidth='md' disableGutters style={{ textAlign: 'center' }}>
      <Hidden smDown>
        <Box height={60} />
      </Hidden>
      <Box marign='auto' height='100vh' maxHeight={800}>
        <FlipPage
          className='book'
          responsive
          showSwipeHint
          uncutPages
          orientation='horizontal' // pageBackground='transparent'
          animationDuration='400'
        >
          <article>
            <Container>
              <Hojas2 />
              <Box textAlign='center' position='relative'>
                <Typography
                  variant='h1'
                  align='center'
                  style={{
                    fontSize: '3rem',
                    margin: 'auto',
                    lineHeight: '.1',
                    paddingTop: isSm
                      ? 'calc(50vh - 95px)'
                      : 'calc(50vh - 155px)',
                    color: '#424242',
                    zIndex: 2
                  }}
                >
                  Baby shower
                </Typography>
                <Typography
                  variant='h1'
                  align='center'
                  style={{
                    fontSize: '3rem',
                    margin: 'auto',
                    lineHeight: '1.5',
                    color: '#333',
                    zIndex: 2
                  }}
                >
                  de
                </Typography>
                <Typography
                  variant='h1'
                  align='center'
                  style={{
                    fontSize: '4rem',
                    margin: 'auto',
                    lineHeight: '.2',
                    marginTop: 0,
                    color: '#e91e63',
                    zIndex: 2
                  }}
                >
                  Lucía Celina!
                </Typography>
                <Typography
                  variant='body1'
                  align='center'
                  style={{
                    fontSize: '1.2rem',
                    width: 280,
                    margin: 'auto',
                    marginTop: 60,
                    lineHeight: '1',
                    color: '#ff5722',
                    zIndex: 2,
                    textAlign: "center"
                  }}
                >
                  Los angelitos del cielo están celebrando la llegada de esta nueva bendición, y todos en la tierra nos alegramos y celebramos con amor
                </Typography>
              </Box>
            </Container>
          </article>
          <article>
            <Container>
              <Hojas2 />
              <Container disableGutters style={{ position: 'relative' }}>
                <Box height={100} />
                <Location invitado={invitado}/>
              </Container>
            </Container>
          </article>
          {/* <article>
            <Container>
              <Hojas2 />
              <Container disableGutters style={{ position: 'relative' }}>
                <Box height={40} />
                <LocationParty invitado={invitado} />
              </Container>
            </Container>
          </article> */}
          <article>
            <Hojas2 />
            <Box height={280} />
            <Button
              onClick={ctrl.handleOpen(invitado)}
              disableElevation
              variant='contained'
              color='primary'
              size='large'
              startIcon={
                <FontAwesomeIcon
                  icon={faCheckDouble}
                  size='3x'
                  style={{ fontSize: '1rem' }}
                />
              }
            >
              Confirmar asistencia
            </Button>
          </article>
          <article>
            <Foto1 />
            <Typography
              style={{
                position: 'absolute',
                bottom: 80,
                zIndex: 12,
                color: 'white',
                // left: 0,
                fontSize: '3rem',
                fontWeight: 'bold',
                left: 'calc(50vw - 120px)'
                // textShadow: '2px 2px 3px #000'
              }}
            >
              ¡Te esperamos!
            </Typography>
          </article>
        </FlipPage>
      </Box>
      <Backdrop open={ctrl.loading} className={classes.backdrop}>
        <CircularProgress color='inherit' />
      </Backdrop>
      <ConfirmDialog ctrl={ctrl} />
    </Container>
  )
}

export default Invitacion
