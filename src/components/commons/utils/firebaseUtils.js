// import { setUser, loginError } from '../Redux/actions'
import firebase from 'gatsby-plugin-firebase'

export const listenerConnection = ({ connected, disconected }) => {
  var connectedRef = firebase.database().ref('.info/connected')
  connectedRef.on('value', function (snap) {
    if (snap.val() === true) {
      connected && connected()
    } else {
      disconected && disconected()
    }
  })
}

export const getCollection = props => {
  const list = []
  const hasCondition = props.condition !== undefined

  function parseSnapShot (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      list.push(
        props.mapper
          ? props.mapper(doc)
          : {
            data: doc.data(),
            id: doc.id
          }
      )
    })
    props.callback(list)
  }
  function whenError (err) {
    props.error && props.error(err)
    console.log('Get collection error => ', err)
  }

  if (props.doc) {
    firebase
      .firestore()
      .collection(props.name)
      .doc(props.doc)
      .get()
      .then(doc => {
        props.callback(doc.data())
      })
      .catch(whenError)
  } else {
    if (hasCondition) {
      if (!Array.isArray(props.condition)) {
        firebase
          .firestore()
          .collection(props.name)
          .where(
            props.condition.field,
            props.condition.comparation,
            props.condition.value
          )
          .get()
          .then(parseSnapShot)
          .catch(whenError)
      } else {
        let consult = firebase.firestore().collection(props.name)
        props.condition.forEach(condition => {
          consult = consult.where(
            condition.field,
            condition.comparation,
            condition.value
          )
        })
        consult.get().then(parseSnapShot).catch(whenError)
      }
    } else {
      firebase
        .firestore()
        .collection(props.name)
        .get()
        .then(parseSnapShot)
        .catch(whenError)
    }
  }
}
export const getDoc = props => {
  return firebase.firestore().collection(props.name).doc(props.doc)
}
export const getCol = props => {
  return firebase.firestore().collection(props.name)
}
export const update = props => {
  let userRef
  switch (props.oper) {
    case 'add':
      userRef = firebase
        .firestore()
        .collection(props.name)
        .add(props.values)
        .then(resp => {
          props.callback && props.callback(resp)
        })
        .catch(err => {
          console.log('ERROR FIREBASE CONNECTION', err)
        })
      break
    case 'edit':
      userRef = firebase
        .firestore()
        .collection(props.name)
        .doc(props.id)
        .set(props.values)
        .then(() => {
          props.callback && props.callback(userRef)
        })
        .catch(err => {
          console.log('ERROR FIREBASE CONNECTION', err)
        })
      break
    case 'del':
      userRef = firebase
        .firestore()
        .collection(props.name)
        .doc(props.id)
        .delete()
        .then(() => {
          props.callback && props.callback(userRef)
        })
        .catch(err => {
          console.log('ERROR FIREBASE CONNECTION', err)
        })
      break
    default:
      break
  }
}

const getRolesRecursive = (list, index, callback, result) => {
  if (list.length > index) {
    if (typeof list[index] !== 'object') {
      firebase
        .firestore()
        .collection('rols')
        .doc(list[index])
        .get()
        .then(res => {
          if (res.exists) {
            const rol = res.data()
            if (rol) {
              getModulsRecursive(
                rol.moduls,
                0,
                moduls => {
                  rol.mods = moduls
                  result.push(rol)
                  getRolesRecursive(list, index + 1, callback, result)
                },
                []
              )
            } else getRolesRecursive(list, index + 1, callback, result)
          } else getRolesRecursive(list, index + 1, callback, result)
        })
    } else getRolesRecursive(list, index + 1, callback, result)
  } else {
    callback(result)
  }
}
const getModulsRecursive = (list, index, callback, result) => {
  if (list?.length > index) {
    if (typeof list[index] !== 'object') {
      firebase
        .firestore()
        .collection('modulesList')
        .doc(list[index])
        .get()
        .then(res => {
          if (res.exists) result.push({ data: res.data(), id: list[index] })
          getModulsRecursive(list, index + 1, callback, result)
        })
    } else getModulsRecursive(list, index + 1, callback, result)
  } else {
    callback(result)
  }
}

