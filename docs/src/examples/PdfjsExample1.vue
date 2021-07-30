<template>
  <div class="q-pa-md q-gutter-sm" style="height: 600px;">
    <q-pdfviewer
      v-model="show"
      type="pdfjs"
      :src="src"
    />
  </div>
</template>

<style>
</style>

<script>
export default {
  name: 'Page1',

  data () {
    return {
      show: true,
      src: '/pdf/pdf-test.pdf'
    }
  }
}
</script>
