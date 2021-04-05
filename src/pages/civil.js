import React from 'react'
import Layout from '../components/views/layout'
import Seo from '../components/views/layout/seo'
import InvitacionCivil from '../components/views/invitacionCivil'

export default function Home (props) {
  return <Layout><Seo title='¡NOS CASAMOS!' /><InvitacionCivil {...props} /></Layout>
}
