<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Massage from './components/Massage.vue'

import { ref, onMounted, onUnmounted } from 'vue'
import { tr, currentLanguage } from './i18n/index'

import { computed } from 'vue'

const minDateTime = computed(() => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
 
  tomorrow.setHours(0, 0, 0, 0)
  
  tomorrow.setMinutes(tomorrow.getMinutes() - tomorrow.getTimezoneOffset())
  return tomorrow.toISOString().slice(0, 16)
})

const minSelectableDate = computed(() => minDateTime.value.slice(0, 10))
const minSelectableDateObj = computed(() => new Date(`${minSelectableDate.value}T00:00:00`))

const calendarOpen = ref(false)
const calendarStep = ref('date')
const calendarWrapperRef = ref(null)
const selectedDate = ref('')
const selectedHour = ref('10')
const selectedMinute = ref('00')
const calendarMonth = ref(new Date(minSelectableDateObj.value))

const weekdayLabels = computed(() => tr('form.calendar.days').split(','))
const monthLabels = computed(() => tr('form.calendar.months').split(','))

const toLocalDateString = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const toDisplayDateString = (isoDate) => {
  if (!isoDate) return ''
  const [year, month, day] = isoDate.split('-')
  return `${day}.${month}.${year}`
}

const calendarTitle = computed(() => {
  return `${monthLabels.value[calendarMonth.value.getMonth()]} ${calendarMonth.value.getFullYear()}`
})

