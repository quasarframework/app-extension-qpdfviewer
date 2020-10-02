<template>
  <hero>
    <div>
      <q-markdown>
**QPdfviewer** allows you to display PDF documents in your Quasar App.

      </q-markdown>
      <example-viewer title="PDFJS Example 1" file="PdfjsExample1" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths" />
      <example-viewer title="PDFJS Example 2" file="PdfjsExample2" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths" />
      <example-viewer title="PDFJS Example 3" file="PdfjsExample3" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths" />
      <example-viewer title="PDFJS Example 4" file="PdfjsExample4" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths" />

    </div>
    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn
        class="z-fab"
        fab
        icon="keyboard_arrow_up"
        :class="{ 'text-black bg-grey-4': $q.dark.isActive, 'text-white bg-primary': !$q.dark.isActive }"
      />
    </q-page-scroller>
  </hero>
</template>

<script>
import Hero from '../components/Hero'
import { slugify } from 'assets/page-utils'

export default {
  name: 'Examples',

  components: {
    Hero
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

    this.addToToc('PDFJS Examples')
    this.addToToc('PDFJS Example 1', 2)
    this.addToToc('PDFJS Example 2', 2)
    this.addToToc('PDFJS Example 3', 2)
    this.addToToc('PDFJS Example 4', 2)

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
