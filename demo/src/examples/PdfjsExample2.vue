<template>
  <q-page class="flex flex-center">
    <q-pdfviewer
      v-model="show"
      type="pdfjs"
      :src="updatedSrc"
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
      src: 'statics/pdf/c4611_sample_explain.pdf'
    }
  },

  methods: {
    // do some funky stuff because this site is
    // using history mode with publicPath, and it makes
    // pdfjs more comfortable using full urls
    getLocation (source) {
      let url = location.href
      if (location.href[location.href.length - 1] !== '/') {
        url += '/'
      }
      url += '../' + source
      return url
    }
  },
  computed: {
    updatedSrc () {
      if (process.env.MODE === 'electron') {
        return '/' + this.src
      }
      return this.getLocation(this.src)
    }
  }
}
</script>
