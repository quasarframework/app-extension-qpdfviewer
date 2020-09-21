function extendPackageJson (api) {
  const dependencies = {
    'pdfjs-dist': '^2.5.0'
  }

  const devDependencies = {
    'worker-loader': '^3.0.2'
  }

  api.extendPackageJson({
    dependencies,
    devDependencies
  })
}

module.exports = function (api) {
  extendPackageJson(api)
}
