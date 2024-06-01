<template>
  <div class="yap-stats-item">
    <div class="yap stats-item-name">{{ props.item.name }}:</div>
    <div class="yap stats-item-value">{{ props.item.value }}</div>
  </div>
</template>

<script setup>
const props = defineProps(['item']);
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables';

.yap-stats-item {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: .5rem;
  font: 1rem variables.$font-body;
  color: variables.$text-color;
}
</style>