<template>
  <div class="q-pa-xs pdf-container" style="wifth: 50%;">
    <q-pdfviewer
      v-model="show"
      :src="src"
      :type="type"
    />
  </div>
</template>

<script>
export default {
  name: 'Container',
  props: {
    src: String,
    type: String
  },

  data () {
    return {
      show: true
    }
  }
}
</script>

<style>
.pdf-container {
  /* max-width: 50%; */
  /* max-height: 50%; */
  /* min-width: 200px; */
  min-height: 400px;
  /* width: 100%;
  height: 100%; */
  border: 1px solix #c0c0c0;
}
</style>
