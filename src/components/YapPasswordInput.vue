<script setup>
import {defineModel, ref} from 'vue';

const props = defineProps({width: {type: String, default: '28rem'}});

const model = defineModel();
const mode = ref(true);
</script>

<template>
  <div class="yap-password-input">
    <input v-if="mode" v-model="model" type="password" placeholder="Password..." name="password">
    <input v-else v-model="model" type="text" placeholder="Password..." name="password">
    <img v-if="mode" @click="mode = !mode" src="@/assets/img/icons/show.svg" alt="Show">
    <img v-else @click="mode = !mode" src="@/assets/img/icons/hide.svg" alt="Hide">
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables';
@use '@/assets/scss/mixins';

.yap-password-input {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: .2rem .75rem;
  gap: .5rem;
  border-radius: 2rem;
  background: variables.$background-color;

  @include mixins.breakpoint(xs){
    width: 18rem;
  }

  @include mixins.breakpoint(xxl){
    width: v-bind('props.width');
  }

  & input {
    width: 100%;
    border: none;
    font: 1.1rem variables.$font-body;
    background: variables.$background-color;
    color: variables.$text-color;
  }

  & img {
    width: 1.1rem;
    height: 1.1rem;

    @include mixins.breakpoint(xxl) {
      &:hover {
        cursor: pointer;
      }
    }
  }

}
</style>