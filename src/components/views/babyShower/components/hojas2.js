import { useMediaQuery, useTheme } from '@material-ui/core'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'
const Hojas2 = () => {
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))
  const images = useStaticQuery(graphql`
    query {
      center: file(relativePath: { eq: "heidy/flores_1.jpeg" }) {
        childImageSharp {
          fluid(maxWidth: 960, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  return (
    <>
      <Img
        fluid={images.center.childImageSharp.fluid}
        style={{
          position: 'absolute',
          top: isSm ? '0px' : 'calc(50vh - 330px)',
          left: 'calc(50% - 250px)',
          width: 500,
          zIndex: 0
        }}
      />
    </>
  )
}

export default Hojas2
