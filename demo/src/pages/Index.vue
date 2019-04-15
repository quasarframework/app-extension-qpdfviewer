<template>
  <q-page class="flex flex-center">
    <q-pdfviewer
      v-model="show"
      :src="src"
      content-class="absolute"
    />
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',

  data () {
    return {
      show: true,
      src: 'https://www.orimi.com/pdf-test.pdf'
    }
  }
}
</script>
