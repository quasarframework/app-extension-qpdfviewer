<template>
  <div class="container q-pa-lg">
    <q-pdfviewer
      v-model="show"
      :src="src"
      content-class="fit container"
      inner-content-class="fit container"
    />
  </div>
</template>

<script>
export default {
  name: 'Container',
  props: {
    src: String
  },

  data () {
    return {
      show: true
    }
  }
}
</script>

<style>
.container {
  max-width: 50%;
  max-height: 70%;
  min-width: 400px;
  min-height: 600px;
  width: 100%;
  height: 100%;
}
</style>
