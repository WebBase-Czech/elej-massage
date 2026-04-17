<script setup>
defineProps({
  obrazek: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  prices: {
    type: Array,
    required: true
  }
})

const getImageUrl = (name) => {
  // Cesta musí být relativní z tohoto souboru (Massage.vue) do složky assets
  return new URL(`../assets/${name}.svg`, import.meta.url).href
}
</script>

<template>
  <article class="flex flex-col h-full bg-[#FFF6E5] p-5 sm:p-6 lg:p-8 shadow-[0_20px_30px_rgba(70,44,24,0.85)]">
    <img 
      :src="getImageUrl(obrazek)" 
      :alt="title" 
      class="w-10 h-10 object-contain mb-4" 
    />

    <h3 class="mt-6 sm:mt-8 font-serif text-[#6A4B2F] text-xl sm:text-2xl leading-tight">
      {{ title }}
    </h3>

    <p class="grow mt-4 sm:mt-6 text-[#6A4B2F]/85 text-sm sm:text-base leading-relaxed">
      {{ description }}
    </p>

    <ul class="mt-8 sm:mt-12 border-t border-[#6A4B2F]/10 pt-5 sm:pt-8 space-y-2 sm:space-y-3">
      <li
        v-for="item in prices"
        :key="`${item.time}-${item.price}`"
        class="flex items-center justify-between text-[#6A4B2F] text-lg sm:text-xl lg:text-2xl leading-none"
      >
        <span class="text-[#6A4B2F]/85 text-base sm:text-lg lg:text-xl">{{ item.time }}</span>
        <span class="font-semibold text-xl">{{ item.price }}</span>
      </li>
    </ul>
  </article>
</template>