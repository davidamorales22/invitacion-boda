import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'
const Foto1 = () => {
  const images = useStaticQuery(graphql`
    query {
      foto: file(relativePath: { eq: "heidy/heidy_antonio.jpeg" }) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  return (
    <>
      <Img
        fluid={images.foto.childImageSharp.fluid}
        style={{
          height: '100%'
        }}
      />
    </>
  )
}

export default Foto1
