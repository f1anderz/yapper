<template>
  <div class="yapper-auth">
    <div class="yapper-auth-form">
      <div class="yapper-auth-form-title text-gradient" v-if="mode">Login</div>
      <div class="yapper-auth-form-title text-gradient" v-else>Register</div>
      <div class="yapper-auth-form-inputs">
        <yap-input v-model="login" type="text" placeholder="Login..." name="login" v-on:keyup.enter="handleAuthClick"/>
        <yap-input v-if="!mode" v-model="name" type="text" placeholder="Full name..." name="full-name"
                   v-on:keyup.enter="handleAuthClick"/>
        <yap-password-input v-model="password" v-on:keyup.enter="handleAuthClick"/>
      </div>
      <div class="yapper-auth-form-error" v-if="error.length > 0">{{ error }}</div>
      <div class="yapper-auth-form-button">
        <yap-button v-if="mode" @click="handleAuthClick">Login</yap-button>
        <yap-button v-else @click="handleAuthClick">Register</yap-button>
      </div>
      <div class="yapper-auth-form-third-party">
        <div class="yapper-auth-form-third-party-title"><span>Or</span></div>
        <div class="yapper-auth-form-third-party-buttons">
          <google-login :callback="handleGoogleLogin"/>
          <div @click="handleGitHubClick" class="yapper-auth-form-third-party-buttons-github">Login with github
            <img src="@/assets/img/icons/github.svg" alt="GitHub"></div>
        </div>
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
import {defineModel, inject, ref, watch} from 'vue';
import YapButton from '@/components/YapButton.vue';
import YapInput from '@/components/YapInput.vue';
import YapPasswordInput from '@/components/YapPasswordInput.vue';
import userAPI from '@/api/user.js';
import {useUserStore} from '@/stores/user.js';
import {useRoute, useRouter} from 'vue-router';
import {decodeCredential, GoogleLogin} from 'vue3-google-login';

const cookies = inject('$cookies');
const router = useRouter();
const route = useRoute();

const userStore = useUserStore();

const CLIENT_ID = 'Ov23liZgy8WG8x14pglV';

const mode = ref(true);
const error = ref('');
const userData = ref({});
const login = defineModel('login', {default: ''});
const password = defineModel('password', {default: ''});
const name = defineModel('name', {default: ''});

if (route.query.code) {
  const {code} = route.query;
  userAPI.github_get_token(code).then(response => {
    userAPI.github_get_user_data(response.data.access_token).then(response => {
      userData.value = response.data;
    }).catch(err => console.log(err));
  }).catch(err => console.log(err));
}

const setUser = (user) => {
  cookies.set('user', user);
  userStore.user = user;
};

const handleAuthClick = () => {
  if (login.value.length > 0 && password.value.length > 0) {
    if (mode.value) {
      userAPI.login({login: login.value, password: password.value}).then(response => {
        if (response.data.status) {
          error.value = '';
          setUser({
            _id: response.data.user._id,
            login: response.data.user.login,
            name: response.data.user.name
          });
          router.push('/');
        }
      }).catch(err => error.value = err.response.data.message);
    } else {
      if (name.value.length > 0) {
        userAPI.register({login: login.value, name: name.value, password: password.value}).then(response => {
          if (response.data.status) {
            error.value = '';
            setUser({
              _id: response.data.user._id,
              login: response.data.user.login,
              name: response.data.user.name
            });
            router.push('/');
          }
        }).catch(err => error.value = err.response.data.message);
      } else {
        error.value = 'Name is required';
      }
    }
  } else {
    error.value = 'Login & password are required';
  }
};

const handleGitHubClick = () => {
  window.location.assign('https://github.com/login/oauth/authorize?client_id=' + CLIENT_ID);
};

const handleGoogleLogin = (e) => {
  const userInfo = decodeCredential(e.credential);
  login.value = userInfo.name.replace(/ /g, '.').toLowerCase()
  userAPI.google_auth({
    name: userInfo.name,
    login: login.value,
    sub: userInfo.sub
  }).then(response => {
    if (response.data.status) {
      error.value = '';
      setUser({
        _id: response.data.user._id,
        login: response.data.user.login,
        name: response.data.user.name
      });
      router.push('/');
    }
  }).catch(err => error.value = err.response.data.message);
};

watch(userData, () => {
  console.log(userData);
  userAPI.github_auth({
    name: userData.value.name,
    login: userData.value.login,
    gitHubId: userData.value.id
  }).then(response => {
    if (response.data.status) {
      error.value = '';
      setUser({
        _id: response.data.user._id,
        login: response.data.user.login,
        name: response.data.user.name
      });
      router.push('/');
    }
  }).catch(err => console.log(err));
});
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables';
@use '@/assets/scss/mixins';

.yapper-auth {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 20vh;
  padding-bottom: 20vh;
  min-height: 95vh;

  &-form {
    display: flex;
    margin: 0 auto;
    flex-direction: column;
    justify-content: flex-start;
    gap: .75rem;
    background: variables.$secondary-background-color;
    padding: 2rem 3rem;
    border-radius: 1rem;

    @include mixins.breakpoint(xs){
      padding: .75rem 1.5rem;
    }

    @include mixins.breakpoint(s){
      padding: .75rem 1.5rem;
    }

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
      margin-top: .3rem;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }

    &-third-party {
      padding-top: .5rem;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      gap: 1rem;
      font: 1.2rem variables.$font-body;
      color: variables.$text-color;

      &-title {
        margin-bottom: .25rem;
        width: 100%;
        border-bottom: .15rem dashed variables.$accent-color;
        line-height: .1rem;
        text-align: center;

        & span {
          padding: .1rem .2rem;
          background: variables.$secondary-background-color;
        }
      }

      &-buttons {
        display: flex;
        flex-direction: row;
        gap: 1rem;

        @include mixins.breakpoint(xs){
          flex-direction: column;
          gap: .5rem;
        }

        &-github {
          padding: 0 .5rem;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          gap: .5rem;
          font: .9rem variables.$font-body;
          background: #ffffff;
          border: .01rem solid #dddddd;

          @include mixins.breakpoint(xs){
            padding: .55rem .5rem;
          }

          & img {
            width: 1.2rem;
            height: 1.2rem;
          }

          @include mixins.breakpoint(xxl) {
            &:hover {
              cursor: pointer;
              background: #F8FAFF;
              border: .01rem solid #d2e3fc;
            }
          }
        }
      }
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