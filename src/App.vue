<template>
  <router-view />
</template>

<script setup>
// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>

<style lang="scss">
.btn {
  @apply px-2 py-1 rounded-md;
  &.primary {
    @apply bg-blue-500 hover: bg-blue-600 text-white;
  }
}
</style>
