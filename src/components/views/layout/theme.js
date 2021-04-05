import { colors } from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import { createMuiTheme } from '@material-ui/core/styles'

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.green[500]
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
    fontFamily: 'Poppins',
    h1: {
      fontFamily: 'Great Vibes',
      fontWeight: '400'
    },
    h2: {
      fontFamily: 'Oswald'
    },
    h4: {
      fontFamily: 'Oswald'
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
