<template>
  <div class="flex space-x-5">
    <p class="text-2xl">
      {{ count }} essai
    </p>
    <p class="text-2xl">
      {{ remainingPairs }} paires restantes
    </p>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent ({
  name: 'Info',
  props: {
    count: {
      type: Number,
      default: 0
    },
    remainingPairs: {
      type: Number,
      default: 0,
    }
  }
})
</script>