const calendarDays = computed(() => {
  const year = calendarMonth.value.getFullYear()
  const month = calendarMonth.value.getMonth()

  const firstDay = new Date(year, month, 1)
  const startingWeekday = (firstDay.getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const days = []

  for (let i = 0; i < startingWeekday; i += 1) {
    days.push({ empty: true })
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(year, month, day)
    date.setHours(0, 0, 0, 0)
    const iso = toLocalDateString(date)
    const isDisabled = date < minSelectableDateObj.value
    const isSelected = selectedDate.value === iso
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const isToday = date.getTime() === today.getTime()

    days.push({
      empty: false,
      label: day,
      iso,
      isDisabled,
      isSelected,
      isToday
    })
  }

  return days
})

const MIN_HOUR = 8
const MAX_HOUR = 20
const MINUTE_STEPS = [0, 15, 30, 45]

const adjustHour = (delta) => {
  const currentHour = Number(selectedHour.value)
  const nextHour = Math.min(MAX_HOUR, Math.max(MIN_HOUR, currentHour + delta))
  selectedHour.value = String(nextHour).padStart(2, '0')
}

const adjustMinute = (delta) => {
  const currentHour = Number(selectedHour.value)
  const currentMinute = Number(selectedMinute.value)
  const currentMinuteIndex = MINUTE_STEPS.indexOf(currentMinute)
  const safeIndex = currentMinuteIndex === -1 ? 0 : currentMinuteIndex
  const nextIndex = safeIndex + delta

  if (nextIndex < 0) {
    if (currentHour > MIN_HOUR) {
      adjustHour(-1)
      selectedMinute.value = '45'
    }
    return
  }

  if (nextIndex >= MINUTE_STEPS.length) {
    if (currentHour < MAX_HOUR) {
      adjustHour(1)
      selectedMinute.value = '00'
    }
    return
  }

  selectedMinute.value = String(MINUTE_STEPS[nextIndex]).padStart(2, '0')
}

const selectedDateTimeDisplay = computed(() => {
  if (!selectedDate.value) return ''
  return `${toDisplayDateString(selectedDate.value)} - ${selectedHour.value}:${selectedMinute.value}`
})

const toggleCalendar = () => {
  calendarOpen.value = !calendarOpen.value
  if (calendarOpen.value) {
    calendarStep.value = 'date'
  }
}

const goToPreviousMonth = () => {
  calendarMonth.value = new Date(calendarMonth.value.getFullYear(), calendarMonth.value.getMonth() - 1, 1)
}

const goToNextMonth = () => {
  calendarMonth.value = new Date(calendarMonth.value.getFullYear(), calendarMonth.value.getMonth() + 1, 1)
}

const selectDay = (day) => {
  if (day.isDisabled) return
  selectedDate.value = day.iso
}

const continueToTimeStep = () => {
  if (!selectedDate.value) return
  calendarStep.value = 'time'
}

const goBackToDateStep = () => {
  calendarStep.value = 'date'
}

const applyDateTimeSelection = () => {
  if (!selectedDate.value) return
  formData.value.datetime = `${selectedDate.value}T${selectedHour.value}:${selectedMinute.value}`
  calendarOpen.value = false
  calendarStep.value = 'date'
}

const onCalendarClickOutside = (event) => {
  if (!calendarWrapperRef.value) return
  if (!calendarWrapperRef.value.contains(event.target)) {
    calendarOpen.value = false
    calendarStep.value = 'date'
  }
}

const formData = ref({
  name: '',
  email: '',
  phone: '',
  datetime: '',
  message: '' 
})

const errors = ref({
  name: '',
  email: '',
  phone: '',
  message: '' 
})

const validateMessage = () => {
 const messageRegex = /^[^<>%=/§'¨_]*$/
  
  if (!formData.value.message) {
    errors.value.message = '' 
  } else if (!messageRegex.test(formData.value.message)) {
    errors.value.message = 'form.errors.message'
  } else {
    errors.value.message = ''
  }
}

const validateName = () => {
  const nameRegex = /^[a-zA-Zá-žÁ-ŽäöüÄÖÜß\s\-]+$/
  
  if (!formData.value.name) {
    errors.value.name = '' 
  } else if (!nameRegex.test(formData.value.name)) {
    errors.value.name = 'form.errors.name'
  } else {
    errors.value.name = ''
  }
}

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  if (!formData.value.email) {
    errors.value.email = ''
  } else if (!emailRegex.test(formData.value.email)) {
    errors.value.email = 'form.errors.email'
  } else {
    errors.value.email = ''
  }
}

const validatePhone = () => {
  const phoneRegex = /^\+?[0-9\s]{9,15}$/
  
  if (!formData.value.phone) {
    errors.value.phone = ''
  } else if (!phoneRegex.test(formData.value.phone)) {
    errors.value.phone = 'form.errors.phone'
  } else {
    errors.value.phone = ''
  }
}

const sectionRef = ref(null) 
const isVisible = ref(false) 

let observer = null

onMounted(() => {

  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      isVisible.value = true
      observer.disconnect() 
    }
  }, {
    threshold: 0.2 
  })

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})


const contactRef = ref(null) 
const isContactVisible = ref(false)

let contactObserver = null

onMounted(() => {
  contactObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      isContactVisible.value = true
      contactObserver.disconnect() 
    }
  }, {
    threshold: 0.1 
  })

  if (contactRef.value) {
    contactObserver.observe(contactRef.value)
  }
})

onUnmounted(() => {
  if (contactObserver) contactObserver.disconnect()
})

const cardsRef = ref(null) 
const isCardsVisible = ref(false)

let cardsObserver = null

onMounted(() => {
  cardsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      isCardsVisible.value = true
      cardsObserver.disconnect() 
    }
  }, {
    threshold: 0.1 
  })

  if (cardsRef.value) {
    cardsObserver.observe(cardsRef.value)
  }

  selectedDate.value = minSelectableDate.value
  document.addEventListener('mousedown', onCalendarClickOutside)
})

onUnmounted(() => {
  if (cardsObserver) cardsObserver.disconnect()
  document.removeEventListener('mousedown', onCalendarClickOutside)
})

const sluzbyRef = ref(null);
const oMneRef = ref(null);
const kontaktRef = ref(null);
const formularRef = ref(null);

