// const PdfjsWorker = require('pdfjs-dist/build/pdf.worker.js')
// const PDFJS = require('pdfjs-dist/build/pdf.js')
// PDFJS.GlobalWorkerOptions.workerPort = new PdfjsWorker()

const PdfjsWorker = require("worker-loader?esModule=false!pdfjs-dist/build/pdf.worker.js")
const PDFJS = require('pdfjs-dist/build/pdf.js')
debugger
console.log(PdfjsWorker)
PDFJS.GlobalWorkerOptions.workerPort = new PdfjsWorker()
// PDFJS.GlobalWorkerOptions.workerSrc = PdfjsWorker

export default PDFJS
