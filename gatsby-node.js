/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
exports.onCreateWebpackConfig = ({ getConfig, actions }) => {
  actions.setWebpackConfig({
    node: {
      fs: 'empty'
    }
  })
  if (getConfig().mode === 'production') {
    actions.setWebpackConfig({
      devtool: false
    })
  }
}