const scrollToSection = (target) => {
  let elementToScroll = null;

  if (target === 'sluzby') {
    elementToScroll = sluzbyRef.value;
  } else if (target === 'o-mne') {
    elementToScroll = oMneRef.value;
  } else if (target === 'kontakt') {
    elementToScroll = kontaktRef.value;
  }
  else if(target == 'formular') {
    elementToScroll = formularRef.value;
  }

  if (elementToScroll) {
    elementToScroll.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const scrollToCards = () => {
  if (sluzbyRef.value) {
    sluzbyRef.value.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start'      
    });
  }
};
</script>

<template>
  <Header @scroll-requested="scrollToSection" />

<main class="bg-[#E5D2B8]">
  <section class="relative min-h-[72vh]">
    <img 
  src="./assets/cara1-mobile.svg" 
  class="sm:hidden absolute left-0 w-full h-auto z-0 top-[98%] md:top-[60%] lg:top-[70%] xl:top-[50%]" 
  alt="čára-na-pozadí-mobil" 
/>
<img 
  src="./assets/cara-1.svg" 
  class="hidden sm:block absolute left-0 w-full h-auto z-0 top-[80%] md:top-[60%] lg:top-[70%] xl:top-[50%]" 
  alt="čára-na-pozadí-pc" 
/>

<img 
  src="./assets/cara2-mobile.svg" 
  class="sm:hidden absolute left-0 w-full h-auto z-0 top-[98%] md:top-[60%] lg:top-[70%] xl:top-[40%]" 
  alt="čára-na-pozadí-mobil-2" 
/>
<img 
  src="./assets/cara-2.svg" 
  class="hidden sm:block absolute left-0 w-full h-auto z-0 top-[80%] md:top-[60%] lg:top-[70%] xl:top-[40%]" 
/>

    <div class="relative z-10 w-full min-h-[62vh] sm:min-h-[72vh] flex flex-col items-center justify-center text-center px-[6px] sm:px-3 md:px-4 py-12 sm:py-16">
      <p class="text-[9px] sm:text-[14px] tracking-[0.16em] sm:tracking-[0.22em] uppercase text-[#6A4B2F]/70 mb-6 sm:mb-8">
        {{ tr('hero.badge') }}
      </p>

      <h1 class="font-serif text-[#6A4B2F] text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05]">
        <span class="block">{{ tr('hero.title1') }}</span>
        <span class="block italic font-light">{{ tr('hero.title2') }}</span>
      </h1>

      <p class="mt-5 sm:mt-6 max-w-2xl text-[#6A4B2F]/80 text-[16px] sm:text-sm md:text-base leading-relaxed px-2 sm:px-0">
        {{ tr('hero.subtitle') }}
      </p>

      <button
        type="button"
        @click="scrollToCards"
        class="mt-8 sm:mt-10 px-6 sm:px-10 py-2.5 sm:py-4 rounded-2xl bg-[#664B2F] text-white text-sm sm:text-base font-semibold hover:bg-[#5b4228] cursor-pointer"
      >
        {{ tr('hero.cta') }}
      </button>
    </div>
  </section>

    
  <section class="mt-20 sm:mt-40" ref="sectionRef">
  <div ref="oMneRef" class="max-w-7xl mx-auto px-[6px] sm:px-3 md:px-4 py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center overflow-hidden">
      
    <div 
      class="relative w-full max-w-[400px] lg:max-w-[500px] mx-auto lg:mx-0 transition-all duration-1200 ease-out"
      :class="isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'"
    >
      <div class="bg-white p-4 sm:px-8 sm:py-18 rounded-sm shadow-sm">
        <img
          src="./assets/majitelka.jpeg"
          alt="Masérka Elen Jurásková - Masážní salon Hnanice"
          class="w-full h-auto object-cover"
        />
      </div>

      <div class="absolute -bottom-14 md:-bottom-16 left-4 sm:left-6 bg-[#664B2F] text-white px-4 sm:px-10 py-6 sm:py-8">
        <div class="font-serif text-base sm:text-[30px] leading-tight">Elen Jurásková</div>
        <div class="text-[16px] opacity-90">{{ tr('owner.role') }}</div>
      </div>
    </div>

    <div 
      class="text-center lg:text-start transition-all duration-1200 ease-out delay-300 mt-8 lg:mt-0"
      :class="isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'"
    >
      <p class="font-serif italic text-[#6A4B2F] text-xl sm:text-2xl lg:text-[28px] xl:text-4xl whitespace-pre-line text-center lg:text-start transition-all duration-300"
         :style="{ fontSize: currentLanguage === 'cz' ? '36px' : '30px', }">
        {{ tr('owner.quote') }}
      </p>

      <div  class="mt-6 text-[#6A4B2F]/80 text-sm sm:text-lg leading-relaxed space-y-8 text-center lg:text-start px-8 sm:px-8 md:px-0"
           :style="{ fontSize: currentLanguage === 'cz' ? '18px' : '17px', }"
      >
        <p>{{ tr('owner.p1') }}</p>
        <p>{{ tr('owner.p2') }}</p>
        <p>{{ tr('owner.p3') }}</p>
        <p>{{ tr('owner.p4') }}</p> <br>
        <p>{{ tr('owner.p5') }}</p>
        <p>{{ tr('owner.p6') }}</p>
        <p>{{ tr('owner.p7') }}</p>
      </div>
    </div>
      
  </div>
