import Vue from 'vue'
// import slot from 'quasar/src/utils/slot.js'
import ModelToggleMixin from 'quasar/src/mixins/model-toggle.js'

export default Vue.extend({
  name: 'QPdfviewer',

  mixins: [ ModelToggleMixin ],

  props: {
    src: String,
    errorString: {
      type: String,
      default: 'This browser does not support PDFs. Download the PDF to view it:'
    },
    contentStyle: [String, Object, Array],
    contentClass: [String, Object, Array],
    innerContentStyle: [String, Object, Array],
    innerContentClass: [String, Object, Array]
  },

  data () {
    return {
      hashId: ''
    }
  },

  created () {
    this.hashId = this.__generateId()
  },

  methods: {
    __generateId () {
      return 'q-pdfviewer-' + Math.random().toString(36).substr(2, 9)
    },
    __renderObject (h) {
      return h('object', {
        class: this.innerContentClass,
        style: this.innerContentStyle,
        attrs: {
          id: this.hashId,
          data: this.src,
          type: 'application/pdf',
          width: '100%',
          height: '100%'
        },
        nativeOn: {
          onerror: this.__onError,
          onload: this.__onLoad
        }
      }, [
        // browser object not supported, try iframe
        this.__renderIFrame(h)
      ])
    },

    __renderIFrame (h) {
      return h('iframe', {
        style: {
          border: 'none'
        },
        attrs: {
          src: this.src,
          width: '100%',
          height: '100%'
        }
      }, [
        // iframe not supported either, give user a link to download
        this.__renderText(h)
      ])
    },

    __renderText (h) {
      return h('p', 'This browser does not support PDFs. Download the PDF to view it:', [
        this.__renderLink(h)
      ])
    },

    __renderLink (h) {
      return h('a', {
        attrs: {
          href: this.src,
          target: '_blank'
        }
      })
    }
  },

  render (h) {
    // don't display
    if (!this.value) {
      return null
    }
    if (this.src === void 0 || this.src.length === 0) {
      return null
    }
    return h('div', {
      staticClass: 'q-pdfviewer',
      class: this.contentClass,
      style: this.contentStyle
    }, [
      this.__renderObject(h)
    ])
  }
})
