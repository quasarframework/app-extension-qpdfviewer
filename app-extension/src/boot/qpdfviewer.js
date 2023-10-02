import QPdfviewer from '@quasar/quasar-app-extension-qpdfviewer/src/component/QPdfviewer.js'

export default ({ app, publicPath }) => {
  app.component('QPdfviewer', QPdfviewer({ publicPath }))
}
