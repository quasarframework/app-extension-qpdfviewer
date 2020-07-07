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

<script>
export default {
  data () {
    return {
      show: true,
      src: 'pdf/c4611_sample_explain.pdf'
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
