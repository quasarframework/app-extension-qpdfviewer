<template>
  <div class="row justify-beween relative-position" style="min-height: calc(100vh - 98px);">
    <container v-for="(source, index) in sources" :key="index" :src="source" :type="index % 2 ? 'pdfjs' : 'html5'" />
  </div>
</template>

<script>
export default {
  // name: 'PageName',

  components: {
    'container': () => import('../components/Container')
  },

  data () {
    return {
      sources: [
        '/statics/pdf/pdf-test.pdf',
        '/statics/pdf/c4611_sample_explain.pdf',
        '/statics/pdf/pdf_open_parameters.pdf',
        '/statics/pdf/gre_research_validity_data.pdf'
      ]
    }
  }
}
</script>

<style>
</style>
