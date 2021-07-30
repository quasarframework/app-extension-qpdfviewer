<template>
  <div class="q-pa-md q-gutter-sm" style="height: 600px;">
    <q-pdfviewer
      v-model="show"
      type="html5"
      :src="src"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: true,
      src: '/pdf/pdf_open_parameters.pdf'
    }
  }
}
</script>
