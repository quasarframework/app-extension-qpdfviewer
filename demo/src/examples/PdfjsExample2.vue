<template>
  <q-page class="flex flex-center">
    <q-pdfviewer
      v-model="show"
      type="pdfjs"
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
      src: '../statics/pdf/c4611_sample_explain.pdf'
    }
  }
}
</script>
