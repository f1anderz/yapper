<template>
  <div class="yap-message-box" :class="{hidden: !props.visible}">
    <div class="yap-message-box-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['visible']);
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables';
@use '@/assets/scss/mixins';

.yap-message-box {
  position: absolute;
  left: 50%;
  z-index: 100;
  transition: opacity .5s ease-in-out;

  &-content {
    position: relative;
    left: -50%;
    top: 5%;
    padding: .5rem 2.25rem;
    background: variables.$secondary-background-color;
    border-radius: .7rem;
    box-shadow: -1px 0px 23px 0px rgba(47, 47, 47, 0.65);
    text-align: center;
    font: 1.75rem variables.$font-header;
    color: variables.$accent-color;
  }
}

.hidden {
  opacity: 0;
}
</style>