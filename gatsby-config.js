require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})
module.exports = {
  siteMetadata: {
    title: 'Invitacion',
    description: 'Baby Shower de Matias!',
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
              family: 'Oswald',
              variants: ['200', '400']
            },
            {
              family: 'Poppins',
              variants: ['400', '700', '800']
            },
            {
              family: 'Great Vibes',
              variants: ['400']
            },
            {
              family: 'Dancing Script',
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
        name: 'BabyShower',
        short_name: 'BabyShower',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        display: 'minimal-ui',
        icon: 'static/images/matias/teddy.png'
      }
    },
    {
      resolve: 'gatsby-plugin-firebase',
      options: {
        credentials: {
          apiKey: "AIzaSyD_way7K0AMLv-2b_Y3KoP3ntm4cK3Vl0E",
          authDomain: "baby-shower-matias.firebaseapp.com",
          projectId: "baby-shower-matias",
          storageBucket: "baby-shower-matias.appspot.com",
          messagingSenderId: "509540461295",
          appId: "1:509540461295:web:12df2d2fe031e6f632891a",
          measurementId: "G-RNEZE4Z8QL"
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
