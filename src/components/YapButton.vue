<template>
  <div class="yap-button">
    <button @click="emit('click')">
      <slot></slot>
    </button>
  </div>

</template>

<script setup>
const emit = defineEmits(['click']);
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables';
@use '@/assets/scss/mixins';

.yap-button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-radius: 4rem;
  background-image: linear-gradient(308deg, rgba(49,194,213,1) 0%, rgba(38,167,213,1) 20%, rgba(109,43,207,1) 40%, rgba(206,82,144,1) 60%, rgba(159,62,170,1) 80%, rgba(227,50,89,1) 100%);
  padding: 2px;

  & button {
    display: block;
    background: variables.$background-color;
    font: 1.2rem variables.$font-body;
    color: variables.$text-color;
    border: none;
    padding: .2rem .9rem;
    border-radius: 4rem;
  }

  @include mixins.breakpoint(xxl) {
    &:hover button{
      cursor: pointer;
      color: variables.$accent-color;
    }
  }
}
</style>