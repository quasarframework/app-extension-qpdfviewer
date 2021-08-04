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
      src: '/pdf/c4611_sample_explain.pdf'
    }
  }
}
</script>
