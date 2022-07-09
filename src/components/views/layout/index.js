import { CssBaseline } from "@material-ui/core"
import { ThemeProvider } from "@material-ui/core/styles"
import { graphql, useStaticQuery } from "gatsby"
import BackgroundImage from "gatsby-background-image"
import React from "react"
import useStyle from "./style"
import Snowfall from "react-snowfall"
import "./style.css"
import theme from "./theme"

const MainLayout = props => {
  const classes = useStyle()
  const data = useStaticQuery(
    graphql`
      query {
        desktop: file(relativePath: { eq: "texture.jpg" }) {
          childImageSharp {
            fluid(quality: 100) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `
  )
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Snowfall
        color="#7bc1ed"
        snowflakeCount={100}
      />
      <main>{props.children}</main>
    </div>
  )
}

export default props => {
  return (
    <ThemeProvider theme={theme}>
      <MainLayout {...props} />
    </ThemeProvider>
  )
}
