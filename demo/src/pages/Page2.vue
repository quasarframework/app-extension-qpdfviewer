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
      src: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf'
    }
  }
}
</script>

<style>
</style>
