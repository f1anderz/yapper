<template>
  <yap-message-box :visible="visible">{{ message }}</yap-message-box>
  <div class="yapper-home">
    <div class="yapper-home-random">
      <yap-card v-if="yap._id" :yap="yap" @like-click="handleLikeClick"/>
      <div v-else class="yapper-home-random-loading">{{ loadingRandom }}</div>
      <yap-button class="yapper-home-random-button" @click="handleGetClick">Get new yap</yap-button>
    </div>
    <div class="yapper-home-create">
      <yap-create @yapped="handleYapClick"/>
    </div>
    <div class="yapper-home-feed">
      <div v-if="yaps.length > 0" class="yapper-home-feed-title">Oops! Someone yapped you</div>
      <div v-else class="yapper-home-feed-title">Looks fake, but...</div>
      <div class="yapper-home-feed-body">
        <yap-list v-if="yaps.length > 0" :yaps="yaps" @like-click="handleLikeClick"/>
        <div v-else class="yapper-home-feed-body-loading">{{ loadingList }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import 'vue3-emoji-picker/css';
import yapAPI from '@/api/yap.js';
import {ref} from 'vue';
import YapCard from '@/components/YapCard.vue';
import {useUserStore} from '@/stores/user.js';
import YapCreate from '@/components/YapCreate.vue';
import YapList from '@/components/YapList.vue';
import YapButton from '@/components/YapButton.vue';
import YapMessageBox from '@/components/YapMessageBox.vue';

const userStore = useUserStore();

const yap = ref({});
const visible = ref(false);
const message = ref(' ');
let yapId = '6655fbc4c25b2037aa2b96d7';
const yaps = ref([]);
const loadingRandom = ref('Searching for best yap');
const loadingList = ref('Searching for yaps');

const getRandomYap = () => {
  yapAPI.get_random_yap(yapId).then(response => {
    yap.value = response.data;
    yapId = response.data._id;
  }).catch(err => {
    loadingRandom.value = err.response.data.message;
  });
};

const getYap = () => {
  yapAPI.get_yap(yapId).then(response => {
    yap.value = response.data;
  }).catch(() => {
    loadingRandom.value = 'No yaps found';
  });
};

const getYaps = () => {
  yapAPI.get_victim_yaps({userId: userStore.user._id}).then(response => {
    if (response.data.length > 0) {
      yaps.value = response.data;
    } else {
      loadingList.value = 'No one yapped you';
    }
  }).catch(err => {
    loadingList.value = err.response.data.message;
    console.log(err);
  });
};

getRandomYap();
getYaps();

const getData = () => {
  getYap();
  getYaps();
};

const handleLikeClick = (e) => {
  yapAPI.trigger_like({yapId: e, userId: userStore.user._id}).then(() => {
    getData();
  }).catch(err => console.log(err));
};

const handleGetClick = () => {
  getRandomYap();
};

const handleYapClick = () => {
  getData();
  message.value = 'Yapped!';
  visible.value = true;
  setTimeout(() => {
    visible.value = false;
  }, 750);
};
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables';

.yapper-home {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 4vh;

  &-random {
    padding-bottom: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    border-bottom: .01rem solid variables.$accent-color;

    &-button {
      margin: 0 auto;
    }

    &-loading {
      font: 1.2rem variables.$font-body;
      text-align: center;
      padding-bottom: .8rem;
    }
  }

  &-create {
    padding: 0 5%;
    border-bottom: .1rem solid variables.$accent-color;
  }

  &-feed {
    padding-top: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 1rem;
    max-height: 75vh;
    min-height: 60vh;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

    &-title {
      font: 1.3rem variables.$font-header;
    }

    &-body {
      &-loading {
        font: 1.2rem variables.$font-body;
        text-align: center;
        padding-bottom: .8rem;
      }
    }
  }
}
</style>