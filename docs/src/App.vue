<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import { useMeta } from 'quasar'

import { provideMarkdownStore } from 'assets/markdown-store.js'
import getMeta from 'assets/get-meta.js'

export default defineComponent({
  name: 'App',

  setup () {
    useMeta({
      title: 'QPdfviewer » PDF viewer for your Quasar apps',
      titleTemplate: title => `${ title } » QPdfviewer`,

      meta: getMeta(
        'QPdfviewer - PDF viewer for your Quasar apps',
        'QPdfviewer allows PDF files to be viewed for your Quasar apps.'
      )
    })

    provideMarkdownStore()
  }
})
</script>
