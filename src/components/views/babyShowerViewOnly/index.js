import { faWaze } from "@fortawesome/free-brands-svg-icons"
import {
  faChevronCircleDown
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  Box, Button, Container, Grid, Table, TableCell, TableRow, Typography, useMediaQuery,
  useTheme
} from "@material-ui/core"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import React, { useRef } from "react"
import "./index.css"

const BabyShowerViewOnly = () => {
  const messagesEndRef = useRef();
  const images = useStaticQuery(graphql`
    query {
      background: file(
        relativePath: { eq: "matias/baby-shower-mat-background.jpeg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 800, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      tipicos: file(
        relativePath: { eq: "matias/logo-tipicos-margoth-250.png" }
      ) {
        childImageSharp {
          fluid(maxWidth: 560, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down("sm"))
  return (
    <Container maxWidth="md" disableGutters style={{ textAlign: "center" }}>
      <Box textAlign="center" position="relative" maxWidth={600} margin="auto">
        <Img
          fluid={images.background.childImageSharp.fluid}
          style={{
            position: "absolute",
            overflow: "hidden",
            width: "600px",
            zIndex: -1,
            left: "calc(50% - 300px)",
          }}
        />
        <Box height={430} />
        <Box>
          <Typography
            style={{
              fontSize: "1.3rem",
              color: "rgb(138 85 43)",
              margin: "auto",
              maxWidth: 460,
              transform: "uppercase",
            }}
          >
            LA DULCE ESPERA ESTÁ POR TERMINAR: <br /> ACOMPAÑANOS A CELEBRAR LA
            LLEGADA DE
          </Typography>
          <Typography
            variant="h4"
            style={{
              fontSize: "3.6rem",
              color: "#ce9b00",
              fontWeight: "bold",
            }}
          >
            Baby Matias
          </Typography>
        </Box>
      </Box>
      <Box height={48} />
      <Box
        className="bounce"
        onClick={() => {
          messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <FontAwesomeIcon icon={faChevronCircleDown} size="3x" color="#03a9f4" />
      </Box>
      <Box height={100} />
      <Box textAlign="center" position="relative">
        <Box
          margin="auto"
          maxWidth={400}
          style={{
            borderTop: "2px dashed #bdbdbd",
            paddingTop: 36,
          }}
        >
          <Grid
            container
            spacing={2}
            alignContent="flex-start"
            alignItems="flex-start"
          >
            <Grid item xs={6} style={{ borderRight: "1px solid #a0a0a0" }}>
              <Table>
                <TableRow>
                  <TableCell align="center" style={{ borderBottom: "none" }}>
                    <Typography
                      style={{
                        transform: "rotate(270deg)",
                        fontFamily: "Poppins",
                        fontSize: "2.1rem",
                        position: "absolute",
                        marginTop: -13,
                        lineHeight: 1,
                        marginLeft: -64,
                        fontWeight: "bold",
                        color: "rgb(70 70 70)",
                      }}
                    >
                      Domingo
                    </Typography>
                  </TableCell>
                  <TableCell align="center" style={{ borderBottom: "none" }}>
                    <Typography
                      style={{
                        fontSize: "7.5rem",
                        lineHeight: 1,
                        color: "#ce9b00",
                      }}
                    >
                      17
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "3rem",
                        lineHeight: 1,
                        color: "#1082cd",
                      }}
                    >
                      Julio
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    colSpan={2}
                    align="center"
                    style={{ borderBottom: "none", padding: 0, lineHeight: 1 }}
                  >
                    <Typography style={{ fontSize: "1.35rem", lineHeight: 1 }}>
                      Hora: 8:00 AM
                    </Typography>
                  </TableCell>
                </TableRow>
              </Table>
            </Grid>
            <Grid item xs={6} style={{ borderRight: "1px dashed #a0a0a0" }}>
              <Img
                fluid={images.tipicos.childImageSharp.fluid}
                style={{
                  width: "100%",
                }}
              />
              <Typography variant="h6">Bambú City Center</Typography>
              <a
                href="https://waze.com/ul?ll=13.6920146,-89.2372416&navigate=yes"
                target="_blank"
                style={{ textDecoration: "none" }}
              >
                <Button
                  size="large"
                  startIcon={<FontAwesomeIcon icon={faWaze} />}
                  style={{
                    background: "#0f82cd",
                    color: "white",
                    marginTop: 24,
                  }}
                  color="default"
                >
                  Ver ubicación
                </Button>
              </a>
            </Grid>
          </Grid>
        </Box>

        <Box textAlign="center" marginTop={8}>
          <Typography
            variant="h5"
            style={{
              color: "#333",
              fontSize: "1rem",
            }}
          >
            Mesa de regalo :
          </Typography>
          <Typography style={{ color: "red", fontSize: "3rem" }}>
            SIMAN
          </Typography>
          <Typography style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
            A nombre de Laura Vela
          </Typography>
        </Box>
        <Box height={48} />
        {/* <Box height={24} /> */}
        {/* <Img
          fluid={images.bottom.childImageSharp.fluid}
          style={{
            maxWidth: isSm ? 280 : 300,
            margin: "auto",
          }}
        /> */}
      </Box>
        <div ref={messagesEndRef} />
    </Container>
  )
}

export default BabyShowerViewOnly
