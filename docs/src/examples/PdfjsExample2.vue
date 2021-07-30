<template>
  <div class="q-pa-md q-gutter-sm" style="height: 600px;">
    <q-pdfviewer
      v-model="show"
      type="pdfjs"
      :src="src"
    />
  </div>
</template>

<script>
export default {
  // name: 'PageName',

  data () {
    return {
      show: true,
      src: '/pdf/c4611_sample_explain.pdf'
    }
  }
}
</script>
