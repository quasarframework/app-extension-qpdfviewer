// @doc https://gist.github.com/jsprpalm/12217feab2f1acc14bd8e8508291619e
const MIN_SCALE = 0.5
const MAX_SCALE = 4

const getDefault = () => {
  return {
    startX: 0,
    startY: 0,
    initialPinchDistance: 0,
    pinchScale: 1
  }
}

export default (PDFJS, PDFViewerLib) => {
  const { PDFSinglePageViewer, PDFViewer } = PDFViewerLib
  PDFSinglePageViewer.prototype.onTouchStart = PDFViewer.prototype.onTouchStart = function (event) {
    if (event.touches.length > 1) {
      this._pinchZoom.startX = (event.touches[0].pageX + event.touches[1].pageX) / 2
      this._pinchZoom.startY = (event.touches[0].pageY + event.touches[1].pageY) / 2
      this._pinchZoom.initialPinchDistance = Math.hypot(
        event.touches[1].pageX - event.touches[0].pageX,
        event.touches[1].pageY - event.touches[0].pageY
      )
    } else {
      this._pinchZoom.initialPinchDistance = 0
    }
  }

  PDFSinglePageViewer.prototype.onTouchMove = PDFViewer.prototype.onTouchMove = function (event) {
    if (this._pinchZoom.initialPinchDistance <= 0 || event.touches.length < 2) {
      return
    }

    if (event.scale !== 1) {
      event.preventDefault()
    }
    const pinchDistance = Math.hypot(
      event.touches[1].pageX - event.touches[0].pageX,
      event.touches[1].pageY - event.touches[0].pageY
    )
    this._pinchZoom.pinchScale = pinchDistance / this._pinchZoom.initialPinchDistance

    const originX = this._pinchZoom.startX + this.container.scrollLeft
    const originY = this._pinchZoom.startY + this.container.scrollTop

    this.viewer.style.transform = `scale(${this._pinchZoom.pinchScale})`
    this.viewer.style.transformOrigin = `${originX}px ${originY}px`
  }

  PDFSinglePageViewer.prototype.onTouchEnd = PDFViewer.prototype.onTouchEnd = function () {
    if (this._pinchZoom.initialPinchDistance <= 0) {
      return
    }
    this.viewer.style.transform = 'none'
    this.viewer.style.transformOrigin = 'unset'

    // Prevent Zoom
    let newScale = (this.currentScale * this._pinchZoom.pinchScale).toFixed(2)
    newScale = Math.ceil(newScale * 10) / 10
    if (newScale > MAX_SCALE) {
      newScale = MAX_SCALE
    }
    if (newScale < MIN_SCALE) {
      newScale = MIN_SCALE
    }

    /* this.currentScale *= this._pinchZoom.pinchScale

    const rect = this.container.getBoundingClientRect()
    const dx = this.startX - rect.left
    const dy = this.startY - rect.top
    this.container.scrollLeft += dx * (this._pinchZoom.pinchScale - 1)
    this.container.scrollTop += dy * (this._pinchZoom.pinchScale - 1) */

    // Compute the current center point in page coordinates
    const pageCenterX = this.container.clientWidth / 2 + this.container.scrollLeft
    const pageCenterY = this.container.clientHeight / 2 + this.container.scrollTop

    // Compute the next center point in page coordinates
    const centerX = (pageCenterX - this.originX) / this._pinchZoom.pinchScale + this.originX
    const centerY = (pageCenterY - this.originY) / this._pinchZoom.pinchScale + this.originY

    // Compute the ratios of the center point to the total scrollWidth/scrollHeight
    const px = centerX / this.container.scrollWidth
    const py = centerY / this.container.scrollHeight

    // Scale
    this.currentScale = newScale

    // Set the scrollbar positions using the percentages and the new scrollWidth/scrollHeight
    // setTimeout(() => {
    this.container.scrollLeft = this.container.scrollWidth * px - this.container.clientWidth / 2
    this.container.scrollTop = this.container.scrollHeight * py - this.container.clientHeight / 2
    // })

    this._pinchZoom = getDefault()
  }

  return (self) => {
    self._pinchZoom = getDefault()
    self.viewer.addEventListener('touchstart', self.onTouchStart.bind(self), false)
    self.viewer.addEventListener('touchmove', self.onTouchMove.bind(self), false)
    self.viewer.addEventListener('touchend', self.onTouchEnd.bind(self), false)
  }
}
