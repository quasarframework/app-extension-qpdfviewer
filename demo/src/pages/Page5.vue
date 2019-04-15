<template>
  <div class="row justify-beween relative-position" style="min-height: calc(100vh - 98px);">
    <container v-for="(source, index) in sources" :key="index" :src="source" />
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
        'https://www.orimi.com/pdf-test.pdf',
        'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf',
        'https://www.adobe.com/content/dam/acom/en/devnet/acrobat/pdfs/pdf_open_parameters.pdf',
        'https://www.ets.org/Media/Tests/GRE/pdf/gre_research_validity_data.pdf'
      ]
    }
  }
}
</script>

<style>
</style>
