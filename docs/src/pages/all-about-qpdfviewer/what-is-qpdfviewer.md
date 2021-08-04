---
title: What is QPdfviewer
desc: PDF Viewer
keys: All about QPdfviewer
related:
  - /contributing/bugs-and-feature-requests
  - /contributing/components
  - /contributing/documentation
  - /contributing/sponsor
---
::: warning
Please note that the codepen links, in the documentation examples, do not work at this time.

And, if you're looking to help out, check out our [Call to action](/contributing/call-to-action) in the **Contributing** section.
:::

## Everything you need for a complete solution

QPdfviewer allows you to view PDF documents in your Quasar app.

## Features

- Embedded PDF viewer
- Choose native HTML5 PDF viewer or PDFjs
- PDFjs works with Capacitor, Cordova and Electron

## Breaking changes

QPdfviewer no longer has a property (previously `v-model`) for showing/hiding the component. Use Vue's `v-if` or `v-show` instead.