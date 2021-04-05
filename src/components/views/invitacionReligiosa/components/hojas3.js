import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'
const Hojas3 = () => {
  const images = useStaticQuery(graphql`
    query {
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
    </>
  )
}

export default Hojas3
