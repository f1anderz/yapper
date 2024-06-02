<template>
  <div class="yap-footer">
    <div class="yap-footer-created">Made in Ukraine <img src="@/assets/img/ukraine.webp" alt="UA"></div>
    <div class="yap-footer-author text-gradient">Yapper</div>
    <div class="yap-footer-copyright">
      &copy; 2024
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped lang="scss">
@use '@/assets/scss/variables';
@use '@/assets/scss/mixins';

.yap-footer {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 20%;
  background: variables.$secondary-background-color;
  box-shadow: 0 .1rem .8rem 0 rgba(47, 47, 47, .3);
  font: 1rem variables.$font-header;
  color: variables.$text-color;

  @include mixins.breakpoint(xs){
    padding: 1rem 5%;
  }

  &-copyright, &-author {
    font-size: 1.1rem;
  }

  &-created {
    display: flex;
    flex-direction: row;
    gap: .5rem;

    & img {
      display: block;
      margin-top: .3em;
      height: 1rem;
      width: 1rem;
    }
  }
}
</style>