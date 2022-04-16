/**
 * Vue 3/Quasar 2 compatible QPdfviewer implementation.
 *
 * See the link below for main changes related to:
 *   - Render function arguments
 *   - Render function signature change
 *   - Props format change
 *
 * https://v3.vuejs.org/guide/migration/render-function-api.html#render-function-argument
 */

import { defineComponent, h } from "vue"

export default defineComponent({
  name: "QPdfviewer",

  props: {
    src: String,
    type: {
      type: String,
      default: 'html5',
      validator: (v) => [ 'html5', 'pdfjs' ].indexOf(v) !== -1
    },
    errorString: {
      type: String,
      default:
        "This browser does not support PDFs. Download the PDF to view it:"
    },
    contentStyle: [ String, Object, Array ],
    contentClass: [ String, Object, Array ],
    innerContentStyle: [ String, Object, Array ],
    innerContentClass: [ String, Object, Array ]
  },

  emits: [
  ],

  // Use discrete render fnction
  setup (props) {
    const hashId = 'q-pdfviewer-' + Math.random().toString(36).substr(2, 9)

    function __renderObject () {
      return h('object', {
        // Change to new format style for Vue3
        class: [props.innerContentClass],
        style: [props.innerContentStyle],
        id: hashId,
        data: props.src,
        type: 'application/pdf',
        width: '100%',
        height: '100%'
      }, [
        // browser object not supported, try iframe
        __renderIFrame()
      ])
    }

    function __renderIFrame () {
      return h('iframe', {
        // Change to new format style for Vue3
        class: ['q-pdfviewer__iframe'],
        src: props.src,
        width: '100%',
        height: '100%'
      }, [
        // iframe not supported either, give user a link to download
        __renderText()
      ])
    }

    function __renderIFramePDFJS () {
      return h('iframe', {
        // Change to new format style for Vue3
        class: ['q-pdfviewer__iframe'],
        src: '/pdfjs/web/viewer.html?file=' + encodeURIComponent(props.src),
        width: '100%',
        height: '100%'
      }, [
        // iframe not supported either, give user a link to download
        __renderText()
      ])
    }

    function __renderText () {
      // Render a link to the PDF
      return h('a', {
        // Change to new format style for Vue3
        href: props.src,
        target: '_blank'
      })
    }

    function __renderPdf () {
      if (props.src !== void 0 && props.src.length > 0) {
        return h(
          "div",
          {
            // Change to new format style for Vue3
            class: [ "q-pdfviewer", props.contentClass ],
            style: [props.contentStyle],
          },
          [
            props.type === "pdfjs"
              ? __renderIFramePDFJS(h)
              : __renderObject(h),
          ]
        )
      }
    }

    return () => __renderPdf()
  }
})
