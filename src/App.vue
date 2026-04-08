<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Massage from './components/Massage.vue'

import { tr } from './i18n/index'
</script>

<template>
  <Header />

  <main class="bg-[#E5D2B8]">
    <section class="min-h-[72vh] flex flex-col items-center justify-center text-center px-[6px] sm:px-3 md:px-4 py-12 sm:py-16">
      <p class="text-[9px] sm:text-[10px] tracking-[0.16em] sm:tracking-[0.22em] uppercase text-[#6A4B2F]/70 mb-6 sm:mb-8">
        {{ tr('hero.badge') }}
      </p>

      <h1 class="font-serif text-[#6A4B2F] text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05]">
        <span class="block">{{ tr('hero.title1') }}</span>
        <span class="block italic font-light">{{ tr('hero.title2') }}</span>
      </h1>

      <p class="mt-5 sm:mt-6 max-w-2xl text-[#6A4B2F]/80 text-xs sm:text-sm md:text-base leading-relaxed px-2 sm:px-0">
        {{ tr('hero.subtitle') }}
      </p>

      <button
        type="button"
        class="mt-8 sm:mt-10 px-6 sm:px-8 py-2.5 sm:py-3 rounded bg-[#664B2F] text-white text-sm sm:text-base font-semibold hover:bg-[#5b4228]"
      >
        {{ tr('hero.cta') }}
      </button>
    </section>
    
    <section>
      <div id="omne" class="max-w-7xl mx-auto px-[6px] sm:px-3 md:px-4 py-12 sm:py-16 grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16 items-center">
        <div class="relative md:col-span-2 max-w-[320px] sm:max-w-[380px] md:max-w-[420px] mx-auto md:mx-0">
          <div class="bg-white p-4 sm:p-6 rounded-sm">
            <img
              src="./assets/majitelka.jpeg"
              alt="Elen Jurásková"
              class="w-full h-auto object-cover"
            />
          </div>

          <div class="absolute -bottom-2 left-4 sm:left-6 bg-[#664B2F] text-white px-4 sm:px-6 py-3 sm:py-4">
            <div class="font-serif text-base sm:text-lg leading-tight">Elen Jurásková</div>
            <div class="text-[10px] opacity-90">Zakladatelka salonu</div>
          </div>
        </div>

        <div class="text-left md:col-span-3">
          <p class="font-serif italic text-[#6A4B2F] text-xl sm:text-2xl lg:text-3xl whitespace-pre-line">
            {{ tr('owner.quote') }}
          </p>

          <div class="mt-6 max-w-prose text-[#6A4B2F]/80 text-xs sm:text-sm leading-relaxed space-y-4">
            <p>{{ tr('owner.p1') }}</p>
            <p>{{ tr('owner.p2') }}</p>
          </div>
        </div>
      </div>
    </section>

    <section id="sluzby" class="max-w-7xl mx-auto px-[6px] sm:px-3 md:px-4 py-14 sm:py-20 lg:py-24">
      <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 sm:gap-6">
        <h2 class="font-serif text-[#6A4B2F] text-3xl sm:text-4xl lg:text-5xl leading-tight">{{ tr('procedures.title') }}</h2>
        <p class="uppercase tracking-[0.16em] sm:tracking-[0.2em] text-[#6A4B2F]/70 text-[10px] sm:text-xs max-w-sm lg:text-right">
          {{ tr('procedures.subtitle') }}
        </p>
      </div>

      <div class="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
        <Massage
          icon="front_hand"
          :title="tr('procedures.cards.sport.title')"
          :description="tr('procedures.cards.sport.description')"
          :prices="[
            { time: tr('procedures.cards.sport.prices.p30.time'), price: tr('procedures.cards.sport.prices.p30.price') },
            { time: tr('procedures.cards.sport.prices.p60.time'), price: tr('procedures.cards.sport.prices.p60.price') },
            { time: tr('procedures.cards.sport.prices.p90.time'), price: tr('procedures.cards.sport.prices.p90.price') }
          ]"
        />
        <Massage
          icon="spa"
          :title="tr('procedures.cards.ayurveda.title')"
          :description="tr('procedures.cards.ayurveda.description')"
          :prices="[
            { time: tr('procedures.cards.ayurveda.prices.p60.time'), price: tr('procedures.cards.ayurveda.prices.p60.price') },
            { time: tr('procedures.cards.ayurveda.prices.p90.time'), price: tr('procedures.cards.ayurveda.prices.p90.price') }
          ]"
        />
        <Massage
          icon="bloodtype"
          :title="tr('procedures.cards.cupping.title')"
          :description="tr('procedures.cards.cupping.description')"
          :prices="[
            { time: tr('procedures.cards.cupping.prices.p30.time'), price: tr('procedures.cards.cupping.prices.p30.price') },
            { time: tr('procedures.cards.cupping.prices.p60.time'), price: tr('procedures.cards.cupping.prices.p60.price') }
          ]"
        />
      </div>

      <p class="mt-10 sm:mt-16 text-center font-serif text-[#6A4B2F]/85 text-xl sm:text-2xl lg:text-3xl">
        {{ tr('procedures.note') }}
      </p>
    </section>

    <section id="kontakt" class="relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-[6px] sm:px-3 md:px-4 py-14 sm:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-20">
        <div class="relative">
          <span
            aria-hidden="true"
            class="pointer-events-none select-none absolute -top-8 sm:-top-12 -left-4 sm:-left-10 font-serif text-[110px] sm:text-[170px] lg:text-[210px] leading-none text-[#6A4B2F]/10 uppercase"
          >
            SEBE
          </span>

          <h2 class="relative z-10 font-serif text-[#6A4B2F] text-3xl sm:text-5xl lg:text-6xl leading-[1.03]">
            <span class="block">Udělejte si čas jen</span>
            <span class="block font-semibold">na sebe</span>
          </h2>

          <div class="mt-8 sm:mt-14 max-w-md text-[#6A4B2F]/85 text-base sm:text-xl lg:text-2xl leading-relaxed space-y-5 sm:space-y-8">
            <p>
              Dopřejte svému tělu i mysli zasloužený odpočinek. Vyberte si z naší nabídky služeb a navrhněte termín,
              který vám vyhovuje nejlépe.
            </p>
            <p>
              Tento formulář slouží jako nezávazná poptávka. Po jeho odeslání se vám co nejdříve ozveme, abychom
              společně termín potvrdili a doladili detaily vaší návštěvy. Těšíme se na vás.
            </p>
          </div>

          <div class="mt-8 sm:mt-12 space-y-3 sm:space-y-4 text-[#6A4B2F]/90 text-base sm:text-xl lg:text-2xl">
            <p class="flex items-center gap-3">
              <span class="material-symbols-outlined text-xl sm:text-[26px]">location_on</span>
              Znojemská 100, 669 02 Hnanice
            </p>
            <p class="flex items-center gap-3">
              <span class="material-symbols-outlined text-xl sm:text-[26px]">call</span>
              +420 727 943 691
            </p>
            <p class="flex items-center gap-3">
              <span class="material-symbols-outlined text-xl sm:text-[26px]">photo_camera</span>
              elej.massage
            </p>
          </div>
        </div>

        <form class="text-[#6A4B2F]">
          <div class="space-y-6">
            <div>
              <label for="name" class="block text-xs sm:text-sm uppercase mb-2">Jméno a příjmení</label>
              <input id="name" type="text" class="w-full rounded-md bg-[#FFF6E5] px-4 py-3 outline-none border border-[#6A4B2F]/10" />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="email" class="block text-xs sm:text-sm uppercase mb-2">E-mail</label>
                <input id="email" type="email" class="w-full rounded-md bg-[#FFF6E5] px-4 py-3 outline-none border border-[#6A4B2F]/10" />
              </div>
              <div>
                <label for="phone" class="block text-xs sm:text-sm uppercase mb-2">Mobilní číslo</label>
                <input id="phone" type="tel" placeholder="+420 123 456 789" class="w-full rounded-md bg-[#FFF6E5] px-4 py-3 outline-none border border-[#6A4B2F]/10" />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="datetime" class="block text-xs sm:text-sm uppercase mb-2">Preferovaný termín a čas</label>
                <input id="datetime" type="text" placeholder="20.03.2026 - 8:22" class="w-full rounded-md bg-[#FFF6E5] px-4 py-3 outline-none border border-[#6A4B2F]/10" />
              </div>
              <div>
                <label for="service" class="block text-xs sm:text-sm uppercase mb-2">Vyberte službu</label>
                <select id="service" class="w-full rounded-md bg-[#FFF6E5] px-4 py-3 outline-none border border-[#6A4B2F]/10 appearance-none">
                  <option>Sportovní masáž</option>
                  <option>Ajurvédská olejová masáž</option>
                  <option>Baňkování</option>
                </select>
              </div>
            </div>

            <div>
              <label for="message" class="block text-xs sm:text-sm uppercase mb-2">Vaše zpráva</label>
              <textarea id="message" rows="4" class="w-full rounded-md bg-[#FFF6E5] px-4 py-3 outline-none border border-[#6A4B2F]/10 resize-none"></textarea>
            </div>

            <label class="inline-flex items-center gap-3 text-xs sm:text-sm">
              <input type="checkbox" class="h-5 w-5 rounded border-[#6A4B2F]/20 bg-[#FFF6E5] text-[#6A4B2F]" />
              Souhlasím se zpracováním osobních údajů
            </label>

            <div class="pt-2">
              <button
                type="button"
                class="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-md bg-[#664B2F] text-[#FFF6E5] text-[10px] sm:text-xs uppercase tracking-widest sm:tracking-[0.12em] hover:bg-[#5b4228]"
              >
                Odeslat nezávaznou žádost
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  </main>

  <Footer />
</template>