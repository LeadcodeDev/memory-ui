<template>
  <img v-if="selectedCase(item)" @click.prevent="handleToggle(picture, item)" :src="picture.path" :alt="picture.fruit" />
  <div v-else @click.prevent="handleToggle(picture, item)" class="bg-white placeholder opacity-50"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent ({
  name: 'Case',
  emits: ['toggleCase'],
  props: {
    picture: {
      type: Object,
      default: () => ({})
    },
    selectedCases: {
      type: Array,
      default: () => ([])
    },
    validCases: {
      type: Array,
      default: () => ([])
    },

    /**
     * Identical to the key but this term is a reserved word
     * so we are obliged to rename it
     */
    item: {
      type: Number,
      default: null
    }
  },
  methods: {
    /**
     * Checks if the current box is already associated with a pair
     * or if it has just been clicked to be returned
     * @param key
     */
    selectedCase (key: number) {
      return this.selectedCases.includes(key) || this.validCases.includes(key)
    },

    /**
     * Emits the event when a card is turned over.
     * @param picture
     * @param key
     */
    handleToggle (picture: any, key: number) {
      this.$emit('toggleCase', picture, key)
    }
  }
})
</script>

<style lang="scss" scoped>
.placeholder {
  width: 62px;
  height: 62px;
}
</style>