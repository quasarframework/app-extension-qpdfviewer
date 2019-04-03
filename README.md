QPdfViewer (@quasar/qpdfviewer)
===

![official icon](https://img.shields.io/badge/Quasar%201.0-Official%20UI%20App%20Extension-blue.svg)
![npm (scoped)](https://img.shields.io/npm/v/@quasar/quasar-app-extension-qpdfviewer.svg?style=plastic)
[![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/quasarframework/app-extension-qpdfviewer.svg)]()
[![GitHub repo size in bytes](https://img.shields.io/github/repo-size/quasarframework/app-extension-qpdfviewer.svg)]()
[![npm](https://img.shields.io/npm/dt/@quasar/quasar-app-extension-qpdfviewer.svg)](https://www.npmjs.com/package/@quasar/quasar-app-extension-qpdfviewer)

QPdfViewer is an `UI App Extension` for [Quasar Framework v1](https://v1.quasar-framework.org/). It will not work with legacy versions of Quasar Framework.

This work is currently in `beta` and there are expected changes while things get worked out. Your help with testing is greatly appreciated.

# Info
QPdfViewer allows you to have markdown in your web pages. You can either use the standard default slot or use the property `src` to define your markdown.

# Install
To add this App Extension to your Quasar application, run the following (in your Quasar app folder):
```
quasar ext add @quasar/qpdfviewer
```

# Uninstall
To remove this App Extension from your Quasar application, run the following (in your Quasar app folder):
```
quasar ext remove @quasar/qpdfviewer
```

# Describe
You can use `quasar describe QPdfViewer`

# Test Project
Can be found [here](https://github.com/hawkeye64/quasar-app-extension-qpdfviewer).

# Demo
Can be found [here](https://qpdfviewer.netlify.com/#/).

# Example Code
Be sure to check out the Test Project for more examples.
```
<q-pdfviewer
  v-model="show"
  src="'https://www.ets.org/Media/Tests/GRE/pdf/gre_research_validity_data.pdf'"
  content-class="absolute"
/>

or

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

```

---
NOTE:
  QPdfviewer uses the `<object>` tag for displaying the PDF. Should the browser not support this, the fallback is to use an `<iframe>`. And, should this also not be supported by the browser, then some text will be displayed with a link to the PDF so the user can download it for off-line viewing.

---

# QPdfviewer Vue Properties
| Vue&nbsp;Property | Type	| Description |
|---|---|---|
| value | Boolean | Use v-model to toggle visiblity |
| src | String | Path to the PDF source |
| error-string | String | Set this if you wish to change from the default error string |
| content-class | [String, Object, Array] | Style definitions to be attributed to the PDF container |
| content-style | [String, Object, Array] | Style definitions to be attributed to the PDF container |
| inner-content-class | [String, Object, Array] | Style definitions to be attributed to the PDF object |
| inner-content-style | [String, Object, Array] | Style definitions to be attributed to the PDF object |

QPdfViewer has no events or slots.