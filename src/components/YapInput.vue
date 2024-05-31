<script setup>
import {defineModel} from 'vue';

const props = defineProps({type: String, name: String, placeholder: String, width: {type: String, default: '28rem'}});
const model = defineModel();
</script>

<template>
  <input v-model="model" :type="props.type" :placeholder="props.placeholder" :name="props.name" class="yap-input">
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables';

.yap-input {
  width: v-bind('props.width');
  display: block;
  padding: .2rem .75rem;
  border: none;
  border-radius: 2rem;
  font: 1.1rem variables.$font-body;
  background: variables.$background-color;
  color: variables.$text-color;
}
</style>