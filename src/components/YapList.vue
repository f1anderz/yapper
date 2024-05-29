<template>
  <div class="yap-list">
    <transition-group name="yap-list">
      <span v-for="yap in props.yaps" :key="yap._id" class="yap-list-item">
        <yap-card :yap="yap" @like-click="e => emit('likeClick', e)"/>
      </span>
    </transition-group>
  </div>
</template>

<script setup>
import YapCard from '@/components/YapCard.vue';

const props = defineProps(['yaps']);
const emit = defineEmits(['likeClick']);
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables';

.yap-list {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;

  &-item {
    width: 100%;
    padding-bottom: .5rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    border-bottom: .01rem solid variables.$accent-color;

    &:last-of-type {
      border: none;
    }
  }
}
</style>