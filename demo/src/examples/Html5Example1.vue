<template>
  <q-page class="flex flex-center">
    <q-pdfviewer
      v-model="show"
      type="html5"
      :src="src"
      content-class="absolute"
    />
  </q-page>
</template>

<style>
</style>

<script>
export default {
  data () {
    return {
      show: true,
      src: '../statics/pdf/pdf-test.pdf'
    }
  }
}
</script>
