import { QIcon, QLinearProgress } from 'quasar'
import Viewer, { LINK_TARGET_MODES } from './Viewer.js'
import { QPdfToolbarDesktop, QPdfToolbarMobile } from './pdf-toolbar.js'
import iconSet from './icon-set'

const QPdfError = {
  props: {
    message: String
  },
  render (h) {
    return h('div', {
      staticClass: 'q-pdf-error justify-center items-center row q-col-gutter-x-xs'
    }, [
      h(QIcon, {
        staticClass: 'text-warning',
        props: {
          name: iconSet.warning,
          size: '1.5em'
        }
      }),
      h('span', this.message)
    ])
  }
}

export default {
  name: 'QPdfviewer',
  props: {
    /* maxImageSize: {
      type: Number,
      default: 1024 * 1024
    }, */
    onlyCssZoom: {
      type: Boolean
    },
    textLayer: {
      type: Boolean,
      default: true
    },
    scaleDelta: {
      type: Number,
      default: 1.1
    },
    minScale: {
      type: Number,
      default: 0.5
    },
    maxScale: {
      type: Number,
      default: 10.0
    },
    scale: {
      type: [Number, String],
      default: 'auto'
    },
    singlePage: {
      type: Boolean
    },
    mode: {
      type: String,
      default: 'auto',
      validator: v => ['desktop', 'mobile', 'auto'].indexOf(v) !== -1
    },
    linkTarget: {
      type: String,
      validator: v => LINK_TARGET_MODES.indexOf(v) !== -1 // NONE, SELF, BLANK, PARENT, TOP
    },
    src: {
      type: String
    }
  },
  data () {
    return {
      prevDisabled: false,
      nextDisabled: false,
      title: '',
      loadingBar: {
        percent: 0,
        hide: false
      },
      pagesCount: 0,
      page: 0,
      errorMessage: ''
    }
  },
  computed: {
    __isMobile () {
      if (this.mode === 'mobile') {
        return true
      }
      if (this.mode === 'desktop') {
        return false
      }
      return this.$q.screen.lt.sm
    },
    __hasError () {
      return this.errorMessage !== ''
    }
  },
  methods: {
    toggleScrollMode () {
      this.viewer.toggleScroll()
    },
    __progress (level) {
      const percent = Math.round(level * 100)
      // Updating the bar if value increases.
      if (percent > this.loadingBar.percent || isNaN(percent)) {
        this.loadingBar.percent = percent
      }
    },
    prevPage (event) {
      this.viewer.page--
    },
    nextPage (event) {
      this.viewer.page++
    },
    zoomIn (ticks) {
      this.viewer.zoomIn(this.maxScale, this.scaleDelta, ticks)
    },
    zoomOut (ticks) {
      this.viewer.zoomOut(this.minScale, this.scaleDelta, ticks)
    },
    changePage (value) {
      this.viewer.changePage(value)
    },
    search (query) {
      this.viewer.search(query)
    },
    __init () {
      this.loadingBar.hide = false
      this.viewer = new Viewer({
        container: this.$refs.container,
        onlyCssZoom: this.onlyCssZoom,
        textLayer: this.textLayer,
        scale: this.scale,
        linkTarget: this.linkTarget,
        singlePage: this.singlePage
      })
      this.viewer.on('error', (message) => {
        this.errorMessage = message
      })
      this.viewer.on('document:init', (data) => {
        this.page = data.page
        this.pagesCount = data.pagesCount
      })
      this.viewer.on('pages:changed', (page) => {
        this.page = page
        this.prevDisabled = page <= 1
        this.nextDisabled = page >= this.pagesCount
      })
      this.viewer.on('title', (title) => {
        this.title = title
      })
    },
    async openDocument (url) {
      this.errorMessage = ''
      this.viewer.open({ url })
    }
  },
  watch: {
    src (value) {
      this.openDocument(value)
    }
  },
  async mounted () {
    this.__init()
    await this.$nextTick()
    this.openDocument(this.src)
  },
  created () {
    this.viewer = null
  },
  beforeDestroy () {
    this.close()
  },
  render (h) {
    const toolbar = this.__isMobile ? QPdfToolbarMobile : QPdfToolbarDesktop
    return h('div', {
      staticClass: 'q-pdf-viewer column no-wrap',
      class: {
        'q-pdf-viewer-mobile': this.__isMobile
      }
    }, [
      this.__hasError !== true && h(toolbar, {
        props: {
          title: this.title,
          page: this.page,
          pagesCount: this.pagesCount
        },
        on: {
          changePage: this.changePage,
          toggleScrollMode: this.toggleScrollMode,
          zoomIn: this.zoomIn,
          zoomOut: this.zoomOut,
          pagePrevious: this.prevPage,
          pageNext: this.nextPage,
          search: this.search
        }
      }, [
        this.loadingBar.hide !== true && h(QLinearProgress, {
          staticClass: 'absolute-bottom bg-primary',
          props: {
            value: this.loadingBar.percent
          }
        })
      ]),
      h('div', {
        staticClass: 'q-pdf-viewer-container col',
        ref: 'container'
      }, [
        h('div', {
          staticClass: 'q-pdf'
        }),
        this.errorMessage !== '' && h('div', {
          staticClass: 'q-pdf-error-container'
        }, [
          h(QPdfError, {
            props: {
              message: this.errorMessage
            }
          })
        ])
      ])
    ])
  }
}
