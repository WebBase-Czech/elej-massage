<script setup>
import { computed, ref } from 'vue'
import { changeLanguage, currentLanguage, t } from '../i18n/index'

const isMobileMenuOpen = ref(false)

const navServices = computed(() => {
  currentLanguage.value
  return t('header.nav.services')
})
const navAbout = computed(() => {
  currentLanguage.value
  return t('header.nav.about')
})
const navContact = computed(() => {
  currentLanguage.value
  return t('header.nav.contact')
})
const ctaBook = computed(() => {
  currentLanguage.value
  return t('header.cta')
})

function langLabel(lng) {
  switch (lng) {
    case 'cz':
      return 'CZ'
    case 'en':
      return 'EN'
    case 'de':
      return 'DE'
    default:
      return lng.toUpperCase()
  }
}
</script>

<template>
  <header class="bg-[#D2BEA3] px-3 sm:px-4 md:px-6 py-3">
    <nav class="mx-auto max-w-7xl">
      <div class="flex items-center justify-between gap-4">
        <section class="flex items-center gap-3 sm:gap-4">
          <img src="../assets/logo-tmave.png" alt="Logo" class="h-12 w-auto sm:h-14" />
          <div class="hidden md:flex items-center gap-4 lg:gap-6 text-sm lg:text-base text-[#6A4B2F]">
            <a href="#sluzby">{{ navServices }}</a>
            <a href="#omne">{{ navAbout }}</a>
            <a href="#kontakt">{{ navContact }}</a>
          </div>
        </section>

        <button
          type="button"
          class="md:hidden inline-flex items-center justify-center rounded border border-[#6A4B2F]/30 px-3 py-2 text-[#6A4B2F]"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <span class="material-symbols-outlined text-xl">{{ isMobileMenuOpen ? 'close' : 'menu' }}</span>
        </button>

        <section class="hidden md:flex items-center gap-4 lg:gap-6">
          <div class="flex items-center text-sm">
            <button
              type="button"
              class="px-1 transition-opacity"
              :class="currentLanguage === 'cz' ? 'font-semibold underline' : 'opacity-70 hover:opacity-100'"
              @click="changeLanguage('cz')"
            >
              {{ langLabel('cz') }}
            </button>
            <span class="px-2 text-gray-700">|</span>
            <button
              type="button"
              class="px-1 transition-opacity"
              :class="currentLanguage === 'en' ? 'font-semibold underline' : 'opacity-70 hover:opacity-100'"
              @click="changeLanguage('en')"
            >
              {{ langLabel('en') }}
            </button>
            <span class="px-2 text-gray-700">|</span>
            <button
              type="button"
              class="px-1 transition-opacity"
              :class="currentLanguage === 'de' ? 'font-semibold underline' : 'opacity-70 hover:opacity-100'"
              @click="changeLanguage('de')"
            >
              {{ langLabel('de') }}
            </button>
          </div>

          <button type="button" class="px-4 py-2 rounded bg-[#664B2F] text-white hover:bg-[#5b4228]">
            {{ ctaBook }}
          </button>
        </section>
      </div>

      <div v-if="isMobileMenuOpen" class="md:hidden mt-3 rounded bg-[#E5D2B8]/70 p-4 space-y-4 text-[#6A4B2F]">
        <div class="flex flex-col gap-2 text-sm">
          <a href="#sluzby" @click="isMobileMenuOpen = false">{{ navServices }}</a>
          <a href="#omne" @click="isMobileMenuOpen = false">{{ navAbout }}</a>
          <a href="#kontakt" @click="isMobileMenuOpen = false">{{ navContact }}</a>
        </div>

        <div class="flex items-center text-sm">
          <button
            type="button"
            class="px-1 transition-opacity"
            :class="currentLanguage === 'cz' ? 'font-semibold underline' : 'opacity-70 hover:opacity-100'"
            @click="changeLanguage('cz')"
          >
            {{ langLabel('cz') }}
          </button>
          <span class="px-2 text-gray-700">|</span>
          <button
            type="button"
            class="px-1 transition-opacity"
            :class="currentLanguage === 'en' ? 'font-semibold underline' : 'opacity-70 hover:opacity-100'"
            @click="changeLanguage('en')"
          >
            {{ langLabel('en') }}
          </button>
          <span class="px-2 text-gray-700">|</span>
          <button
            type="button"
            class="px-1 transition-opacity"
            :class="currentLanguage === 'de' ? 'font-semibold underline' : 'opacity-70 hover:opacity-100'"
            @click="changeLanguage('de')"
          >
            {{ langLabel('de') }}
          </button>
        </div>

        <button type="button" class="w-full px-4 py-2 rounded bg-[#664B2F] text-white hover:bg-[#5b4228]">
          {{ ctaBook }}
        </button>
      </div>
    </nav>
  </header>
</template>