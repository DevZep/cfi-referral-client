<template>
  <div class="">
    <button
      href="#"
      class="flex items-center"
      @click="toggleVisibility"
      @keydown.space.exact.prevent="toggleVisibility"
      @keydown.esc.exact="hideDropdown"
      @keydown.shift.tab="hideDropdown"
      @keydown.up.exact.prevent="startArrowKeys"
      @keydown.down.exact.prevent="startArrowKeys"
    >
      <v-icon>mdi-en</v-icon>
      <img :src="`/flag_${$i18n.locale}.svg`" width="24" height="24" alt="flag" class="w-8 h-8">
      <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
        ><path class="heroicon-ui" d="M15.3 9.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z"></path>
      </svg>
    </button>
    <transition name="dropdown-fade">
      <ul v-on-clickaway="hideDropdown" v-if="isVisible" ref="dropdown" class="absolute normal-case z-30 font-normal xs:left-0 lg:right-0 bg-white shadow overflow-hidden rounded w-48 border mt-2 py-1 lg:z-20">
        <li>
          <a
            href="#"
            @click.prevent="setLocale('en')"
            ref="account"
            @keydown.up.exact.prevent=""
            @keydown.tab.exact="focusNext(false)"
            @keydown.down.exact.prevent="focusNext(true)"
            @keydown.esc.exact="hideDropdown"
          >
            <img src="/flag_en.svg" alt="english flag" class="w-8 h-8">
          </a>
        </li>
        <li>
          <a
            href="#"
            @click.prevent="setLocale('kh')"
            ref="account"
            @keydown.up.exact.prevent=""
            @keydown.tab.exact="focusNext(false)"
            @keydown.down.exact.prevent="focusNext(true)"
            @keydown.esc.exact="hideDropdown"
          >
            <img src="/flag_kh.svg" alt="khmer flag" class="w-8 w-8">
          </a>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'

export default {
  mixins: [clickaway],
  data () {
    return {
      isVisible: false,
      focusedIndex: 0
    }
  },
  methods: {
    toggleVisibility () {
      this.isVisible = !this.isVisible
    },
    hideDropdown () {
      this.isVisible = false
      this.focusedIndex = 0
    },
    startArrowKeys () {
      if (this.isVisible) {
        this.$refs.dropdown.children[0].children[0].focus()
      }
    },
    focusPrevious (isArrowKey) {
      this.focusedIndex = this.focusedIndex - 1
      if (isArrowKey) {
        this.focusItem()
      }
    },
    focusNext (isArrowKey) {
      this.focusedIndex = this.focusedIndex + 1
      if (isArrowKey) {
        this.focusItem()
      }
    },
    focusItem () {
      this.$refs.dropdown.children[this.focusedIndex].children[0].focus()
    },
    setLocale (locale) {
      if (locale !== this.$i18n.locale) {
        this.$i18n.locale = locale
        this.$router.push({
          params: { lang: locale }
        })
      }
      this.hideDropdown()
    }

  }
}
</script>

<style scoped>
  .dropdown-fade-enter-active, .dropdown-fade-leave-active {
    transition: all .1s ease-in-out;
  }
  .dropdown-fade-enter, .dropdown-fade-leave-to {
    opacity: 0;
    transform: translateY(-12px);
  }
</style>
