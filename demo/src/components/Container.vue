<template>
  <div class="q-pa-lg">
    <q-pdfviewer
      v-model="show"
      :src="src"
      :type="type"
      content-class="fit pdf-container"
      inner-content-class="fit pdf-container"
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
  max-width: 50%;
  max-height: 70%;
  min-width: 400px;
  min-height: 600px;
  width: 100%;
  height: 100%;
  border: 1px solix #c0c0c0;
}
</style>
