import React from 'react'
import Layout from '../components/views/layout'
import Seo from '../components/views/layout/seo'
// import IncitacionReligiosa from '../components/views/invitacionReligiosa'
// import BabyShower from '../components/views/babyShower'
import BabyShower from '../components/views/babyShowerViewOnly'

export default function Home (props) {
  return <Layout><Seo title='¡Baby Shower!' /><BabyShower {...props} /></Layout>
}
