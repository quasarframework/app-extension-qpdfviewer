<template>
  <div class="q-pa-md q-gutter-sm">

    <q-checkbox v-model="noScroll" label="Disable scrolling when showing overlay" />

  </div>

</template>

<script>
import { defineComponent, onBeforeUnmount, reactive, toRefs } from 'vue'


export default defineComponent({
  name: 'example',
  components: {
  },

  setup () {
    const properties = reactive({
      show: false,
    })


    return {
      ...toRefs(properties),
    }
  }
})
</script>
