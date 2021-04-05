require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})
module.exports = {
  siteMetadata: {
    title: 'Invitacion',
    description: 'Te invitamos a nuestra boda',
    author: '@DavidMorales'
  },
  pathPrefix: `/${process.env.API_PATH_PREFIX}`,
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-material-ui',
      options: {
        stylesConfig: {
          disableAutoprefixing: true,
          disableMinification: true
        }
      }
    },
    {
      resolve: 'gatsby-plugin-webfonts',
      options: {
        fonts: {
          google: [
            {
              family: 'Poppins',
              variants: ['400', '700', '800']
            },
            {
              family: 'Great Vibes',
              variants: ['400']
            },
            {
              family: 'Oswald',
              variants: ['400']
            }
          ]
        }
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'DavidYLaura',
        short_name: 'DavidYLaura',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        display: 'minimal-ui',
        icon: 'static/icon.png'
      }
    },
    {
      resolve: 'gatsby-plugin-firebase',
      options: {
        credentials: {
          apiKey: 'AIzaSyBbncx-fEkqwa2mVtCW_Z71pSZWEmkbTTs',
          authDomain: 'invitacion-davidylaura.firebaseapp.com',
          projectId: 'invitacion-davidylaura',
          storageBucket: 'invitacion-davidylaura.appspot.com',
          messagingSenderId: '358559684050',
          appId: '1:358559684050:web:b503244601430f2e8d240b',
          measurementId: 'G-E1V7HLV5MN'
        }
      }
    },
    {
      resolve: 'gatsby-plugin-scroll-reveal',
      options: {
        disable: false, // Flag for disabling animations
        selector: '[data-sal]', // Selector of the elements to be animated
        animateClassName: 'sal-animate', // Class name which triggers animation
        disabledClassName: 'sal-disabled', // Class name which defines the disabled state
        rootMargin: '0% 50%' // Corresponds to root's bounding box margin
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        src: `${__dirname}/src/`,
        pages: `${__dirname}/src/pages/`,
        components: `${__dirname}/src/components`,
        static: `${__dirname}/static/`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/images`,
        name: 'images'
      }
    },
    {
      resolve: 'gatsby-plugin-create-client-paths',
      options: { prefixes: ['/invitado/*'] }
    }
  ]
}
