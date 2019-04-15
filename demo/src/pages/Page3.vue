<template>
  <q-page class="flex flex-center">
    <q-pdfviewer
      v-model="show"
      :src="src"
      content-class="absolute"
    />
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',

  data () {
    return {
      show: true,
      src: 'https://www.adobe.com/content/dam/acom/en/devnet/acrobat/pdfs/pdf_open_parameters.pdf'
    }
  }
}
</script>

<style>
</style>
