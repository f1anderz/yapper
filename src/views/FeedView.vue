<template>
  <div class="yapper-feed">
    <div class="yapper-feed-yaps" v-if="yaps !== null">
      <transition-group>
        <yap-card v-for="yap in yaps" :key="yap._id" :yap="yap" @like-click="handleLikeClick"/>
      </transition-group>
    </div>
    <div class="yapper-feed-dashboard">
      <div class="yapper-feed-dashboard-title text-gradient">Statistics:</div>
      <yap-stats-list v-if="stats !== null" :list="stats"/>
    </div>
  </div>
</template>

<script setup>
import statsAPI from '@/api/statistics.js';
import yapAPI from '@/api/yap.js';
import {ref} from 'vue';
import YapStatsList from '@/components/YapStatsList.vue';
import YapCard from '@/components/YapCard.vue';
import {useUserStore} from '@/stores/user.js';

const userStore = useUserStore();

const stats = ref(null);
const yaps = ref(null);

const getYaps = () => {
  yapAPI.get_yaps().then(response => {
    yaps.value = response.data;
  }).catch(err => console.log(err));
};

const getStats = () => {
  statsAPI.get_stats().then(response => {
    stats.value = response.data;
  }).catch(err => console.log(err));
};

getYaps();
getStats();

const handleLikeClick = (e) => {
  yapAPI.trigger_like({yapId: e, userId: userStore.user._id}).then(() => {
    getYaps();
    getStats();
  }).catch(err => console.log(err));
};
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables';

.yapper-feed {
  position: relative;
  padding-top: 3vh;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;

  &-yaps {
    width: 95%;
  }

  &-dashboard {
    position: absolute;
    left: 100%;
    min-width: 20rem;
    padding: 1rem 0 1rem 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: .3rem;
    background: variables.$secondary-background-color;
    border-radius: 1rem;
    color: variables.$text-color;
    box-shadow: -1px 0px 23px 0px rgba(47, 47, 47, 0.25);

    &-title {
      font: 1.2rem variables.$font-header;
      font-weight: 500;
    }
  }

}
</style>