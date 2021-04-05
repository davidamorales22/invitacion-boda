import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@material-ui/core'
export default makeStyles(theme => ({
  root: {
    // [theme.breakpoints.down('sm')]: {
    //   overflow: 'initial'
    // },
    boxShadow: '10px 10px 20px #d9d9d9, -10px -10px 20px #ffffff',
    textAlign: 'center',
    background: 'transparent',
    position: 'relative'
    // boxShadow: 'none'
    // background: '#041908c8',
    // color: 'white'
  },
  imgCenter: {
    margin: 'auto',
    width: '100%'
  },
  letterContainer: {
    [theme.breakpoints.up('md')]: {
      maxHeight: 'calc(100vh - 140px)',
      overflow: 'auto'
    },
    background: 'white'
  },
  addButton: {
    color: colors.blueGrey[600],
    background: colors.blueGrey[50]
  },
  title: {
    fontSize: '2rem',
    color: colors.red[900]
  },
  submitButton: {
    backgroundColor: colors.green[500],
    color: colors.common.white,
    fontWeight: 'bold',
    fontSize: '1.5rem',
    position: 'sticky',
    bottom: 0,
    zIndex: 1,
    '&:hover': {
      backgroundColor: colors.green[600]
    },
    '&:active': {
      backgroundColor: colors.green[400]
    },
    '&:focus': {
      backgroundColor: colors.green[300]
    },
    '&& .svg-inline--fa': {
      fontSize: '1.85rem'
    }
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 10000,
    color: colors.common.white
  }
}))
