import { faCheckDouble } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import loadable from '@loadable/component'
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  colors,
  Container,
  Hidden,
  Typography,
  useMediaQuery,
  useTheme
} from '@material-ui/core'
import firebase from 'gatsby-plugin-firebase'
import React, { useEffect, useState } from 'react'
import Foto1 from './components/fotos1'
import Hojas2 from './components/hojas2'
import Hojas3 from './components/hojas3'
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
                    fontSize: '7rem',
                    width: 300,
                    margin: 'auto',
                    lineHeight: '.3',
                    paddingTop: isSm
                      ? 'calc(50vh - 95px)'
                      : 'calc(50vh - 165px)',
                    color: '#424242',
                    zIndex: 2
                  }}
                >
                  Edgard
                </Typography>
                <Typography
                  variant='h1'
                  align='center'
                  style={{
                    fontSize: '4rem',
                    width: 300,
                    margin: 'auto',
                    lineHeight: '2.5',
                    color: '#333',
                    zIndex: 2
                  }}
                >
                  &
                </Typography>
                <Typography
                  variant='h1'
                  align='center'
                  style={{
                    fontSize: '7rem',
                    width: 300,
                    margin: 'auto',
                    lineHeight: '.2',
                    marginTop: 0,
                    color: '#424242',
                    zIndex: 2
                  }}
                >
                  Jensy
                </Typography>
              </Box>
            </Container>
          </article>
          <article>
            <Container>
              <Hojas2 />
              <Box height={140} />
              {invitado &&
                <Typography
                  style={{
                    fontSize: '2.5rem',
                    textAlign: 'justify',
                    position: 'relative',
                    fontWeight: 'bold',
                    padding: 8,
                    color: 'white', // borderBottom: '1px solid #333',
                    background: 'rgb(20 99 162)'
                  }}
                >
                  {invitado.name}
                </Typography>}
              <Typography
                style={{
                  fontSize: '2rem',
                  position: 'relative',
                  color: '#424242',
                  textAlign: 'left',
                  textShadow: '1px 2px 3px white',
                  background: 'rgba(255,255,255,0.5)',
                  borderRadius: 24
                }}
              >
                {
                  'Con la bendición de nuestros padres, tenemos la dicha de celebrar nuestra unión en el sacramento del matrimonio y queremos que seas parte de él'
                }
                <br />
                <br />
                {'Se llevará a cabo el día….'}
              </Typography>
              <Typography
                style={{
                  fontSize: '1.6rem',
                  position: 'relative',
                  color: '#424242',
                  textAlign: 'right',
                  textShadow: '1px 2px 3px white',
                  background: 'rgba(255,255,255,0.5)',
                  borderRadius: 24,
                  marginTop: 100
                }}
              >
                {''}
              </Typography>
            </Container>
          </article>
          <article>
            <Container>
              <Hojas2 />
              <Container disableGutters style={{ position: 'relative' }}>
                <Box height={100} />
                <Location />
              </Container>
            </Container>
          </article>
          <article>
            <Container>
              <Hojas2 />
              <Container disableGutters style={{ position: 'relative' }}>
                <Box height={40} />
                <LocationParty invitado={invitado} />
              </Container>
            </Container>
          </article>
          <article>
            <Hojas2 />
            <Box height={280} />
            <Button
              onClick={ctrl.handleOpen(invitado)}
              disableElevation
              variant='contained'
              style={{
                width: 310,
                margin: 'auto',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1.85rem',
                background: colors.green[500],
                borderRadius: 24,
                boxShadow: '10px 10px 20px #d9d9d9, -10px -10px 20px #ffffff'
              }}
              color='primary'
              size='large'
              startIcon={
                <FontAwesomeIcon
                  icon={faCheckDouble}
                  size='3x'
                  style={{ fontSize: '2rem' }}
                />
              }
            >
              Confirmar
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
