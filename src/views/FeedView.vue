<template>
  <div class="yapper-feed">
    <div class="yapper-feed-dashboard">
      <div class="yapper-feed-dashboard-title text-gradient">Statistics:</div>
      <yap-stats-list v-if="stats !== null" :list="stats"/>
    </div>
    <div class="yapper-feed-most-liked">
      <div class="yapper-feed-most-liked-title text-gradient">Best yap</div>
      <div class="yapper-feed-most-liked-card">
        <yap-card v-if="mostLiked !== null" :yap="mostLiked" @like-click="handleLikeClick"/>
      </div>
    </div>
    <div class="yapper-feed-yaps">
      <div class="yapper-feed-yaps-title text-gradient">Recent yaps</div>
      <div class="yapper-feed-yaps-list">
        <yap-list v-if="yaps !== null" :yaps="yaps" @like-click="handleLikeClick"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import statsAPI from '@/api/statistics.js';
import yapAPI from '@/api/yap.js';
import {ref} from 'vue';
import YapStatsList from '@/components/YapStatsList.vue';
import {useUserStore} from '@/stores/user.js';
import YapList from '@/components/YapList.vue';
import YapCard from '@/components/YapCard.vue';

const userStore = useUserStore();

const stats = ref(null);
const yaps = ref(null);
const mostLiked = ref(null);

const getYaps = () => {
  yapAPI.get_yaps().then(response => {
    mostLiked.value = response.data.shift();
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
@use '@/assets/scss/mixins';

.yapper-feed {
  position: relative;
  padding-top: 3vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2rem;

  &-most-liked {
    width: 95%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: .5rem;
    border-bottom: .01rem solid variables.$accent-color;

    @include mixins.breakpoint(l) {
      width: 76%;
    }

    @include mixins.breakpoint(xl) {
      width: 78%;
    }

    &-title {
      padding-left: 3rem;
      font: 1.3rem variables.$font-header
    }

    &-card {
      width: 100%;
      padding-left: 2.5rem;
    }
  }

  &-yaps {
    width: 95%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: .5rem;

    @include mixins.breakpoint(l) {
      width: 80%;
    }

    @include mixins.breakpoint(xl) {
      width: 80%;
    }

    &-title {
      padding-left: 3rem;
      font: 1.3rem variables.$font-header
    }

    &-list {
      width: 100%;
      max-height: 100vh;
      min-height: 90vh;
      overflow-y: scroll;
      -ms-overflow-style: none;
      scrollbar-width: none;

      &::-webkit-scrollbar {
        display: none;
      }
    }
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

    @include mixins.breakpoint(xs) {
      position: relative;
      left: 0;
      width: 100%;
    }

    @include mixins.breakpoint(s) {
      position: relative;
      left: 0;
      margin-left: 5%;
    }

    @include mixins.breakpoint(m) {
      position: relative;
      left: 0;
      margin-left: 5%;
    }

    @include mixins.breakpoint(l) {
      left: 78%;
    }

    @include mixins.breakpoint(xl) {
      left: 80%;
    }

    &-title {
      font: 1.2rem variables.$font-header;
      font-weight: 500;
    }
  }

}
</style>