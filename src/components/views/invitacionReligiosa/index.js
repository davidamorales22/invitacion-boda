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

const Invitacion = (props) => {
  const classes = useStyle()
  const ctrl = useController()
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))
  const path = props.location.pathname.split('/')
  const id = path[path.length - 1]
  const [invitado, setInvitado] = useState(null)
  const init = async () => {
    const doc = await firebase.firestore().collection('invitados').doc(id).get()
    if (doc.exists) {
      setInvitado({ ...doc.data(), id: doc.id })
    } else {
      console.log('no existe')
    }
  }
  useEffect(() => {
    init()
  }, [id])
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
          orientation='horizontal'
          // pageBackground='transparent'
          animationDuration='400'
        >
          <article>
            <Container>
              <Hojas2 />
              <Box
                textAlign='center'
                position='relative'
              >
                <Typography
                  variant='h1'
                  align='center'
                  style={{
                    fontSize: '5rem',
                    width: 300,
                    margin: 'auto',
                    lineHeight: '.3',
                    // marginTop: isSm
                    //   ? 'calc(50vh - 210px)'
                    //   : 'calc(50vh - 300px)',
                    paddingTop: isSm ? 'calc(50vh - 65px)' : 'calc(50vh - 165px)',
                    color: '#424242',
                    zIndex: 2
                  }}
                >
                  Laura
                </Typography>
                <Typography
                  variant='h1'
                  align='center'
                  style={{
                    fontSize: '2rem',
                    width: 300,
                    margin: 'auto',
                    lineHeight: '2.3',
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
                    fontSize: '5rem',
                    width: 300,
                    margin: 'auto',
                    lineHeight: '.5',
                    marginTop: 0,
                    color: '#424242',
                    zIndex: 2
                  }}
                >
                  David
                </Typography>
              </Box>
            </Container>
          </article>
          <article>
            <Container>
              <Hojas3 />
              <Box height={120} />
              {invitado && (
                <Typography
                  style={{
                    fontSize: '2rem',
                    textAlign: 'justify',
                    position: 'relative',
                    fontWeight: 'bold',
                    color: '#424242',
                    borderBottom: '1px solid #333'
                  }}
                >
                  {invitado.name}
                </Typography>
              )}
              <Typography
                style={{
                  fontSize: '1.6rem',
                  position: 'relative',
                  color: '#424242',
                  textAlign: 'left',
                  textShadow: '1px 2px 3px white',
                  background: 'rgba(255,255,255,0.5)',
                  borderRadius: 24
                }}
              >
                {
                  'Tenemos el honor de invitarte a celebrar nuestra unión matrimonial, se llevará acabo el día... '
                }
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
              <Hojas3 />
              <Container disableGutters style={{ position: 'relative' }}>
                <Box height={100} />
                <Location />
              </Container>
            </Container>
          </article>
          <article>
            <Container>
              <Hojas3 />
              <Container disableGutters style={{ position: 'relative' }}>
                <Box height={40} />
                <LocationParty invitado={invitado} />
              </Container>
            </Container>
          </article>
          <article>
            <Hojas3 />
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
                fontSize: '1.65rem',
                textTransform: 'uppercase',
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
            <Typography style={{
              position: 'absolute',
              bottom: 80,
              zIndex: 12,
              color: 'white',
              left: 0,
              fontSize: '2rem',
              fontWeight: 'bold'
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
