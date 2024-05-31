<script setup>

</script>

<template>
  <nav class="yap-navigation">
    <RouterLink class="yap-navigation-link" to="/"><img src="../assets/img/icons/icon.webp" alt="Yapper logo"></RouterLink>
    <RouterLink class="yap-navigation-link" to="/feed">Feed</RouterLink>
    <RouterLink class="yap-navigation-link" to="/profile">Profile</RouterLink>
  </nav>
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables';
@use '@/assets/scss/mixins';

.yap-navigation {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 1.5rem;

  &-link {
    position: relative;
    font-size: 1.2rem;
    font-family: variables.$font-body;
    color: variables.$text-color;

    @include mixins.breakpoint(xxl) {
      &:hover {
        cursor: pointer;
        color: variables.$accent-color;
        scale: 1.05;
      }
    }

    & img {
      display: block;
      height: 2.5rem;
      width: 2.5rem;
    }
  }
}
</style>