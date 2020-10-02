import { QBadge } from 'quasar'

export default {
  name: 'QPdfviewer',

  render (h) {
    return h(QBadge, {
      staticClass: 'QPdfviewer',
      props: {
        label: 'QPdfviewer'
      }
    })
  }
}
