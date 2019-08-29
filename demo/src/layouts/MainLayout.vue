<template>
  <q-layout view="HHh LpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title v-if="$q.screen.width > 500">
          QPdfviewer <span class="text-outline" style="font-size: 14px;"> v{{ version }}</span>
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>

        <q-btn
          flat
          dense
          round
          @click="rightDrawerOpen = !rightDrawerOpen"
          aria-label="Table of Contents"
        >
          <q-icon name="menu" />
        </q-btn>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-style="background-color: #f8f8ff"
    >
      <q-list>
        <q-item-label header>Essential Links</q-item-label>
      </q-list>
      <essential-links />
    </q-drawer>

    <q-drawer
      v-model="rightDrawerOpen"
      side="right"
      bordered
      content-style="background-color: #f8f8ff"
    >
      <q-scroll-area class="fit">
        <q-list dense>
          <q-item
            v-for="item in toc"
            :key="item.id"
            clickable
            v-ripple
            dense
            @click="scrollTo(item.id)"
            :active="activeToc === item.id"
          >
          <q-item-section v-if="item.level > 1" side> • </q-item-section>
            <q-item-section
              :class="`toc-item toc-level-${item.level}`"
            >{{ item.label }}</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import { scroll } from 'quasar'

const version = require('@quasar/quasar-app-extension-qpdfviewer/package.json').version

export default {
  name: 'MainLayout',
  components: {
    'essential-links': () => import('../components/EssentialLinks')
  },
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      rightDrawerOpen: this.$q.platform.is.desktop,
      activeToc: 0,
      version: version
    }
  },
  computed: {
    ...mapGetters({
      toc: 'common/toc'
    })
  },
  mounted () {
    // code to handle anchor link on refresh/new page, etc
    if (location.hash !== '') {
      const id = location.hash.substring(1, location.hash.length)
      setTimeout(() => {
        this.scrollTo(id)
      }, 350)
    }
  },
  methods: {
    scrollTo (id) {
      this.activeToc = id
      const el = document.getElementById(id)

      if (el) {
        this.scrollPage(el)
      }
    },
    scrollPage (el) {
      const offset = el.offsetTop - 50
      scroll.setScrollPosition(window, offset, 500)
    }
  }
}
</script>