export const verifyAuth = onComplete => dispatch => {
  firebase.auth().onAuthStateChanged(user => {
    if (user !== null) {
      firebase
        .firestore()
        .collection('users')
        .where('email', '==', user.email)
        .get()
        .then(function (det) {
          det.forEach(us => {
            const isAdmin = false
            user.customUser = us.data()
            if (user.customUser.rols) {
              getRolesRecursive(
                user.customUser.rols,
                0,
                rolsData => {
                  const menu = {}
                  rolsData.forEach(rol => {
                    rol.mods.sort(
                      (a, b) => Number(a.data.order) - Number(b.data.order)
                    )
                    rol.mods.forEach(mod => {
                      if (!menu[mod.id]) {
                        menu[mod.id] = mod
                      }
                    })
                  })
                  user.menu = menu
                  user.isAdmin = isAdmin
                  user.roles = rolsData
                  // dispatch(setUser(user))
                  onComplete && onComplete(true, user)
                },
                []
              )
              // isAdmin = rol.data.code === 'ADMIN' || isAdmin;
              // menu = menu.concat(rol.data.moduls.filter(mod => menu.filter(mn => mn.id === mod.id).length === 0).map(mod => mod.data));
            } else {
              user.isAdmin = isAdmin
              // dispatch(setUser(user))
              onComplete && onComplete(true)
            }
            // menu.sort((a, b) => ((a.order && b.order) ? (Number(a.order) - Number(b.order)) : 0))
            // user.customUser.menu = menu.map(mn => ({ n: mn.name, url: mn.url }));
          })
        })
        .catch(er => {
          console.error('ERROR AUTH USER: ', er)
        })
    } else if (window.location.href !== '/') {
      // dispatch(loginError(null))
      onComplete && onComplete(false)
    }
  })
}

export const logOut = callback => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // setUser(null)
      callback && callback()
    })
}

export const transaction = props => {
  const ref = firebase.firestore().collection(props.name).doc(props.doc)

  firebase
    .firestore()
    .runTransaction(function (transaction) {
      return transaction.get(ref).then(doc => {
        if (!doc.exists) {
          throw new Error('Document does not exist')
        } else {
          props.callback(transaction)
          return 1
        }
      })
    })
    .then(status => {
      props.success && props.success(status)
    })
    .catch(e => {
      props.error && props.error(e)
    })
}

export const batch = props => {
  const batch = firebase.firestore().batch()
  props.callback(batch)
}

export const increment = props => {
  const increment = firebase.firestore.FieldValue.increment(props.n)
  const ref = firebase.firestore().collection(props.name).doc(props.doc)
  ref.update({ [props.field]: increment }).then(() => {
    props.callback && props.callback()
  })
}

export const listen = props => {
  var ref = firebase.database().ref(props.name)
  // ref.off("value");
  ref.on('value', snapshot => {
    props.callback && props.callback(snapshot.val())
  })
}
export const set = props => {
  var ref = firebase.database().ref(props.name)
  // ref.off("value");
  ref.set(props.values)
}
export const callFunction = props => {
  var func = firebase.functions().httpsCallable(props.name)
  func(props.params)
    .then(function (result) {
      props.callback && props.callback(result)
    })
    .catch(function (error) {
      props.error && props.error(error)
    })
}

export const upload = props => {
  // async magic goes here...
  if (props.file === '') {
    console.error(
      `not an image, the image file is a ${typeof props.file}`
    )
  }
  const storage = firebase.storage()
  const uploadTask = storage.ref(`/${props.path}/${props.name}`).put(props.file)
  // initiates the firebase side uploading
  uploadTask.on(
    'state_changed',
    snapShot => {
      // takes a snap shot of the process as it is happening
      // console.log(snapShot)
    },
    err => {
      // catches the errors
      console.log(err)
    },
    () => {
      // gets the functions from storage refences the image storage in firebase by the children
      // gets the download url then sets the image from firebase as the value for the imgUrl key:
      storage
        .ref(props.path)
        .child(props.name)
        .getDownloadURL()
        .then(fireBaseUrl => {
          props.callback && props.callback(fireBaseUrl)
          // setImageAsUrl(prevObject => ({ ...prevObject, imgUrl: fireBaseUrl }))
        })
    }
  )
}
