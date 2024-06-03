<template>
  <div class="yap-header">
    <YapNavigation/>
    <div class="yap-header-user" v-if="userStore.isAuthenticated">{{ userStore.user.name }}</div>
  </div>
</template>

<script setup>
import YapNavigation from '@/components/YapNavigation.vue';
import {useUserStore} from '@/stores/user.js';

const userStore = useUserStore();
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables';
@use '@/assets/scss/mixins';

.yap-header {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 20%;
  background: variables.$secondary-background-color;
  box-shadow: 0 .1rem .8rem 0 rgba(47, 47, 47, .3);

  @include mixins.breakpoint(xs) {
    padding: 1rem 5%;
  }
  @include mixins.breakpoint(s) {
    padding: 1rem 5%;
  }

  @include mixins.breakpoint(m) {
    padding: 1rem 10%;
  }

  @include mixins.breakpoint(l){
    padding: 1rem 15%;
  }

  @include mixins.breakpoint(xl){
    padding: 1rem 12%;
  }

  &-user {
    font: 1.2rem variables.$font-header;

    @include mixins.breakpoint(xs) {
      font-size: 1rem;
    }
  }
}
</style>