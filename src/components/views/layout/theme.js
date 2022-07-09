import { colors } from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import { createMuiTheme } from '@material-ui/core/styles'

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.deepPurple[500]
    },
    secondary: {
      main: '#212121'
    },
    error: {
      main: red.A400
    },
    background: {
      default: '#fff'
    }
  },
  typography: {
    useNextVariants: true,
    fontFamily: 'Oswald',
    h1: {
      fontFamily: 'Dancing Script',
      fontWeight: '400'
    },
    h2: {
      fontFamily: 'Dancing Script'
    },
    h4: {
      fontFamily: 'Dancing Script'
    }
  },
  overrides: {
    MuiFormHelperText: {
      root: {
        fontSize: '1em'
      }
    },
    MuiPaper: {
      root: {
        backgroundColor: 'white'
      },
      elevation1: {
        boxShadow: '0 0 14px 0 rgba(53,64,82,.05)'
      }
    },
    MuiDrawer: {
      paper: {
        background: 'white'
      }
    },
    MuiButton: {
      root: {
        textTransform: 'none',
        color: '#424242'
      }
    }
  }
})

export default theme