</section>

  

    <section ref="sluzbyRef" class="max-w-7xl mx-auto px-[6px] sm:px-3 md:px-4 py-14 sm:py-20 lg:py-24">
      <img 
        src="./assets/lotus-mobile.svg" 
        alt="lotus" 
        class="pb-12 sm:hidden"
      >

      <img 
        src="./assets/lotus.svg" 
        alt="Lotus" 
        class="hidden pb-12 sm:block"
      >
      <div class="flex flex-col lg:flex-row lg:justify-between  gap-4 sm:gap-6">
        <h2 class="font-serif text-[#6A4B2F] text-3xl sm:text-4xl lg:text-5xl leading-tight self-center">{{ tr('procedures.title') }}</h2>
        <p class="uppercase  sm:tracking-[0.05em] font-bold text-[#6A4B2F]/80 text-[10px] sm:text-xs max-w-sm lg:text-right self-center text-center">
          {{ tr('procedures.subtitle') }}
        </p>
      </div>

      <div ref="cardsRef" class="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 px-6 sm:px-0">
    
    <Massage
      class="transition-all duration-1000 ease-out delay-500"
      alt="procedura-ruka"
      :class="isCardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
      obrazek="HAND"
      :title="tr('procedures.cards.sport.title')"
      :description="tr('procedures.cards.sport.description')"
      :prices="[
        { time: tr('procedures.cards.sport.prices.p30.time'), price: tr('procedures.cards.sport.prices.p30.price') },
        { time: tr('procedures.cards.sport.prices.p60.time'), price: tr('procedures.cards.sport.prices.p60.price') }
      ]"
    />

    <Massage
      class="transition-all duration-1000 ease-out delay-500"
      alt="procedura-motýl"
      :class="isCardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
      obrazek="BUTTERFLY"
      :title="tr('procedures.cards.ayurveda.title')"
      :description="tr('procedures.cards.ayurveda.description')"
      :prices="[
        { time: tr('procedures.cards.ayurveda.prices.p60.time'), price: tr('procedures.cards.ayurveda.prices.p60.price') },
        { time: tr('procedures.cards.ayurveda.prices.p90.time'), price: tr('procedures.cards.ayurveda.prices.p90.price') }
      ]"
    />

    <Massage
      class="transition-all duration-1000 ease-out delay-500"
      alt="procedura-baňka"
      :class="isCardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
      obrazek="DROP"
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

    <section id="kontakt" class="relative overflow-hidden" ref="contactRef">
      <div class="max-w-7xl mx-auto px-[6px] sm:px-3 md:px-4 py-14 sm:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-20">
        <div class="relative">
          <span
    aria-hidden="true"
    class="pointer-events-none font-bold select-none absolute -top-8 sm:-top-14 left-0 right-0 mx-auto w-fit lg:mx-0 lg:right-auto lg:-left-10 xl:-left-40 font-serif text-[110px] sm:text-[170px] lg:text-[200px] xl:text-[250px] leading-none text-[#6A4B2F]/10 uppercase transition-transform duration-1500 ease-out"
    :class="isContactVisible ? 'translate-x-0' : '-translate-x-[100vw]'"
  >
  {{ tr('contact.watermark') }}
  </span>

  <h2 class="relative z-10 font-serif text-[#6A4B2F] text-3xl sm:text-5xl md:text-3xl lg:text-5xl xl:text-6xl leading-[1.03]">
    <span class="block text-center lg:text-start">{{ tr('contact.title1') }}</span>
    <span ref="kontaktRef" class="block font-semibold text-center lg:text-start">{{ tr('contact.title2') }}</span>
  </h2>

  <div  class="mt-8 sm:mt-14 max-w-md mx-auto lg:mx-0 text-[#6A4B2F]/85 text-base sm:text-xl lg:text-2xl leading-relaxed space-y-5 sm:space-y-8 text-center lg:text-start">
    <p>
      {{ tr('contact.p1') }}
    </p>
    <p>
      {{ tr('contact.p2') }}
    </p>
  </div>

  <div class="mt-8 sm:mt-12 space-y-3 sm:space-y-4 text-[#6A4B2F]/90 text-base sm:text-xl lg:text-2xl flex flex-col items-center lg:items-start">
    <p  class="flex items-center gap-3">
      <span class="material-symbols-outlined text-xl sm:text-[26px]">location_on</span>
      Znojemská 100, 669 02 Hnanice
    </p>
    <p class="flex items-center gap-3">
      <span class="material-symbols-outlined text-xl sm:text-[26px]">call</span>
      +420 727 943 691
    </p>
    <p class="flex items-center gap-3">
      <img src="./assets/ig.svg" alt="instagram-logo">
      elej.massage
    </p>
  </div>
