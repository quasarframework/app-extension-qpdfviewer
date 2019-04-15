<template>
  <q-page class="flex flex-center">
    <q-pdfviewer
      v-model="show"
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
      src: 'https://www.ets.org/Media/Tests/GRE/pdf/gre_research_validity_data.pdf'
    }
  }
}
</script>

<style>
</style>
