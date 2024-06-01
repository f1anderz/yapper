<template>
  <div class="yap-stats list">
    <transition-group name="stats-list">
      <yap-stats-item v-for="item in props.list" :key="item.name" :item="item"/>
    </transition-group>
  </div>
</template>

<script setup>
import YapStatsItem from '@/components/YapStatsItem.vue';

const props = defineProps(['list']);
</script>

<style scoped lang="scss">
.yap-stats-list {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: .2rem;
}
</style>