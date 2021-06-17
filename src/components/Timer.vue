<template>
  <div>
    {{ getFormattedTime }} secondes
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent ({
  emits: ['stop'],
  data: () => ({
    startTimestamp: 0,
    updatedTimestamp: 0
  }),

  /**
   * When the component is loaded,
   * we start a timer via the function setInterval()
   */
  mounted () {
    this.startTimestamp = Date.now()
    setInterval(() => {
      this.updatedTimestamp = Date.now()
    }, 1000)
  },
  computed: {
    getFormattedTime () {
      if (this.updatedTimestamp === 0) return `0 secondes`
      return Math.round((this.updatedTimestamp - this.startTimestamp) / 1000)
    }
  },

  /**
   * When the component is deleted (game state change),
   * the current timer is returned to the parent component in order to recover its value
   */
  unmounted () {
    this.$emit('stop', Math.round((this.updatedTimestamp - this.startTimestamp) / 1000))
  }
})
</script>