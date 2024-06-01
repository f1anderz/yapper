<template>
  <div class="yapper-profile">
    <div class="yapper-profile-dashboard">

    </div>
    <div class="yapper-profile-yaps">
    </div>
    <yap-button @click="handleLogout">Logout</yap-button>
  </div>
</template>

<script setup>
import {useUserStore} from '@/stores/user.js';
import {inject, ref} from 'vue';
import {useRouter} from 'vue-router';
import YapButton from '@/components/YapButton.vue';

const cookies = inject('$cookies');
const router = useRouter();

const userStore = useUserStore();


const handleLogout = async () => {
  cookies.remove('user');
  userStore.user = {_id: null};
  await router.push('/');
};
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables';

.yapper-profile {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;

  &-dashboard {
    display: flex;
    flex-direction: row;
  }
}
</style>