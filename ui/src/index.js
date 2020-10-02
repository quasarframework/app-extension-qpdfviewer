import { version } from '../package.json'
import QPdfviewer from './components/QPdfviewer'

export {
  version,
  QPdfviewer
}

export default {
  version,
  QPdfviewer,

  install (Vue) {
    Vue.component(QPdfviewer.name, QPdfviewer)
  }
}
