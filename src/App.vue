<template>
  <header>
    <YapHeader/>
  </header>
  <main>
    <RouterView/>
  </main>
</template>

<script setup>
import YapHeader from '@/components/YapHeader.vue';
</script>

<style lang="scss">
@import '@/assets/scss/style';

main {
  padding: 0 27%;
}
</style>