</div>

        <form  class="text-[#6A4B2F] mt-16 px-4 sm:px-0">
  <div class="space-y-6">
    <div ref="formularRef">
      <label for="name" class="block text-xs sm:text-sm uppercase mb-2">{{ tr('form.name') }}</label>
      <input id="name" type="text" v-model="formData.name"
        @blur="validateName"
        :class="['w-full rounded-md bg-[#FFF6E5] px-4 py-3 outline-none border transition-colors', errors.name ? 'border-red-500' : 'border-[#6A4B2F]/10']" 
      />
      <span v-if="errors.name" class="text-red-500 text-xs mt-1 block">{{ tr(errors.name) }}</span>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label for="email" class="block text-xs sm:text-sm uppercase mb-2">{{ tr('form.email') }}</label>
        <input id="email" type="email" v-model="formData.email"
          @blur="validateEmail"
          :class="['w-full rounded-md bg-[#FFF6E5] px-4 py-3 outline-none border transition-colors', errors.email ? 'border-red-500' : 'border-[#6A4B2F]/10']" 
        />
        <span v-if="errors.email" class="text-red-500 text-xs mt-1 block">{{ tr(errors.email) }}</span>
      </div>
      <div>
        <label for="phone" class="block text-xs sm:text-sm uppercase mb-2">{{ tr('form.phone') }}</label>
        <input id="phone" type="tel" v-model="formData.phone"
          @blur="validatePhone"
          placeholder="+420 123 456 789" 
          :class="['w-full rounded-md bg-[#FFF6E5] px-4 py-3 outline-none border transition-colors', errors.phone ? 'border-red-500' : 'border-[#6A4B2F]/10']" 
        />
        <span v-if="errors.phone" class="text-red-500 text-xs mt-1 block">{{ tr(errors.phone) }}</span>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label for="datetime" class="block text-xs sm:text-sm uppercase mb-2">{{ tr('form.datetime') }}</label>
        <div ref="calendarWrapperRef" class="relative">
          <input
            id="datetime"
            type="text"
            :value="selectedDateTimeDisplay"
            placeholder="20.03.2026 - 10:00"
            readonly
            @click="toggleCalendar"
            class="date-time-input w-full rounded-md bg-[#FFF6E5] px-4 py-3 outline-none border border-[#6A4B2F]/10 cursor-pointer transition-all duration-200 hover:border-[#6A4B2F]/30 focus:border-[#6A4B2F]/40 focus:ring-2 focus:ring-[#6A4B2F]/15"
          />

          <div
            v-if="calendarOpen"
            class="absolute left-0 top-full z-30 mt-2 w-full rounded-md border border-[#6A4B2F]/20 bg-[#FFF6E5] p-4 shadow-lg"
          >
            <template v-if="calendarStep === 'date'">
              <div class="mb-4 flex items-center justify-between">
                <button type="button" @click="goToPreviousMonth" class="rounded px-2 py-1 text-[#6A4B2F] hover:bg-[#6A4B2F]/10">‹</button>
                <p class="font-semibold text-[#6A4B2F]">{{ calendarTitle }}</p>
                <button type="button" @click="goToNextMonth" class="rounded px-2 py-1 text-[#6A4B2F] hover:bg-[#6A4B2F]/10">›</button>
              </div>

              <div class="mb-1 grid grid-cols-7 gap-1 text-center text-xs font-semibold text-[#6A4B2F]/70">
                <span v-for="label in weekdayLabels" :key="label">{{ label }}</span>
              </div>

              <div class="grid grid-cols-7 gap-1">
                <template v-for="(day, index) in calendarDays" :key="`${day.iso || 'empty'}-${index}`">
                  <span v-if="day.empty" class="h-8"></span>
                  <button
                    v-else
                    type="button"
                    @click="selectDay(day)"
                    :disabled="day.isDisabled"
                    :class="[
                      'h-8 rounded text-sm transition-colors',
                      day.isDisabled ? 'cursor-not-allowed text-[#6A4B2F]/30' : (day.isSelected ? 'text-[#FFF6E5]' : 'text-[#6A4B2F] hover:bg-[#6A4B2F]/10'),
                      day.isSelected ? 'bg-[#664B2F] text-[#FFF6E5]' : '',
                      day.isToday && !day.isSelected ? 'border border-[#6A4B2F]/30' : ''
                    ]"
                  >
                    {{ day.label }}
                  </button>
                </template>
              </div>

              <button
                type="button"
                @click="continueToTimeStep"
                :disabled="!selectedDate"
                class="mt-4 w-full rounded-md bg-[#664B2F] py-2 text-sm font-semibold text-[#FFF6E5] hover:bg-[#5b4228] disabled:cursor-not-allowed disabled:opacity-50"
              >
              {{ tr('form.calendar.selectTime') }}
              </button>
            </template>

            <template v-else>
              <p class="mb-2 text-sm text-[#6A4B2F]/80">{{ tr('form.calendar.selectedDay') }} <span class="font-semibold text-[#6A4B2F]">{{ toDisplayDateString(selectedDate) }}</span></p>
              <div class="mb-3 h-px bg-[#6A4B2F]/10"></div>

              <div class="mt-1">
              <p class="mb-1 block text-xs uppercase text-[#6A4B2F]/80">{{ tr('form.calendar.time') }}</p>
                <div class="grid grid-cols-2 gap-2">
                  <div class="rounded-md border border-[#6A4B2F]/20 bg-white/70 p-2">
                    <p class="mb-2 text-[11px] uppercase tracking-wide text-[#6A4B2F]/70">{{ tr('form.calendar.hour') }}</p>
                    <div class="flex items-center justify-between gap-2">
                      <button
                        type="button"
                        @click="adjustHour(-1)"
                        class="h-9 w-9 rounded-md border border-[#6A4B2F]/20 text-lg text-[#6A4B2F] hover:bg-[#6A4B2F]/10"
                      >
                        −
                      </button>
                      <div class="min-w-10 text-center text-xl font-semibold text-[#6A4B2F]">{{ selectedHour }}</div>
                      <button
                        type="button"
                        @click="adjustHour(1)"
                        class="h-9 w-9 rounded-md border border-[#6A4B2F]/20 text-lg text-[#6A4B2F] hover:bg-[#6A4B2F]/10"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div class="rounded-md border border-[#6A4B2F]/20 bg-white/70 p-2">
                    <p class="mb-2 text-[11px] uppercase tracking-wide text-[#6A4B2F]/70">{{ tr('form.calendar.minute') }}</p>
                    <div class="flex items-center justify-between gap-2">
                      <button
                        type="button"
                        @click="adjustMinute(-1)"
                        class="h-9 w-9 rounded-md border border-[#6A4B2F]/20 text-lg text-[#6A4B2F] hover:bg-[#6A4B2F]/10"
                      >
                        −
                      </button>
                      <div class="min-w-10 text-center text-xl font-semibold text-[#6A4B2F]">{{ selectedMinute }}</div>
                      <button
                        type="button"
                        @click="adjustMinute(1)"
                        class="h-9 w-9 rounded-md border border-[#6A4B2F]/20 text-lg text-[#6A4B2F] hover:bg-[#6A4B2F]/10"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-4 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  @click="goBackToDateStep"
                  class="w-full rounded-md border border-[#6A4B2F]/20 py-2 text-sm font-semibold text-[#6A4B2F] hover:bg-[#6A4B2F]/10"
                >
                {{ tr('form.calendar.backToDay') }}
                </button>
                <button
                  type="button"
                  @click="applyDateTimeSelection"
                  class="w-full rounded-md bg-[#664B2F] py-2 px-2 text-sm font-semibold text-[#FFF6E5] hover:bg-[#5b4228]"
                >
                {{ tr('form.calendar.confirm') }}
                </button>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div>
        <label for="service" class="block text-xs sm:text-sm uppercase mb-2">{{ tr('form.service') }}</label>
        <div class="relative w-full">
        <select id="service" class="w-full rounded-md bg-[#FFF6E5] py-3 pl-4 pr-12 outline-none border border-[#6A4B2F]/10 appearance-none cursor-pointer">
           <option>{{ tr('form.services.sport') }}</option>
           <option>{{ tr('form.services.ayurveda') }}</option>
           <option>{{ tr('form.services.cupping') }}</option>
        </select>
  
  <div class="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[#6A4B2F]">
    <svg class="h-5 w-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
    </svg>
  </div>
