// const PdfjsWorker = require('pdfjs-dist/build/pdf.worker.js')
// const PDFJS = require('pdfjs-dist/build/pdf.js')
// PDFJS.GlobalWorkerOptions.workerPort = new PdfjsWorker()

const PdfjsWorker = require('pdfjs-dist/build/pdf.worker.js')
const PDFJS = require('pdfjs-dist/build/pdf.js')
console.log(PdfjsWorker)
PDFJS.GlobalWorkerOptions.workerPort = PdfjsWorker
// PDFJS.GlobalWorkerOptions.workerSrc = PdfjsWorker

export default PDFJS
