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
      <example-card title="HTML5 Example 1" name="Html5Example1" :tag-parts="getTagParts(require('!!raw-loader!../examples/Html5Example1.vue').default)" />
      <example-card title="HTML5 Example 2" name="Html5Example2" :tag-parts="getTagParts(require('!!raw-loader!../examples/Html5Example2.vue').default)" />
      <example-card title="HTML5 Example 3" name="Html5Example3" :tag-parts="getTagParts(require('!!raw-loader!../examples/Html5Example3.vue').default)" />
      <example-card title="HTML5 Example 4" name="Html5Example4" :tag-parts="getTagParts(require('!!raw-loader!../examples/Html5Example4.vue').default)" />
      <example-card title="HTML5 Example 5" name="Html5Example5" :tag-parts="getTagParts(require('!!raw-loader!../examples/Html5Example5.vue').default)" />

      <example-title title="PDFJS Examples" />
      <example-card title="PDFJS Example 1" name="PdfjsExample1" :tag-parts="getTagParts(require('!!raw-loader!../examples/PdfjsExample1.vue').default)" />
      <example-card title="PDFJS Example 2" name="PdfjsExample2" :tag-parts="getTagParts(require('!!raw-loader!../examples/PdfjsExample2.vue').default)" />
      <example-card title="PDFJS Example 3" name="PdfjsExample3" :tag-parts="getTagParts(require('!!raw-loader!../examples/PdfjsExample3.vue').default)" />
      <example-card title="PDFJS Example 4" name="PdfjsExample4" :tag-parts="getTagParts(require('!!raw-loader!../examples/PdfjsExample4.vue').default)" />
      <example-card title="PDFJS Example 5" name="PdfjsExample5" :tag-parts="getTagParts(require('!!raw-loader!../examples/PdfjsExample5.vue').default)" />

    </div>
    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn fab icon="keyboard_arrow_up" color="primary" />
    </q-page-scroller>
  </hero>
</template>

<script>
import Hero from '../components/Hero'
import ExampleTitle from '../components/ExampleTitle'
import ExampleCard from '../components/ExampleCard'
import { slugify } from 'assets/page-utils'
import getTagParts from '@quasar/quasar-ui-qmarkdown/src/util/getTagParts.js'

export default {
  name: 'Examples',

  components: {
    Hero,
    ExampleTitle,
    ExampleCard
  },

  data () {
    return {
      tempToc: []
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
    getTagParts,
    addToToc (name, level = 1) {
      const slug = slugify(name)
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
