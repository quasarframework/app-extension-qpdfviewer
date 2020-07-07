<template>
  <hero>
    <div>
      <q-markdown>
**QPdfviewer** allows you to display PDF documents in your Quasar App.

:::
Please give time for the PDF documents to load
:::

::: tip
Be aware that if you are using Electron, then the PDFjs engine (`type="pdfjs"`)will always be selected because there is no native HTML5 PDF Viewer engine available
:::

      </q-markdown>
      <example-title title="HTML5 Examples" />
      <example-viewer title="HTML5 Example 1" file="Html5Example1" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths" />
      <example-viewer title="HTML5 Example 2" file="Html5Example2" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths" />
      <example-viewer title="HTML5 Example 3" file="Html5Example3" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths" />
      <example-viewer title="HTML5 Example 4" file="Html5Example4" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths" />
      <example-viewer title="HTML5 Example 5" file="Html5Example5" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths" />

      <example-title title="PDFJS Examples" />
      <example-viewer title="PDFJS Example 1" file="PdfjsExample1" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths" />
      <example-viewer title="PDFJS Example 2" file="PdfjsExample2" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths" />
      <example-viewer title="PDFJS Example 3" file="PdfjsExample3" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths" />
      <example-viewer title="PDFJS Example 4" file="PdfjsExample4" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths" />
      <example-viewer title="PDFJS Example 5" file="PdfjsExample5" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths" />

    </div>
    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn
        fab
        icon="keyboard_arrow_up"
        :class="{ 'text-black bg-grey-4': $q.dark.isActive, 'text-white bg-primary': !$q.dark.isActive }"
      />
    </q-page-scroller>
  </hero>
</template>

<script>
import Hero from '../components/Hero'
import ExampleTitle from '../components/ExampleTitle'
import { slugify } from 'assets/page-utils'

export default {
  name: 'Examples',

  components: {
    Hero,
    ExampleTitle
  },

  data () {
    return {
      tempToc: [],
      locationUrl: 'https://github.com/quasarframework/app-extension-qpdfviewer/tree/dev/demo/src/examples/',
      jsPaths: [
      ],
      cssPaths: [
      ]
    }
  },

  mounted () {
    this.toc = []
    this.tempToc = []

    this.addToToc('HTML5 Examples')
    this.addToToc('HTML5 Example 1', 2)
    this.addToToc('HTML5 Example 2', 2)
    this.addToToc('HTML5 Example 3', 2)
    this.addToToc('HTML5 Example 4', 2)
    this.addToToc('HTML5 Example 5', 2)

    this.addToToc('PDFJS Examples')
    this.addToToc('PDFJS Example 1', 2)
    this.addToToc('PDFJS Example 2', 2)
    this.addToToc('PDFJS Example 3', 2)
    this.addToToc('PDFJS Example 4', 2)
    this.addToToc('PDFJS Example 5', 2)

    this.toc = this.tempToc
  },

  computed: {
    toc:
    {
      get () {
        return this.$store.state.common.toc
      },
      set (toc) {
        this.$store.commit('common/toc', toc)
      }
    }
  },

  methods: {
    addToToc (name, level = 1) {
      let n = name
      if (level > 1) {
        n = 'example-' + n
      }
      const slug = slugify(n)
      this.tempToc.push({
        children: [],
        id: slug,
        label: name,
        level: level
      })
    }
  }
}
</script>

<style lang="stylus">
.example-page
  padding: 16px 46px;
  font-weight: 300;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
</style>
