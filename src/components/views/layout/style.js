import { makeStyles } from '@material-ui/core/styles'
export default makeStyles(theme => ({
  root: {
    width: '100%',
    minHeight: '100vh'
    // backgroundColor: 'white',
    // backgroundImage: 'url("https://firebasestorage.googleapis.com/v0/b/invitacion-davidylaura.appspot.com/o/texture.jpg?alt=media&token=61aa1965-c9d7-45d7-97e2-e0f398e5e605")'
  },
  footer: {
    position: 'fixed',
    bottom: 0,
    right: theme.spacing(1),
    fontSize: '.85rem',
    zIndex: -1
  }
}))
