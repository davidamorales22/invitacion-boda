import Axios from 'axios'
import firebase from 'gatsby-plugin-firebase'

export default {
  Request: async (url, _params, _secure, _type) => {
    /*
    POR DEFECTO POST , CON PARAMETRO SIN TOKEN
    */
    const result = await Axios.post(url, _params)
    return result
  },
  frAdd: async (collectionName, values) => {
    const ref = firebase.firestore().collection(collectionName)
    const addRef = await ref.add(values)
    const newRecord = await addRef.get()
    return newRecord
  },
  frUpdate: async (collectionName, id, values) => {
    const ref = firebase.firestore().collection(collectionName).doc(id)
    await ref.update(values)
  }
}
