import Vue from 'vue'
import ModelToggleMixin from 'quasar/src/mixins/model-toggle.js'

export default Vue.extend({
  name: 'QPdfviewer',

  mixins: [ ModelToggleMixin ],

  props: {
    src: String,
    type: {
      type: String,
      default: 'html5',
      validator: v => ['html5', 'pdfjs']
    },
    errorString: {
      type: String,
      default: 'This browser does not support PDFs. Download the PDF to view it:'
    },
    load: Function,
    error: Function,
    contentStyle: [String, Object, Array],
    contentClass: [String, Object, Array],
    innerContentStyle: [String, Object, Array],
    innerContentClass: [String, Object, Array]
  },

  data () {
    return {
      hashId: 'q-pdfviewer-' + Math.random().toString(36).substr(2, 9)
    }
  },

  methods: {
    __renderObject (h) {
      console.log('process.env:', process.env)
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
        on: {
          error: this.error ? this.error : '',
          load: this.load ? this.load : ''
        }
      }, [
        // browser object not supported, try iframe
        this.__renderIFrame(h)
      ])
    },

    __renderIFrame (h) {
      return h('iframe', {
        staticClass: 'q-pdfviewer__iframe',
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

    __renderIFramePDFJS (h) {
      return h('iframe', {
        staticClass: 'q-pdfviewer__iframe',
        attrs: {
          src: 'statics/pdfjs/web/viewer.html?file=' + this.src
        }
      }, [
        // iframe not supported either, give user a link to download
        this.__renderText(h)
      ])
    },

    __renderText (h) {
      // TODO: ????
      return h('p', 'This browser does not support PDFs. Download the PDF to view it:', [
        h('a', {
          attrs: {
            href: this.src,
            target: '_blank'
          }
        })
      ])
    }
  },

  render (h) {
    if (this.value === true && this.src !== void 0 && this.src.length > 0) {
      return h('div', {
        staticClass: 'q-pdfviewer',
        class: this.contentClass,
        style: this.contentStyle
      }, [
        this.$q.platform.is.electron || this.type === 'pdfjs' ? this.__renderIFramePDFJS(h) : this.__renderObject(h)
      ])
    }
    return ''
  }
})
