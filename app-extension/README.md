QPdfViewer (@quasar/qpdfviewer)
===

![npm (scoped)](https://img.shields.io/npm/v/@quasar/quasar-app-extension-qpdfviewer@next?style=plastic)
[![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/quasarframework/app-extension-qpdfviewer.svg)]()
[![GitHub repo size in bytes](https://img.shields.io/github/repo-size/quasarframework/app-extension-qpdfviewer.svg)]()
[![npm](https://img.shields.io/npm/dt/@quasar/quasar-app-extension-qpdfviewer.svg)](https://www.npmjs.com/package/@quasar/quasar-app-extension-qpdfviewer)

QPdfViewer is an `UI App Extension` for [Quasar Framework v1](https://v1.quasar-framework.org/). It will not work with legacy versions of Quasar Framework.

This work is currently in `beta` and there are expected changes while things get worked out. Your help with testing is greatly appreciated. Suggestions and PRs welcomed.

# Info
QPdfViewer allows you to have PDF in your web pages.

# Install
To add this App Extension to your Quasar application, run the following (in your Quasar app folder):
```
quasar ext add @quasar/qpdfviewer@next
```

# Uninstall
To remove this App Extension from your Quasar application, run the following (in your Quasar app folder):
```
quasar ext remove @quasar/qpdfviewer
```

# Describe
You can use `quasar describe QPdfViewer`

# Test Project
In **demo** folder of **app-extension-qpdfviewer**.

# Docs and Demo
Can be found [here](https://qpdfviewer.netlify.app/)

# Example Code
Be sure to check out the Test Project for more examples.

```html
<q-pdfviewer
  src="'https://www.ets.org/Media/Tests/GRE/pdf/gre_research_validity_data.pdf'"
  type="pdfjs"
  content-class="absolute"
/>

or

<template>
  <div class="container q-pa-lg">
    <q-pdfviewer
      :src="src"
      type="html5"
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

```

Using blob data (for `type="html5"` only):

```js
fetchPDF (payload) {
  axios.post('/my/url/to/pdf', payload, { responseType: 'blob' })
    .then(res => {
      // create the blob
      const blob = new Blob([res.data], { type: res.data.type })
      // set reactive variable
      pdfSrc = window.URL.createObjectURL(blob)
    })
    .catch(err => {
      $q.notify({
        message: 'Error downloading PDF',
        type: 'negative',
        textColor: 'white',
        color: 'negative',
        icon: 'error',
        closeBtn: 'close',
        position: 'top'
      })
    })
}
```

---
NOTE:
  QPdfviewer now has support for native HTML5 PDF viewer and for PDFJS. Use `type="html5"` or `type="pdfjs"`. If you previously had this app extension, and want to use the pdfjs, you will need to re-install it. An update will not get the PDFJS for you. If you update, you can run `quasar ext invoke @quasar/qpdfviewer` instead of re-installing.

---
NOTE:
  QPdfviewer uses the `<object>` tag for displaying the PDF (`type="html5"` only). Should the browser not support this, the fallback is to use an `<iframe>`. And, should this also not be supported by the browser, then some text will be displayed with a link to the PDF so the user can download it for off-line viewing.

  When using PDFJS, the PDF is always displayed in an `<iframe>`.

---
NOTE:
  QPdfviewer now works with Electron, but you have to use `type="pdfjs"` to get this functionality.

---

# QPdfviewer Vue Properties
| Vue&nbsp;Property | Type	| Description |
|---|---|---|
| src | String | Path to the PDF source |
| type | String | PDF engine to use (values: `html5` or `pdfjs`) |
| error-string | String | Set this if you wish to change from the default error string |
| load | Function | The function to be called when the pdf document has been loaded |
| error | Function | The function to be called when the pdf document has an error |
| content-class | [String, Object, Array] | Style definitions to be attributed to the PDF container |
| content-style | [String, Object, Array] | Style definitions to be attributed to the PDF container |
| inner-content-class | [String, Object, Array] | Style definitions to be attributed to the PDF object |
| inner-content-style | [String, Object, Array] | Style definitions to be attributed to the PDF object |

QPdfViewer has no events or slots.

# Donate
If you appreciate the work that went into this App Extension, please consider [donating to Quasar](https://donate.quasar.dev).
