import { faWaze } from '@fortawesome/free-brands-svg-icons'
import { faCheckDouble, faGlassCheers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Backdrop,
  Box,
  Button,
  Card,
  CircularProgress,
  colors,
  Container,
  Typography
} from '@material-ui/core'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import React, { useEffect } from 'react'
import ConfirmDialog from './components/confirmDialog'
import useController from './controller'
import useStyle from './style'

const SantaLetter = () => {
  const classes = useStyle()
  const ctrl = useController()
  const images = useStaticQuery(graphql`
    query {
      center: file(relativePath: { eq: "center.png" }) {
        childImageSharp {
          fluid(maxWidth: 960, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      cornerUpLeft: file(relativePath: { eq: "corner_up_left.png" }) {
        childImageSharp {
          fluid(maxWidth: 960, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      cornerBottomRight: file(relativePath: { eq: "corner_down_right.png" }) {
        childImageSharp {
          fluid(maxWidth: 960, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  useEffect(
    () => {
      const element = document.getElementById(
        `child-form-id-${ctrl.childrens - 1}`
      )
      if (element !== null) {
        element.scrollIntoView && element.scrollIntoView(false)
      }
    },
    [ctrl.childrens]
  )
  return (
    <Container maxWidth='sm' disableGutters>
      {/* <Box height={36} textAlign='center' /> */}
      <Card className={classes.root}>
        <Img
          fluid={images.cornerUpLeft.childImageSharp.fluid}
          style={{
            position: 'absolute',
            overflow: 'hidden',
            top: 0,
            width: '100%',
            maxWidth: 340,
            left: 0,
            zIndex: 0
          }}
        />
        <Img
          fluid={images.cornerBottomRight.childImageSharp.fluid}
          style={{
            position: 'absolute',
            overflow: 'hidden',
            bottom: 0,
            width: '100%',
            maxWidth: 340,
            right: 0,
            zIndex: 0
          }}
        />
        <Box height={40} />
        <Box width={380} margin='auto' position='relative'>
          <Img
            fluid={images.center.childImageSharp.fluid}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              maxWidth: 400,
              zIndex: 0
            }}
          />
          <Typography
            variant='h1'
            align='center'
            style={{
              fontSize: '5rem',
              position: 'relative',
              width: 300,
              margin: 'auto',
              lineHeight: '.3',
              marginTop: 80,
              paddingTop: 134,
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
              position: 'relative',
              width: 300,
              margin: 'auto',
              lineHeight: '2.3',
              color: '#424242',
              zIndex: 2
            }}
          >
            y
          </Typography>
          <Typography
            variant='h1'
            align='center'
            style={{
              fontSize: '5rem',
              position: 'relative',
              width: 300,
              margin: 'auto',
              lineHeight: '1',
              marginTop: 0,
              color: '#424242',
              zIndex: 2
            }}
          >
            David
          </Typography>
        </Box>
        <Box padding={2} position='relative'>
          <Box height={124} />
          <Typography
            align='center'
            variant='body2'
            style={{ textTransform: 'uppercase' }}
          >
            Te invitamos a celebrar nuestra boda CIVIL
          </Typography>
          <Typography
            align='center'
            variant='h5'
            style={{
              borderBottom: '1px solid #d6a03d',
              textTransform: 'uppercase'
            }}
          >
            Sabado 6 de marzo del 2021
          </Typography>
          <Box height={30} />
          <Box display='flex' alignItems='center'>
            <Box>
              <FontAwesomeIcon
                icon={faGlassCheers}
                size='5x'
                display='block'
                color='#d6a242'
              />
              <Box height={16} />
              <a
                href='https://waze.com/ul?ll=13.467633, -89.057668&navigate=yes'
                target='_blank'
                style={{ textDecoration: 'none' }}
              >
                <Button
                  size='large'
                  startIcon={<FontAwesomeIcon icon={faWaze} />}
                  variant='contained'
                  color='secondary'
                  style={{ fontWeight: 'bold', fontSize: '1.35rem' }}
                >
                  Ver ubicación
                </Button>
              </a>
            </Box>
            <Box flex={1} padding={2}>
              <Typography align='center' variant='body2'>
                El Rosario, La Paz
              </Typography>
              <Typography align='center' variant='h2'>
                4:30 pm
              </Typography>
            </Box>
          </Box>
          <Box height={80} />
          <Button
            onClick={ctrl.handleOpen}
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
            startIcon={<FontAwesomeIcon icon={faCheckDouble} size='3x' style={{ fontSize: '2rem' }} />}
          >
            Confirmar
          </Button>
          <Box height={30} />
        </Box>
      </Card>
      <Backdrop open={ctrl.loading} className={classes.backdrop}>
        <CircularProgress color='inherit' />
      </Backdrop>
      <ConfirmDialog ctrl={ctrl} />

      <Box height={36} />
      {/* <Box height={80} /> */}
    </Container>
  )
}

export default SantaLetter
