<template>
  <header>
    <YapHeader/>
  </header>
  <main>
    <RouterView/>
  </main>
  <footer>
    <YapFooter/>
  </footer>
</template>

<script setup>
import YapHeader from '@/components/YapHeader.vue';
import YapFooter from '@/components/YapFooter.vue';
</script>

<style lang="scss">
@import '@/assets/scss/style';

main {
  padding: 0 27%;
}
</style>
