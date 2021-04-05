import { useMediaQuery, useTheme } from '@material-ui/core'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'
const Hojas2 = () => {
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))
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
  return (
    <>
      <Img
        fluid={images.cornerUpLeft.childImageSharp.fluid}
        style={{
          position: 'absolute',
          overflow: 'hidden',
          top: 0,
          width: '100%',
          maxWidth: 200,
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
          maxWidth: 200,
          right: 0,
          zIndex: 0
        }}
      />
      <Img
        fluid={images.center.childImageSharp.fluid}
        style={{
          position: 'absolute',
          top: isSm ? 'calc(50vh - 190px)' : 'calc(50vh - 290px)',
          left: 'calc(50% - 180px)',
          width: 380,
          zIndex: 0
        }}
      />
    </>
  )
}

export default Hojas2
