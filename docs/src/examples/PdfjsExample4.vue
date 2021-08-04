<template>
  <div class="q-pa-md q-gutter-sm" style="height: 600px;">
    <q-pdfviewer
      type="pdfjs"
      :src="src"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      src: '/pdf/gre_research_validity_data.pdf'
    }
  }
}
</script>
