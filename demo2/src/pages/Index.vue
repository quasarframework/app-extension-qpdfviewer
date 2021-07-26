<template>
  <q-page class="column" style="height: 100%">
    <q-pdfviewer
      v-model="visible"
      class="col"
      src="/pdf/pdf-test.pdf"
      type="pdfjs"/>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'PageIndex',

  setup() {
    const visible = ref(true)

    return  {
      visible
    }
  }
})
</script>
