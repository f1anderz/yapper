<template>
  <div class="yapper-auth">
    <div class="yapper-auth-form">
      <div class="yapper-auth-form-title text-gradient" v-if="mode">Login</div>
      <div class="yapper-auth-form-title text-gradient" v-else>Register</div>
      <div class="yapper-auth-form-inputs">
        <yap-input v-model="login" type="text" placeholder="Login..." name="login"/>
        <yap-input v-if="!mode" v-model="nickname" type="text" placeholder="Full name..." name="full-name"/>
        <yap-password-input v-model="password"/>
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
<!--          <div @click="linkedInLogin">Login with LinkedIn</div>-->
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
import {defineModel, inject, onMounted, ref} from 'vue';
import YapButton from '@/components/YapButton.vue';
import YapInput from '@/components/YapInput.vue';
import YapPasswordInput from '@/components/YapPasswordInput.vue';
import userAPI from '@/api/user.js';
import {useUserStore} from '@/stores/user.js';
import {useRouter} from 'vue-router';
import {decodeCredential, GoogleLogin} from 'vue3-google-login';
import {LinkedInCallback, useLinkedIn} from 'vue3-linkedin-login';

const cookies = inject('$cookies');
const router = useRouter();

const userStore = useUserStore();

const mode = ref(true);
const error = ref('');
const login = defineModel('login', {default: ''});
const password = defineModel('password', {default: ''});
const nickname = defineModel('nickname', {default: ''});

const {linkedInLogin, exchangeCodeForToken, getAccount, getMail} =
    useLinkedIn({
      clientId: '77ankc4o6irl0d',
      clientSecret: 'WPL_AP0.mD2ne6HniTGFkeoD.ODU4NzU5MDMw',
      redirectUri: 'http://localhost:5173/auth/linkedin',
      onSuccess: async (code) => {
        const exchangeCode = await exchangeCodeForToken(code);
        const account = await getAccount(exchangeCode.access_token);
        const email = await getMail(exchangeCode.access_token);

        if (!account || !email) {
          return;
        }

        const firstName = account.localizedFirstName;
        const lastName = account.localizedLastName;
        const emailAddress = email.elements[0]['handle~'].emailAddress;

        const user = {
          firstName,
          lastName,
          emailAddress,
        };

        console.log(user);
      },
      scope: 'r_emailaddress,r_liteprofile',
      onError: (error) => {
        console.log(error);
      },
    });

onMounted(() => {
  LinkedInCallback();
});


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
        userAPI.register({login: login.value, nickname: compiledNickname, password: password.value}).then(response => {
          if (response.data.status) {
            error.value = '';
            cookies.set('user', {_id: response.data.user._id, nickname: response.data.user.nickname});
            userStore._id = response.data.user._id;
            userStore.nickname = response.data.user.nickname;
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

const handleGoogleLogin = (e) => {
  const userInfo = decodeCredential(e.credential);
  if (mode.value) {
    userAPI.google_login({googleId: userInfo.sub}).then(response => {
      if (response.data.status) {
        error.value = '';
        cookies.set('user', {_id: response.data.user._id, nickname: response.data.user.nickname});
        userStore._id = response.data.user._id;
        userStore.nickname = response.data.user.nickname;
        router.push('/');
      }
    }).catch(err => error.value = err.response.data.message);
  } else {
    const compiledNickname = userInfo.name.replace(/ /g, '.').toLowerCase();
    userAPI.google_register({
      nickname: compiledNickname,
      sub: userInfo.sub
    }).then(response => {
      if (response.data.status) {
        error.value = '';
        cookies.set('user', {_id: response.data.user._id, nickname: response.data.user.nickname});
        userStore._id = response.data.user._id;
        userStore.nickname = response.data.user.nickname;
        router.push('/');
      }
    }).catch(err => error.value = err.response.data.message);
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
    padding: 2rem 3rem;
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

    &-third-party {
      padding-top: .75rem;
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
        justify-content: center;
        gap: 1rem;
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