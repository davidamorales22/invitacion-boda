import React from 'react'
import Layout from '../components/views/layout'
import Seo from '../components/views/layout/seo'
import InvitacionReligiosa from '../components/views/invitacionReligiosa'

export default function Home (props) {
  return <Layout><Seo title='¡NOS CASAMOS!' /><InvitacionReligiosa {...props} /></Layout>
}
