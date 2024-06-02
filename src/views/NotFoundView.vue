<template>
  <div class="yapper-not-found">
    <div class="yapper-not-found-code text-gradient">404</div>
    <div class="yapper-not-found-message">Page {{ route.fullPath }} not found</div>
    <div class="yapper-not-found-link">
      <RouterLink to="/">Return to Homepage</RouterLink>
    </div>
  </div>
</template>

<script setup>
import {useRoute} from 'vue-router';

const route = useRoute();
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables';
@use '@/assets/scss/mixins';

.yapper-not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: variables.$font-body;
  padding-top: 20vh;
  min-height: 100vh;

  &-code {
    font-size: 10rem;
  }

  &-message {
    font-size: 1.8rem;
    margin-top: -2rem;
    color: variables.$text-color;
    @include mixins.breakpoint(xs) {
      font-size: 1.5rem;
    }
  }

  &-link a {
    color: variables.$accent-color;
    font-size: 1.3rem;
  }
}
</style>