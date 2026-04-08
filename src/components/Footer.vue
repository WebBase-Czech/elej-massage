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
</script>

<template>
  <footer class="bg-[#664B2F] text-[#E5D2B8]">
    <div class="max-w-7xl mx-auto px-[6px] sm:px-3 md:px-4 py-8 sm:py-10">
      <div class="flex flex-col gap-8 sm:gap-10 md:flex-row md:justify-between md:items-start">
        <div class="space-y-6">
          <img src="../assets/logo-bile.png" alt="Elei Massage logo" class="h-14 sm:h-16 lg:h-20 w-auto" />

          <div class="text-xs sm:text-sm text-[#E5D2B8]/90 leading-relaxed">
            <p>{{ tr('footer.contact.address') }}</p>
            <p>{{ tr('footer.contact.phone') }}</p>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 text-xs sm:text-sm">
          <div>
            <p class="uppercase tracking-wider text-[#E5D2B8]">{{ tr('footer.nav.title') }}</p>
            <ul class="mt-4 space-y-2 text-[#E5D2B8]/90">
              <li><a href="#sluzby" class="hover:text-white transition-colors">{{ tr('footer.nav.services') }}</a></li>
              <li><a href="#omne" class="hover:text-white transition-colors">{{ tr('footer.nav.about') }}</a></li>
              <li><a href="#" class="hover:text-white transition-colors">{{ tr('footer.nav.booking') }}</a></li>
            </ul>
          </div>

          <div>
            <p class="uppercase tracking-wider text-[#E5D2B8]">{{ tr('footer.info.title') }}</p>
            <ul class="mt-4 space-y-2 text-[#E5D2B8]/90">
              <li><a href="#" class="hover:text-white transition-colors">{{ tr('footer.info.privacy') }}</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mt-6 sm:mt-8 border-t border-[#E5D2B8]/40 pt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p class="text-[10px] sm:text-xs text-[#E5D2B8]/80">
          {{ tr('footer.copyright') }}
        </p>

        <div class="flex items-center text-[10px] sm:text-xs">
          <button
            type="button"
            class="px-1 transition-opacity"
            :class="currentLanguage === 'cz' ? 'font-semibold underline text-white' : 'opacity-80 hover:opacity-100'"
            @click="changeLanguage('cz')"
          >
            {{ langLabel('cz') }}
          </button>
          <span class="px-2 text-[#E5D2B8]/70">|</span>
          <button
            type="button"
            class="px-1 transition-opacity"
            :class="currentLanguage === 'en' ? 'font-semibold underline text-white' : 'opacity-80 hover:opacity-100'"
            @click="changeLanguage('en')"
          >
            {{ langLabel('en') }}
          </button>
          <span class="px-2 text-[#E5D2B8]/70">|</span>
          <button
            type="button"
            class="px-1 transition-opacity"
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