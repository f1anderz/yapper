<template>
  <div class="yap-card">
    <div class="yap-card-victim">{{ props.yap.victim.nickname }} got yapped:</div>
    <div class="yap-card-body">{{ props.yap.body }}</div>
    <div class="yap-card-likes">
      <img v-if="userLiked" @click="emit('likeClick', props.yap._id)" src="@/assets/img/icons/heart.svg" alt="Likes">
      <img v-else @click="emit('likeClick', props.yap._id)" src="@/assets/img/icons/heart_full.svg" alt="Likes">
      {{ props.yap.likes }}
    </div>
    <div class="yap-card-controls" v-if="props.enable_controls"></div>
  </div>
</template>

<script setup>
import {computed} from 'vue';
import {useUserStore} from '@/stores/user.js';

const userStore = useUserStore();
const props = defineProps({yap: {type: Object, required: true}, enable_controls: Boolean});
const emit = defineEmits(['likeClick']);

const userLiked = computed(() => {
  return !props.yap.liked.includes(userStore.user._id);
});

</script>

<style scoped lang="scss">
@use '@/assets/scss/variables';
@use '@/assets/scss/mixins';

.yap-card {
  display: flex;
  flex-direction: column;
  gap: .25rem;
  color: variables.$text-color;
  font-family: variables.$font-body;
  padding-left: 5%;
  padding-bottom: .5rem;

  &-victim {
    font-size: .9rem;
  }

  &-body {
    font-size: 1rem;
    padding-left: 2rem;
  }

  &-likes {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: .5rem;

    & img {
      width: 1rem;
      height: 1rem;

      @include mixins.breakpoint(xxl) {
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>