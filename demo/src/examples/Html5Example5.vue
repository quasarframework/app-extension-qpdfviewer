<template>
  <div class="row justify-beween relative-position" style="max-width: 100%;">
    <container v-for="(source, index) in sources" :key="index" :src="source" type="html5" />
  </div>
</template>

<script>
export default {
  components: {
    'container': () => import('../components/Container')
  },

  data () {
    return {
      sources: [
        '../statics/pdf/pdf-test.pdf',
        '../statics/pdf/c4611_sample_explain.pdf',
        '../statics/pdf/pdf_open_parameters.pdf',
        '../statics/pdf/gre_research_validity_data.pdf'
      ]
    }
  }
}
</script>
