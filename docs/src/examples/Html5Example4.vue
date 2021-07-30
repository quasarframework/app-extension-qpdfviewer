<template>
  <div class="q-pa-md q-gutter-sm" style="height: 600px;">
    <q-pdfviewer
      v-model="show"
      type="html5"
      :src="src"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: true,
      src: '/pdf/gre_research_validity_data.pdf'
    }
  }
}
</script>
