<script setup>
import { changeLanguage, currentLanguage } from '../i18n/index'
import { tr } from '../i18n/index'

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

defineEmits(['scroll-requested']);
</script>

<template>
  <footer class="bg-[#664B2F] text-[#E5D2B8]">
    <div class="max-w-7xl mx-auto px-[6px] sm:px-3 md:px-4 pb-8 sm:pb-10">
      <div class="flex flex-col gap-8 items-center md:flex-row md:justify-between md:items-start">
        <div class="space-y-2 flex flex-col items-center md:items-start">
          <img src="../assets/logo-bile.png" alt="Logo-bílé" class="h-50 sm:h-50 lg:h-50 w-auto" />

          <div class="text-lg sm:text-sm text-[#E5D2B8]/90 leading-relaxed">
            <div class="flex gap-2">
              <img src="../assets/poloha.svg" alt="poloha">
              <p>{{ tr('footer.contact.address') }}</p>
            </div>

            <div class="flex gap-2 justify-center md:justify-start">
              <img src="../assets/telefon.svg" alt="telefon">
              <p>{{ tr('footer.contact.phone') }}</p>
            </div>

            <div class="flex gap-2 justify-center md:justify-start">
              <p>IČO: 24540200</p>
            </div>
            
          </div>
        </div>

        <div class="flex space-x-8 md:grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 text-xs sm:text-sm pt-6 md:pt-18">
          <div>
            <p class="uppercase tracking-wider text-[#E5D2B8]">{{ tr('footer.nav.title') }}</p>
            <ul class="mt-4 space-y-2 text-[#E5D2B8]/90">
              <li><a @click="$emit('scroll-requested', 'sluzby')" class="hover:text-white transition-colors cursor-pointer">{{ tr('footer.nav.services') }}</a></li>
              <li><a @click="$emit('scroll-requested', 'o-mne')" class="hover:text-white transition-colors cursor-pointer">{{ tr('footer.nav.about') }}</a></li>
              <li><a @click="$emit('scroll-requested', 'kontakt')" class="hover:text-white transition-colors cursor-pointer">{{ tr('footer.nav.booking') }}</a></li>
            </ul>
          </div>

          <div>
            <p class="uppercase tracking-wider text-[#E5D2B8]">{{ tr('footer.info.title') }}</p>
            <ul class="mt-4 space-y-2 text-[#E5D2B8]/90">
              <li><a href="/gdpr.pdf" target="_blank" class="hover:text-white transition-colors">{{ tr('footer.info.privacy') }}</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mt-6 sm:mt-8 border-t border-[#E5D2B8]/40 pt-4 flex flex-col gap-4 sm:flex-row sm:items-center items-center sm:justify-between">
        <p class="text-[10px] sm:text-xs text-[#E5D2B8]/80">
          {{ tr('footer.copyright') }}
        </p>

        <div class="flex items-center text-[10px] sm:text-xs">
          <button
            type="button"
            class="px-1 transition-opacity cursor-pointer"
            :class="currentLanguage === 'cz' ? 'font-semibold underline text-white' : 'opacity-80 hover:opacity-100'"
            @click="changeLanguage('cz')"
          >
            {{ langLabel('cz') }}
          </button>
          <span class="px-2 text-[#E5D2B8]/70">|</span>
          <button
            type="button"
            class="px-1 transition-opacity cursor-pointer"
            :class="currentLanguage === 'en' ? 'font-semibold underline text-white' : 'opacity-80 hover:opacity-100'"
            @click="changeLanguage('en')"
          >
            {{ langLabel('en') }}
          </button>
          <span class="px-2 text-[#E5D2B8]/70">|</span>
          <button
            type="button"
            class="px-1 transition-opacity cursor-pointer"
            :class="currentLanguage === 'de' ? 'font-semibold underline text-white' : 'opacity-80 hover:opacity-100'"
            @click="changeLanguage('de')"
          >
            {{ langLabel('de') }}
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>