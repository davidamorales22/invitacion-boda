import React from 'react'
import Layout from '../components/views/layout'
import Seo from '../components/views/layout/seo'
import Invitados from '../components/views/mtto'

export default function Home (props) {
  return <Layout><Seo title='Mantenimiento' /><Invitados {...props} /></Layout>
}
