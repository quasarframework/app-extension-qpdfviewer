<template>
  <div class="q-pa-md q-gutter-sm" style="height: 600px;">
    <q-pdfviewer
      type="html5"
      :src="src"
    />
  </div>
</template>

<style>
</style>

<script>
export default {
  data () {
    return {
      src: '/pdf/pdf-test.pdf'
    }
  }
}
</script>
