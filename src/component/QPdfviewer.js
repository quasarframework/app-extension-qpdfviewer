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
 import { useQuasar } from "quasar"

 // Replaces mixins from Vue2
 import useModelToggle, { useModelToggleProps, useModelToggleEmits } from "quasar/src/composables/private/use-model-toggle.js"

 export default defineComponent({
   name: "QPdfviewer",

   props: {
     // Replaces this.value
     modelValue: Boolean,
     // Unchanged
     src: String,
     type: {
       type: String,
       default: "html5",
       validator: (v) => ["html5", "pdfjs"].indexOf(v) !== -1,
     },
     errorString: {
       type: String,
       default:
         "This browser does not support PDFs. Download the PDF to view it:",
     },
     contentStyle: [String, Object, Array],
     contentClass: [String, Object, Array],
     innerContentStyle: [String, Object, Array],
     innerContentClass: [String, Object, Array],

     // Inject mixins using composition
     ...useModelToggleProps,
   },

   emits: [
     // Inject mixins using composition
     ...useModelToggleEmits
   ],

   data() {
     return {
         hashId: "q-pdfviewer-" + Math.random().toString(36).substr(2, 9)
     }
   },

   // Use discrete render fnction
   render(prop) {
     const $q = useQuasar()

     function __renderObject () {
         return h('object', {
           // Change to new format style for Vue3
           class: [prop.innerContentClass],
           style: [prop.innerContentStyle],
           id: prop.hashId,
           data: prop.src,
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
           src: prop.src,
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
           src: 'pdfjs/web/viewer.html?file=' + encodeURIComponent(prop.src)
         }, [
           // iframe not supported either, give user a link to download
           __renderText()
         ])
       }

     function __renderText () {
         // Render a link to the PDF
         return h('a', {
             // Change to new format style for Vue3
             href: prop.src,
             target: '_blank'
           })
       }

     if (prop.modelValue && prop.src !== void 0 && prop.src.length > 0) {
         return h(
           "div",
           {
               // Change to new format style for Vue3
             class: ["q-pdfviewer", prop.contentClass],
             style: [prop.contentStyle],
           },
           [
             $q.platform.is.electron || prop.type === "pdfjs"
               ? __renderIFramePDFJS(h)
               : __renderObject(h),
           ]
         );
       }
       return "";
   },

   setup() {
     return {
       // Inject mixins using composition
       ...useModelToggle
     }
   }
 })
