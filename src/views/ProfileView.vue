<template>
  <yap-message-box :visible="visible">{{ message }}</yap-message-box>
  <div class="yapper-profile">
    <div class="yapper-profile-dashboard">
      <div class="yapper-profile-dashboard-title text-gradient">Your stats</div>
      <div class="yapper-profile-dashboard-list" v-if="stats !== null">
        <yap-stats-list :list="stats"/>
      </div>
    </div>
    <div class="yapper-profile-yaps">
      <div class="yapper-profile-yaps-title text-gradient">Your yaps</div>
      <div class="yapper-profile-yaps-list">
        <yap-list v-if="yaps !== null" :yaps="yaps" :enable-controls="true"
                  @like-click="handleLikeClick" @edit-click="handleEditClick" @delete-click="handleDeleteClick"/>
      </div>
    </div>
    <yap-button @click="handleLogout">Logout</yap-button>
  </div>
  <div class="edit" v-if="editMode" @click="closeEdit">
    <div class="edit-context">
      <yap-input class="edit-context-input" v-model="yap" placeholder="Edit yap..." name="yap" type="text"
                 width="32rem"/>
      <div class="edit-context-switches">
        <div v-click-outside="() => {emojiPickerVisible = false}" class="edit-context-switches-emoji">
          <img @click="emojiPickerVisible = !emojiPickerVisible" src="@/assets/img/icons/emoji.svg"
               alt="Emoji" class="edit-context-switches-emoji-switch">
          <EmojiPicker v-if="emojiPickerVisible" class="edit-context-switches-emoji-picker" :native="true"
                       :display-recent="true" :disable-skin-tones="true" @select="onSelectEmoji" :hide-search="true"/>
        </div>
        <div class="edit-context-switches-date" v-click-outside="() => datePickerVisible = false">
          <img @click="datePickerVisible = !datePickerVisible" class="edit-switches-context-date-switch"
               src="@/assets/img/icons/calendar.svg" alt="Date">
          <VueDatePicker v-if="datePickerVisible" class="edit-context-switches-date-picker" :min-date="new Date()"
                         :auto-apply="true" v-model="deathTime" :inline="true"/>
        </div>
      </div>
      <yap-button class="edit-context-button" @click="handleSaveClick">Save</yap-button>
    </div>
  </div>
</template>

<script setup>
import {useUserStore} from '@/stores/user.js';
import {inject, ref} from 'vue';
import {useRouter} from 'vue-router';
import YapButton from '@/components/YapButton.vue';
import YapList from '@/components/YapList.vue';
import yapAPI from '@/api/yap.js';
import statsAPI from '@/api/statistics.js';
import YapInput from '@/components/YapInput.vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import EmojiPicker from 'vue3-emoji-picker';
import YapMessageBox from '@/components/YapMessageBox.vue';
import YapStatsList from '@/components/YapStatsList.vue';

const cookies = inject('$cookies');
const router = useRouter();

const userStore = useUserStore();

const yaps = ref(null);
const stats = ref(null);
const _id = ref('');
const yap = defineModel('yap');
const deathTime = defineModel('deathTime');
const editMode = ref(false);
const datePickerVisible = ref(false);
const emojiPickerVisible = ref(false);
const visible = ref(false);
const message = ref(' ');

const getData = () => {
  yapAPI.get_author_yaps({userId: userStore.user._id}).then(response => {
    yaps.value = response.data;
  }).catch(err => console.log(err));
  statsAPI.get_user_stats(userStore.user._id).then(response => {
    stats.value = response.data;
  }).catch(err => console.log(err));
};

getData();

const handleLogout = async () => {
  cookies.remove('user');
  userStore.user = {_id: null};
  await router.push('/');
};

const handleLikeClick = (e) => {
  yapAPI.trigger_like({yapId: e, userId: userStore.user._id}).then(() => {
    getData();
  }).catch(err => console.log(err));
};

const handleEditClick = (e) => {
  editMode.value = !editMode.value;
  yap.value = e.body;
  deathTime.value = e.deathTime;
  _id.value = e._id;
};

const handleDeleteClick = (e) => {
  yapAPI.delete_yap(e).then(() => {
    getData();
    message.value = 'Deleted!';
    visible.value = true;
    setTimeout(() => {
      visible.value = false;
    }, 750);
  }).catch(err => console.log(err));
};

const handleSaveClick = () => {
  editMode.value = false;
  yapAPI.update_yap({yapId: _id.value, body: yap.value, deathTime: deathTime.value}).then(() => {
    getData();
    message.value = 'Edited!';
    visible.value = true;
    setTimeout(() => {
      visible.value = false;
    }, 750);
  }).catch(err => console.log(err));
};

const closeEdit = (e) => {
  try {
    if (e.target.nodeName !== 'BUTTON' && e.target.nodeName !== 'INPUT') {
      if (!e.target.classList[0].includes('context')) {
        editMode.value = false;
      }
    }
  } catch (err) {
  }
};

const onSelectEmoji = (e) => {
  yap.value += e.i;
};
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables';
@use '@/assets/scss/mixins';

.yapper-profile {
  position: relative;
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  padding-bottom: 2rem;

  &-yaps {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: .5rem;

    &-title {
      font: 1.2rem variables.$font-header;
    }

    &-list {
      width: 100%;
      max-height: 68vh;
      min-height: 68vh;
      overflow-y: scroll;
      -ms-overflow-style: none;
      scrollbar-width: none;

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }

  &-dashboard {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: .3rem;

    &-title {
      font: 1.15rem variables.$font-header;
    }

    &-list {
      padding-left: 5%;
    }
  }
}

.edit {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 8%;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  &-context {
    padding: 2rem 1rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: .5rem;
    background: variables.$secondary-background-color;
    box-shadow: 0 .1rem .8rem 0 rgba(47, 47, 47, .3);
    border-radius: .8rem;
    font: 1rem variables.$font-header;
    color: variables.$text-color;

    &-switches {
      padding-left: 1rem;
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: 5rem;

      &-emoji, &-date {
        position: relative;

        & img {
          width: 1rem;
          height: 1rem;

          @include mixins.breakpoint(xxl) {
            &:hover {
              cursor: pointer;
            }
          }
        }

        &-picker {
          font-family: variables.$font-body;
          position: absolute;
          top: 2.2rem;
        }
      }
    }

    &-button {
      margin-left: auto;
      margin-right: 10%;
    }
  }
}
</style>