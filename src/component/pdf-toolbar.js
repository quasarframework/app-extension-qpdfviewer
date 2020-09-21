import {
  QToolbar,
  QToolbarTitle,
  QSeparator,
  QBtn,
  QInput,
  QMenu
} from 'quasar'

import icons from './icons'
import i18n from './i18n'

const lang = i18n['en']

const selection = (element) => {
  const length = element.value ? element.value.length : 0
  element.setSelectionRange(0, length)
}

const QPDFBtn = {
  props: {
    icon: String
  },
  render (h) {
    return h(QBtn, {
      props: {
        icon: this.icon,
        flat: true,
        stretch: true
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
      h(
        'div',
        {
          staticClass: 'row items-center q-col-gutter-x-xs q-px-sm'
        },
        [
          h(QInput, {
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
          }),
          h('div', '/ ' + this.pagesCount)
        ]
      ),
      h(QSeparator, {
        props: {
          vertical: true
        }
      }),
      h(QPDFBtn, {
        props: {
          icon: icons.viewColumns
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
          icon: icons.zoomIn
        },
        on: {
          click: () => this.$emit('zoomIn')
        }
      }),
      h(QPDFBtn, {
        props: {
          icon: icons.zoomOut
        },
        on: {
          click: () => this.$emit('zoomOut')
        }
      }),
      h(QPDFBtn, {
        props: {
          icon: icons.find
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
              placeholder: lang.search
            },
            on: {
              input: (value) => {
                this.query = value
                this.$emit('find', value)
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
          icon: icons.pagePrevious
        },
        on: {
          click: (event) => this.$emit('pagePrevious', event)
        }
      }),
      h(QInput, {
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
      }),
      h('div', '/'),
      h('div', this.pagesCount),
      h(QPDFBtn, {
        props: {
          icon: icons.pageNext
        },
        on: {
          click: (event) => this.$emit('pageNext', event)
        }
      })
    ])
  }
}
