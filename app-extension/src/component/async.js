export default () => ({
  component: import('./QPdfviewer.js').then(res => res.default)
  // loading: LoadingComponent,
  // error: ErrorComponent,
  // timeout: 3000
})