</div>
      </div>
    </div>

    <div>
  <label for="message" class="block text-xs sm:text-sm uppercase mb-2">{{ tr('form.message') }}</label>
  <textarea 
    id="message" 
    rows="4" 
    v-model="formData.message"
    @blur="validateMessage"
    :class="['w-full rounded-md bg-[#FFF6E5] px-4 py-3 outline-none border resize-none transition-colors', errors.message ? 'border-red-500' : 'border-[#6A4B2F]/10']"
  ></textarea>
  
  <span v-if="errors.message" class="text-red-500 text-xs mt-1 block">{{tr(errors.message)}}</span>
</div>

    <label class="flex items-center justify-center gap-3 text-xs sm:text-sm cursor-pointer">
      <input type="checkbox" class="h-5 w-5 rounded border-[#6A4B2F]/20 bg-[#FFF6E5] text-[#6A4B2F]" />
      {{ tr('form.gdpr') }}
    </label>

    <div class="pt-2 text-center">
      <button
        type="button"
        class="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-md bg-[#664B2F] text-[#FFF6E5] text-[10px] sm:text-xs uppercase tracking-widest sm:tracking-[0.12em] hover:bg-[#5b4228] transition-colors cursor-pointer"
      >
      {{ tr('form.submit') }}
      </button>
    </div>
  </div>
</form>
      </div>
    </section>
  </main>

  <Footer @scroll-requested="scrollToSection" />
</template>