import {
  QToolbar,
  QToolbarTitle,
  QSeparator,
  QBtn,
  QInput,
  QMenu
} from 'quasar'

import iconSet from './icon-set'
import lang from './lang'

const defaultLang = lang['en']

const selection = (element) => {
  const length = element.value ? element.value.length : 0
  element.setSelectionRange(0, length)
}

const QPDFBtn = {
  props: {
    icon: String,
    dense: Boolean
  },
  render (h) {
    return h(QBtn, {
      props: {
        icon: this.icon,
        flat: true,
        stretch: true,
        dense: this.dense
      },
      on: this.$listeners
    }, [
      this.$slots.default
    ])
  }
}

export const QPdfToolbarDesktop = {
  props: {
    title: String,
    page: Number,
    pagesCount: Number
  },
  data () {
    return {
      query: ''
    }
  },
  render (h) {
    return h(QToolbar, {
      staticClass: 'q-pdf-toolbar'
    }, [
      h(QToolbarTitle, this.title),
      h(QSeparator, {
        props: {
          vertical: true
        }
      }),
      h(QInput, {
        staticClass: 'q-px-sm',
        props: {
          value: this.page,
          filled: true,
          dense: true,
          hideBottomSpace: true
        },
        on: {
          input: (value) => this.$emit('changePage', value),
          click: (event) => selection(event.target)
        }
      }, [
        h('div', { slot: 'after' }, `/ ${this.pagesCount}`)
      ]),
      h(QSeparator, {
        props: {
          vertical: true
        }
      }),
      h(QPDFBtn, {
        props: {
          icon: iconSet.viewColumns
        },
        on: {
          click: () => this.$emit('toggleScrollMode')
        }
      }),
      h(QSeparator, {
        props: {
          vertical: true
        }
      }),
      h(QPDFBtn, {
        props: {
          icon: iconSet.zoomIn
        },
        on: {
          click: () => this.$emit('zoomIn')
        }
      }),
      h(QPDFBtn, {
        props: {
          icon: iconSet.zoomOut
        },
        on: {
          click: () => this.$emit('zoomOut')
        }
      }),
      h(QPDFBtn, {
        props: {
          icon: iconSet.search
        }
      }, [
        h(QMenu, {
          props: {
            persistent: true,
            contentClass: 'q-pdf-viewer-popup'
          },
          on: {
            hide: (event) => {
              this.query = ''
            }
          }
        }, [
          h(QInput, {
            props: {
              value: this.query,
              outlined: true,
              dense: true,
              hideBottomSpace: true,
              debounce: 300,
              autofocus: true
            },
            attrs: {
              placeholder: defaultLang.search
            },
            on: {
              input: (value) => {
                this.query = value
                this.$emit('search', value)
              }
            }
          })
        ])
      ]),
      this.$slots.default
    ])
  }
}

export const QPdfToolbarMobile = {
  props: {
    title: String,
    page: Number,
    pagesCount: Number
  },
  render (h) {
    return h(QToolbar, {
      staticClass: 'q-pdf-toolbar q-pdf-toolbar-mobile'
    }, [
      h(QPDFBtn, {
        props: {
          icon: iconSet.pagePrevious,
          dense: true
        },
        on: {
          click: (event) => this.$emit('pagePrevious', event)
        }
      }),
      h(QInput, {
        staticClass: 'col',
        props: {
          value: this.page,
          filled: true,
          dense: true,
          hideBottomSpace: true
        },
        on: {
          input: (value) => this.$emit('changePage', value),
          click: (event) => selection(event.target)
        }
      }, [
        h('div', { slot: 'after' }, `/ ${this.pagesCount}`)
      ]),
      h(QPDFBtn, {
        props: {
          icon: iconSet.pageNext,
          dense: true
        },
        on: {
          click: (event) => this.$emit('pageNext', event)
        }
      })
    ])
  }
}
