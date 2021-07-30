<template>
  <json-api-viewer
    title="QPdfviewer API"
    :json="json"
    no-menu
  />
</template>

<script>
import { defineComponent } from 'vue'
import Api from '../../../../../app-extension/src/component/QPdfviewer.json'

export default defineComponent({
  name: 'QPdfViewerJsonApi',
  setup () {
    return {
      json: Api
    }
  }
})
</script>
