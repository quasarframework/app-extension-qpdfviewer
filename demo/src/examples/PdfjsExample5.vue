<template>
  <div class="row justify-beween relative-position" style="min-height: calc(100vh - 98px);">
    <div v-for="(source, index) in sources" :key="index" class="q-pa-xs pdf-container" style="wifth: 50%;">
      <q-pdfviewer
        v-model="show"
        :src="updatedSrc(source)"
        type="pdfjs"
      />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: true,
      sources: [
        'pdf/pdf-test.pdf',
        'pdf/c4611_sample_explain.pdf',
        'pdf/pdf_open_parameters.pdf',
        'pdf/gre_research_validity_data.pdf'
      ]
    }
  },

  methods: {
    // do some funky stuff because this site is
    // using history mode with publicPath, and it makes
    // pdfjs more comfortable using full urls
    getLocation (source) {
      let url = location.href
      if (location.href[location.href.length - 1] !== '/') {
        url += '/'
      }
      url += '../' + source
      return url
    },
    updatedSrc (src) {
      if (process.env.MODE === 'electron') {
        return '/' + src
      }
      return this.getLocation(src)
    }
  }
}
</script>

<style>
.pdf-container {
  min-height: 400px;
  border: 1px solix #c0c0c0;
}
</style>
