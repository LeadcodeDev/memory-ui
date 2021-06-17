<template>
  <div class="caseContainer w-1/2 bg-white flex flex-wrap">
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent ({
  name: 'CaseContainer'
})
</script>

<style lang="scss" scoped>
.caseContainer {
  width: calc(64px * 9);
  @apply ring ring-gray-100 rounded;
}
</style>