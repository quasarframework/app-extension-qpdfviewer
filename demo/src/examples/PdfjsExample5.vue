<template>
  <div class="row justify-beween relative-position" style="min-height: calc(100vh - 98px);">
    <div v-for="(source, index) in sources" :key="index" class="q-pa-xs pdf-container" style="wifth: 50%;">
      <q-pdfviewer
        v-model="show"
        :src="getLocation(source)"
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
        'statics/pdf/pdf-test.pdf',
        'statics/pdf/c4611_sample_explain.pdf',
        'statics/pdf/pdf_open_parameters.pdf',
        'statics/pdf/gre_research_validity_data.pdf'
      ]
    }
  },

  methods: {
    // do some funky stuff because this site is
    // using history mode with publicPath, and it makes
    // pdfjs more comfortable using full urls
    getLocation (source) {
      return location.href + '../' + source
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
