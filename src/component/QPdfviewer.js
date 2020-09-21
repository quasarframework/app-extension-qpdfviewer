/**
 * @doc https://github.com/mozilla/pdf.js/blob/master/examples/mobile-viewer/viewer.js
 * @doc https://github.com/mozilla/pdfjs-dist/blob/master/web/pdf_viewer.js
 * @doc https://codesandbox.io/s/qviewer-4u41x
 */

import Vue from 'vue'
import { QIcon, QLinearProgress } from 'quasar'
import PDFJS, { PDFViewer as PDFViewerCore } from './pdf.js'
import { QPdfToolbarDesktop, QPdfToolbarMobile } from './pdf-toolbar.js'
import icons from './icons'
import i18n from './i18n'

const { EventBus, PDFLinkService, PDFFindController, NullL10n, PDFViewer, PDFHistory } = PDFViewerCore

const SCROLL_MODE = {
  UNKNOWN: -1,
  VERTICAL: 0,
  HORIZONTAL: 1,
  WRAPPED: 2
}

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
          name: icons.warning,
          size: '1.5em'
        }
      }),
      h('span', this.message)
    ])
  }
}

export default Vue.extend({
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
      default: 0.25
    },
    maxScale: {
      type: Number,
      default: 10.0
    },
    scaleValue: {
      type: Number,
      default: 1
    },
    mode: {
      type: String,
      default: 'auto',
      validator: v => ['desktop', 'mobile', 'auto'].indexOf(v) !== -1
    },
    src: {
      type: String
    }
  },
  data () {
    return {
      previousDisabled: false,
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
    isMobile () {
      if (this.mode === 'mobile') {
        return true
      }
      if (this.mode === 'desktop') {
        return false
      }
      return this.$q.screen.lt.sm
    },
    hasError () {
      return this.errorMessage !== ''
    }
  },
  methods: {
    async open (params) {
      if (this.pdfLoadingTask) {
        // We need to destroy already opened document
        await this.close()
        // ... and repeat the open() call.
        return this.open(params)
      }

      const url = params.url
      this.setTitleUsingUrl(url)

      // Loading document.
      this.pdfLoadingTask = PDFJS.getDocument({
        url
        // maxImageSize: this.maxImageSize
        // cMapUrl: CMAP_URL,
        // cMapPacked: CMAP_PACKED,
      })

      this.pdfLoadingTask.onProgress = (progressData) => {
        this.progress(progressData.loaded / progressData.total)
      }

      try {
        const pdfDocument = await this.pdfLoadingTask.promise
        // Document loaded, specifying document for the viewer.
        this.pdfDocument = pdfDocument
        this.pdfViewer.setDocument(pdfDocument)
        this.pdfLinkService.setDocument(pdfDocument)
        this.pdfHistory.initialize({ fingerprint: pdfDocument.fingerprint })

        // init
        this.pagesCount = this.pdfDocument.numPages || 0
        this.page = this.pdfViewer.currentPageNumber
        this.setTitleUsingMetadata(pdfDocument)
      } catch (exception) {
        const message = exception && exception.message
        const l10n = this.l10n
        let loadingErrorMessage

        if (exception instanceof PDFJS.InvalidPDFException) {
          // change error message also for other builds
          loadingErrorMessage = l10n.get(
            'invalid_file_error',
            null,
            'Invalid or corrupted PDF file.'
          )
        } else if (exception instanceof PDFJS.MissingPDFException) {
          // special message for missing PDFs
          loadingErrorMessage = l10n.get(
            'missing_file_error',
            null,
            'Missing PDF file.'
          )
        } else if (exception instanceof PDFJS.UnexpectedResponseException) {
          loadingErrorMessage = l10n.get(
            'unexpected_response_error',
            null,
            'Unexpected server response.'
          )
        } else {
          loadingErrorMessage = l10n.get(
            'loading_error',
            null,
            'An error occurred while loading the PDF.'
          )
        }

        loadingErrorMessage.then((msg) => {
          this.error(msg, { message })
        })
      }

      this.loadingBar.hide = true
    },
    async close () {
      this.errorMessage = ''

      if (!this.pdfLoadingTask) {
        return
      }

      const promise = this.pdfLoadingTask.destroy()
      this.pdfLoadingTask = null

      if (this.pdfDocument) {
        this.pdfDocument = null

        this.pdfViewer.setDocument(null)
        this.pdfLinkService.setDocument(null, null)
        this.pdfFindController.setDocument(null)

        if (this.pdfHistory) {
          this.pdfHistory.reset()
        }
      }

      return promise
    },
    error (msg, config) {
      this.errorMessage = config.message || msg
    },
    setTitleUsingUrl (url) {
      this.url = url
      let title = PDFJS.getFilenameFromUrl(url) || url
      try {
        title = decodeURIComponent(title)
      } catch (e) {
        // decodeURIComponent may throw URIError,
        // fall back to using the unprocessed url in that case
      }
      this.setTitle(title)
    },
    async setTitleUsingMetadata (pdfDocument) {
      try {
        const { info, metadata } = await pdfDocument.getMetadata()
        this.documentInfo = info
        this.metadata = metadata

        console.log(
          'PDF ' +
            pdfDocument.fingerprint +
            ' [' +
            info.PDFFormatVersion +
            ' ' +
            (info.Producer || '-').trim() +
            ' / ' +
            (info.Creator || '-').trim() +
            ']' +
            ' (PDF.js: ' +
            (PDFJS.version || '-') +
            ')'
        )

        let pdfTitle
        if (metadata && metadata.has('dc:title')) {
          const title = metadata.get('dc:title')
          // Ghostscript sometimes returns 'Untitled', so prevent setting the
          // title to 'Untitled.
          if (title !== 'Untitled') {
            pdfTitle = title
          }
        }

        if (!pdfTitle && info && info.Title) {
          pdfTitle = info.Title
        }

        if (pdfTitle) {
          this.setTitle(pdfTitle + ' - ' + document.title)
        }
      } catch (exception) {
        // soon...
      }
    },
    setTitle (title) {
      document.title = title
      this.title = title
    },
    toggleScrollMode () {
      if (this.pdfViewer.scrollMode !== SCROLL_MODE.HORIZONTAL) {
        this.pdfViewer.scrollMode = SCROLL_MODE.HORIZONTAL
      } else {
        this.pdfViewer.scrollMode = SCROLL_MODE.VERTICAL
      }
    },
    progress (level) {
      const percent = Math.round(level * 100)
      // Updating the bar if value increases.
      if (percent > this.loadingBar.percent || isNaN(percent)) {
        this.loadingBar.percent = percent
      }
    },
    onPrevious (event) {
      this.pdfViewer.currentPageNumber--
    },
    onNext (event) {
      this.pdfViewer.currentPageNumber++
    },
    onZoomIn (ticks) {
      let newScale = this.pdfViewer.currentScale

      do {
        newScale = (newScale * this.scaleDelta).toFixed(2)
        newScale = Math.ceil(newScale * 10) / 10
        newScale = Math.min(this.maxScale, newScale)
      } while (--ticks && newScale < this.maxScale)

      this.pdfViewer.currentScaleValue = newScale
    },
    onZoomOut (ticks) {
      let newScale = this.pdfViewer.currentScale

      do {
        newScale = (newScale / this.scaleDelta).toFixed(2)
        newScale = Math.floor(newScale * 10) / 10
        newScale = Math.max(this.minScale, newScale)
      } while (--ticks && newScale > this.minScale)

      this.pdfViewer.currentScaleValue = newScale
    },
    onChangePage (value) {
      this.pdfViewer.currentPageNumber = value | 0

      // Ensure that the page number input displays the correct value,
      // even if the value entered by the user was invalid
      // (e.g. a floating point number).
      if (value !== this.pdfViewer.currentPageNumber.toString()) {
        value = this.pdfViewer.currentPageNumber
      }
    },
    onFind (query) {
      this.pdfFindController.executeCommand('find', {
        caseSensitive: false,
        findPrevious: undefined,
        highlightAll: true,
        phraseSearch: true,
        query
      })
    },
    init () {
      const eventBus = new EventBus()
      this.eventBus = eventBus

      const linkService = new PDFLinkService({
        eventBus
      })
      this.pdfLinkService = linkService

      const findController = new PDFFindController({
        eventBus,
        linkService
      })
      this.pdfFindController = findController

      this.l10n = NullL10n

      this.pdfViewer = new PDFViewer({
        container: this.$refs.container,
        eventBus,
        linkService,
        findController,
        l10n: this.l10n,
        useOnlyCssZoom: this.onlyCssZoom,
        textLayerMode: this.textLayer
      })
      linkService.setViewer(this.pdfViewer)

      this.pdfHistory = new PDFHistory({
        eventBus,
        linkService
      })
      linkService.setHistory(this.pdfHistory)

      this.loadingBar.hide = false

      eventBus.on('pagesinit', () => {
        // We can use pdfViewer now, e.g. let's change default scale.
        this.pdfViewer.currentScaleValue = this.scaleValue
      })

      eventBus.on(
        'pagechanging',
        (evt) => {
          const page = evt.pageNumber
          const numPages = this.pagesCount

          // this.currentPage = page
          this.page = page
          this.previousDisabled = page <= 1
          this.nextDisabled = page >= numPages
        },
        true
      )
    },
    async openDocument (src) {
      if (!src) {
        this.loadingBar.hide = true
        this.errorMessage = i18n.messageBlank
        return
      }
      // src: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf'
      this.loadingBar.hide = false
      try {
        this.open({ url: src })
        this.errorMessage = ''
      } catch (exception) {
        this.errorMessage = exception.message
        this.loadingBar.hide = true
      }
    }
  },
  watch: {
    src (value) {
      this.openDocument(value)
    }
  },
  async mounted () {
    this.init()
    await this.$nextTick()
    this.openDocument(this.src)
  },
  created () {
    this.pdfLoadingTask = null
    this.pdfDocument = null
    this.pdfViewer = null
    this.pdfHistory = null
    this.pdfLinkService = null
    this.pdfFindController = null
    this.eventBus = null
  },
  beforeDestroy () {
    this.close()
  },
  render (h) {
    const toolbar = this.isMobile ? QPdfToolbarMobile : QPdfToolbarDesktop
    return h('div', {
      staticClass: 'q-pdf-viewer column no-wrap'
    }, [
      this.hasError !== true && h(toolbar, {
        props: {
          title: this.title,
          page: this.page,
          pagesCount: this.pagesCount
        },
        on: {
          changePage: this.onChangePage,
          toggleScrollMode: this.toggleScrollMode,
          zoomIn: this.onZoomIn,
          zoomOut: this.onZoomOut,
          pagePrevious: this.onPrevious,
          pageNext: this.onNext,
          find: this.onFind
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
})
