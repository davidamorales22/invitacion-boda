import { faWaze } from "@fortawesome/free-brands-svg-icons"
import { faBaby } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, Button, Hidden, Typography } from "@material-ui/core"
import React from "react"

const location = ({ invitado }) => {
  return (
    <Box textAlign="center" position="relative">
      <Hidden smDown>
        <Box height={80} />
      </Hidden>
      <Hidden mdUp>
        <Box height={60} />
      </Hidden>
      <FontAwesomeIcon
        icon={faBaby}
        size="5x"
        display="block"
        color="#e91e63"
      />
      <Typography
        align="center"
        variant="h3"
        style={{
          borderBottom: "1px solid #d6a03d",
          fontSize: "2rem",
          fontWeight: "bold",
          color: "#9c27b0",
          margin: "auto",
          maxWidth: 260,
        }}
      >
        Domingo 3 de Julio del 2022
      </Typography>
      <Box height={16} />
      <Box maxWidth={600} margin="auto">
        {invitado && (
          <Box>
            <Typography
              style={{
                fontSize: "1rem",
              }}
            >
              {invitado.name}
            </Typography>
            <Typography
              style={{
                fontSize: ".87rem",
                fontWeight: "bold",
                color: "#212121",
              }}
            >{`Hemos reservado ${invitado.count} espacios`}</Typography>
          </Box>
        )}
        <Box flex={1} padding={1}>
          <Typography align="center" variant="h2">
            8:00 am
          </Typography>
          <Typography align="center" variant="h4">
            {"Pampa El volcan"}
          </Typography>
          <Typography align="center" variant="body2">
            {"Muestras de cariño en regalo de sobre."}
          </Typography>
          <Box height={16} />
          <a
            href="https://waze.com/ul?ll=13.717463,-89.2772627&navigate=yes"
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            <Button
              size="large"
              startIcon={<FontAwesomeIcon icon={faWaze} />}
              // variant='outlined'
              style={{ background: "#4caf50", color: "white" }}
              color="secondary"
            >
              Ver ubicación
            </Button>
          </a>
        </Box>
      </Box>
    </Box>
  )
}

export default location
