import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'
const Hojas = () => {
  const images = useStaticQuery(graphql`
    query {
      cornerUpLeft: file(relativePath: { eq: "top.png" }) {
        childImageSharp {
          fluid(maxWidth: 160, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      cornerBottomRight: file(relativePath: { eq: "bottom_left.png" }) {
        childImageSharp {
          fluid(maxWidth: 360, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      rightMiddle: file(relativePath: { eq: "right_middle.png" }) {
        childImageSharp {
          fluid(maxWidth: 360, quality: 90) {
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
          maxWidth: 280,
          right: 0
        }}
      />
      <Img
        fluid={images.cornerBottomRight.childImageSharp.fluid}
        style={{
          position: 'absolute',
          overflow: 'hidden',
          bottom: 0,
          width: '100%',
          maxWidth: 320,
          left: 0
        }}
      />
      <Img
        fluid={images.rightMiddle.childImageSharp.fluid}
        style={{
          position: 'absolute',
          overflow: 'hidden',
          top: '20vh',
          width: '100%',
          maxWidth: 200,
          right: 0
        }}
      />
    </>
  )
}

export default Hojas
