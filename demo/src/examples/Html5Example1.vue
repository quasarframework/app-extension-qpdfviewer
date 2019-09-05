<template>
  <q-page class="flex flex-center">
    <q-pdfviewer
      v-model="show"
      type="html5"
      :src="updatedSrc"
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
      src: 'statics/pdf/pdf-test.pdf'
    }
  },
  computed: {
    updatedSrc () {
      if (process.env.MODE === 'electron') {
        return '/' + this.src
      }
      return this.src
    }
  }
}
</script>
