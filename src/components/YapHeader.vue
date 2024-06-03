<template>
  <div class="yap-header">
    <YapNavigation/>
    <div class="yap-header-user" v-if="userStore.isAuthenticated">
      <div class="yap-header-user-name" @click="menuVisible = !menuVisible"
           v-click-outside="() => {menuVisible = false}">
        <span>{{ userStore.user.name }}</span>
        <img src="@/assets/img/icons/down-arrow.svg" alt="Menu">
      </div>
      <div class="yap-header-user-menu" v-if="menuVisible" @click="handleLogout">Logout</div>
    </div>
  </div>
</template>

<script setup>
import YapNavigation from '@/components/YapNavigation.vue';
import {useUserStore} from '@/stores/user.js';
import {inject, ref} from 'vue';
import {useRouter} from 'vue-router';

const cookies = inject('$cookies');
const router = useRouter();

const userStore = useUserStore();

const menuVisible = ref(false);

const handleLogout = async () => {
  menuVisible.value = false;
  cookies.remove('user');
  cookies.remove('token');
  userStore.user = {_id: null};
  userStore.token = null;
  await router.push('/auth');
};
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables';
@use '@/assets/scss/mixins';

.yap-header {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 20%;
  background: variables.$secondary-background-color;
  box-shadow: 0 .1rem .8rem 0 rgba(47, 47, 47, .3);

  @include mixins.breakpoint(xs) {
    padding: 1rem 5%;
  }
  @include mixins.breakpoint(s) {
    padding: 1rem 5%;
  }

  @include mixins.breakpoint(m) {
    padding: 1rem 10%;
  }

  @include mixins.breakpoint(l) {
    padding: 1rem 15%;
  }

  @include mixins.breakpoint(xl) {
    padding: 1rem 12%;
  }

  &-user {
    position: relative;
    font: 1.2rem variables.$font-header;

    &-name {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: .5rem;

      @include mixins.breakpoint(xxl) {
        &:hover {
          cursor: pointer;
        }
      }

      & img {
        width: 1rem;
        height: 1rem;
        margin-top: .3rem;
      }
    }

    @include mixins.breakpoint(xs) {
      font-size: 1rem;
    }

    &-menu {
      position: absolute;
      left: 50%;
      top: 115%;
      padding: .2rem .5rem;
      border-radius: .3rem;
      background: variables.$secondary-background-color;
      box-shadow: -1px 0px 23px 0px rgba(47, 47, 47, 0.25);

      @include mixins.breakpoint(xxl) {
        &:hover {
          cursor: pointer;
          color: variables.$accent-color;
        }
      }
    }
  }
}
</style>