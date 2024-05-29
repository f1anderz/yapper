<template>
  <div class="yapper-auth">
    <div class="yapper-auth-form">
      <div class="yapper-auth-form-title text-gradient" v-if="mode">Login</div>
      <div class="yapper-auth-form-title text-gradient" v-else>Register</div>
      <div class="yapper-auth-form-inputs">
        <yap-input v-model="login" :type="'text'" :placeholder="'Login...'" :name="'login'"/>
        <yap-input v-if="!mode" v-model="nickname" :type="'text'" :placeholder="'Nickname'" :name="'nickname'"/>
        <yap-password-input v-model="password" :type="'password'"/>
      </div>
      <div class="yapper-auth-form-error" v-if="error.length > 0">{{ error }}</div>
      <div class="yapper-auth-form-button">
        <yap-button v-if="mode" @click="handleAuthClick">Login</yap-button>
        <yap-button v-else @click="handleAuthClick">Register</yap-button>
      </div>
      <div class="yapper-auth-form-mode" v-if="mode">Don`t have an account?
        <span @click="mode = !mode; error = ''" class="yapper-auth-form-mode-link">Register</span>
      </div>
      <div class="yapper-auth-form-mode" v-else>Already registered?
        <span @click="mode = !mode; error = ''" class="yapper-auth-form-mode-link">Login</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineModel, inject, ref} from 'vue';
import YapButton from '@/components/YapButton.vue';
import YapInput from '@/components/YapInput.vue';
import YapPasswordInput from '@/components/YapPasswordInput.vue';
import userAPI from '@/api/user.js';
import {useUserStore} from '@/stores/user.js';
import {useRouter} from 'vue-router';

const cookies = inject('$cookies');
const router = useRouter();

const userStore = useUserStore();

const mode = ref(true);
const error = ref('');
const login = defineModel('login', {default: ''});
const password = defineModel('password', {default: ''});
const nickname = defineModel('nickname', {default: ''});

const handleAuthClick = () => {
  if (login.value.length > 0 && password.value.length > 0) {
    if (mode.value) {
      userAPI.login({login: login.value, password: password.value}).then(response => {
        if (response.data.status) {
          error.value = '';
          cookies.set('user', {_id: response.data.user._id, nickname: response.data.user.nickname});
          userStore._id = response.data.user._id;
          userStore.nickname = response.data.user.nickname;
          router.push('/');
        }
      }).catch(err => error.value = err.response.data.message);
    } else {
      if (nickname.value.length > 0) {
        userAPI.register({login: login.value, nickname: nickname.value, password: password.value}).then(response => {
          if (response.data.status) {
            error.value = '';
            cookies.set('user', {_id: response.data.user._id, nickname: response.data.user.nickname});
            userStore._id = response.data.user._id;
            userStore.nickname = response.data.user.nickname;
            router.push('/');
          }
        }).catch(err => error.value = err.response.data.message);
      } else {
        error.value = 'Nickname is required';
      }
    }
  } else {
    error.value = 'Login & password are required';
  }
};
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables';
@use '@/assets/scss/mixins';

.yapper-auth {
  width: 100%;
  display: flex;
  padding-top: 20vh;

  &-form {
    display: flex;
    margin: 0 auto;
    flex-direction: column;
    justify-content: flex-start;
    gap: .75rem;
    background: variables.$secondary-background-color;
    padding: 2rem 5rem;
    border-radius: 1rem;

    &-title {
      font: 1.5rem variables.$font-header;
      text-align: center;
    }

    &-inputs {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      gap: .75rem;
    }

    &-button {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }

    &-mode {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      gap: .5rem;
      font: 1rem variables.$font-body;
      color: variables.$text-color;

      &-link {
        color: variables.$accent-color;

        @include mixins.breakpoint(xxl) {
          &:hover {
            cursor: pointer;
            color: variables.$text-color;
          }
        }
      }
    }

    &-error {
      padding-left: .6rem;
      margin-top: -.5rem;
      font: 1.2rem variables.$font-body;
      color: variables.$error-color;
    }
  }

}
</style>