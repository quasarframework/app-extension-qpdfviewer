<template>
  <div class="flex flex-start" style="height: 100px;">
    <q-dialog v-model="showDialog" :maximized="$q.screen.lt.md">
      <q-card class="no-scroll" style="background: yellow; min-width: 80vw; min-height: 80vh; width: 100%; height: 100%;">
        <q-bar class="bg-brand-light">
          <h5 class="text-brand-text">{{ title }}</h5>
          <q-space></q-space>
          <q-btn @click="hideDialog" color="white" flat icon="close"></q-btn>
        </q-bar>

        <div class="fit">
          <q-pdfviewer
            type="html5"
            :src="src"
          />
        </div>
      </q-card>
    </q-dialog>

    <div class="q-pa-md q-gutter-sm">
      <q-btn @click="onClick" label="Show dialog"></q-btn>
    </div>
  </div>
</template>

<style>
</style>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const showDialog = ref(false)

    function onClick () {
      showDialog.value = true
    }

    function hideDialog () {
      showDialog.value = false
    }

    return {
      src: '/pdf/pdf-test.pdf',
      title: 'QDialog with QPdfviewer',
      showDialog,
      onClick,
      hideDialog
    }
  }
}
</script>

<style scoped>
.shorten-pdf{
  height: calc(100% - 30px);
}
</style>
