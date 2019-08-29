<template>
  <q-page class="flex flex-center">
    <q-pdfviewer
      v-model="show"
      type="pdfjs"
      :src="getLocation(src)"
      content-class="absolute"
    />
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'Page1',

  data () {
    return {
      show: true,
      src: 'statics/pdf/pdf-test.pdf'
    }
  },

  methods: {
    // do some funky stuff because this site is
    // using history mode with publicPath, and it makes
    // pdfjs more comfortable using full urls
    getLocation (source) {
      return location.href + '../' + source
    }
  }
}
</script>
