QPdfviewer
===

QPdfviewer is a [Quasar App Extension](https://quasar.dev/app-extensions/introduction). It allows you to display PDF documents in your Quasar App.

![QPdfviewer](statics/qpdfviewer.png "QWindow" =800x800)

This work is currently in `beta` and there are expected changes while things get worked out. Your help with testing is greatly appreciated. Suggestions and PRs welcomed.

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
(TBD) You can use `quasar describe QPdfviewer`

# Docs
Can be found [here](https://quasarframework.github.io/app-extension-qpdfviewer).

# Examples
Can be found [here](https://quasarframework.github.io/app-extension-qpdfviewer/examples).

# Demo (source) Project
Can be found [here](https://github.com/quasarframework/app-extension-qpdfviewer/tree/master/demo).

# About QPdfviewer
QPdfviewer has the ability to use two differnt PDF viewing engines: 1) HTML5 and 2) PDFJS (Mozilla). Each one is a bit different and you must choose which one is best suited for your needs. HTML5 is the browser-native one. If you are using Electron, this will not be available, so you must use the PDFJS engine. To specify which engine to use, add the `type` property with values `html5` or `pdfjs`. Another note about PDFJS, is that it brings a lot of resources to the client, while the HTML5 engine is already built into most modern browsers.

:::tip
If you are working with Electron, the `type` will automatically be `pdfjs` and changing `type="html5"` will have no effect
:::

# Working with QPdfviewer
Working with QPdfviewer can be very minimal:
```html
  <q-pdfviewer
    v-model="visible"
    src="statics/pdf/c4611_sample_explain.pdf"
    type="html5"
  />
```
or
```html
  <q-pdfviewer
    v-model="visible"
    src="statics/pdf/c4611_sample_explain.pdf"
    type="pdfjs"
  />
```

# PDFjs
The PDFjs engine is a bit buggy. It's been found that it works best if you can provide a full URL instead of a relative URL.

# Blobs
If you want to load a PDF as a blob, you can do it like this:

```js
fetchPDF (payload) {
  this.$axios.post('/inpatientPDFs/snr/download', payload, { responseType: 'blob' }).then(res => {
    // console.log('am i downloading?', res)
    const blob = new Blob([res.data], { type: res.data.type })
    const url = window.URL.createObjectURL(blob)
    pdfSrc = url // where pdfSrc is used in the :src parameter of the qpdfviewer
  }).catch(err => {
    console.log('or do i have an error?', err) // TODO beef up this
    this.$q.notify({ message: 'Error downloading PDF', type: 'negative', textColor: 'white', color: 'negative', icon: 'error', closeBtn: 'close', position: 'top' })
  })
}
```

# Blob issues with Android
There are some [known issues](https://stackoverflow.com/questions/40750143/android-url-createobjecturl-does-not-work-properly-failed-to-load-because-no-s) with creating blobs on an Android. This is the work-around:

```js
let url = (window.URL || window.webkitURL || window || {}).createObjectURL(blob)
// workaround for mobile playback, where it didn't work on chrome/android.
// fetch blob at url using xhr, and use url generated from that blob.
// see issue: https://code.google.com/p/chromium/issues/detail?id=227476
// thanks, gbrlg
var xhr = new XMLHttpRequest()
xhr.open('GET', url, true)
xhr.responseType = 'blob'
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status == 200) {
    var url = (window.URL || window.webkitURL || window || {}).createObjectURL(xhr.response)

    // now url is ready
  }
}
xhr.send()
```