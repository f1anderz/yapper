<template>
  <div class="yapper-profile">
    <div @click="handleLogout">Logout</div>
  </div>
</template>

<script setup>
import {useUserStore} from '@/stores/user.js';
import {inject} from 'vue';
import {useRouter} from 'vue-router';

const cookies = inject('$cookies');
const router = useRouter();

const userStore = useUserStore();

const handleLogout = async () => {
  cookies.remove('user');
  userStore.user = null;
  await router.push('/');
};
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables';

.yapper-profile {
  display: flex;
}
</style>