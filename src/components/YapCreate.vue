<template>
  <div class="yap-create">
    <yap-select @selected="onVictimSelect" :clear="clear"/>
    <yap-input type="text" v-model="body" :type="'text'" :name="'yap-body'" :width="'40rem'"
               :placeholder="'Lest`s yap, shall we?)'"/>
    <div v-if="error.length > 0" class="yap-create-error">
      {{ error }}
    </div>
    <div class="yap-create-controls">
      <div class="yap-create-controls-switches">
        <img @click="emojiPickerVisible = !emojiPickerVisible" src="@/assets/img/icons/emoji.svg"
             alt="Emoji" class="yap-create-controls-switches-emoji">
        <img @click="datePickerVisible = !datePickerVisible" src="@/assets/img/icons/calendar.svg" alt="Specify date"
             class="yap-create-controls-switches-date">
      </div>
      <yap-button @click="handleYapClick">Yap</yap-button>
      <EmojiPicker v-if="emojiPickerVisible" class="yap-create-controls-emoji-select" :native="true"
                   :disable-skin-tones="true" @select="onSelectEmoji"/>
      <VueDatePicker v-if="datePickerVisible"
                     class="yap-create-controls-date-picker" v-model="deathTime"/>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import EmojiPicker from 'vue3-emoji-picker';
import YapInput from '@/components/YapInput.vue';
import YapButton from '@/components/YapButton.vue';
import YapSelect from '@/components/YapSelect.vue';
import {useUserStore} from '@/stores/user.js';
import yapAPI from '@/api/yap.js';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const emit = defineEmits(['yapped']);

const userStore = useUserStore();

const emojiPickerVisible = ref(false);
const datePickerVisible = ref(false);
const body = defineModel('name', {default: ''});
const victim = ref('');
const deathTime = ref(null);
const error = ref('');
const clear = ref(false);

const onSelectEmoji = (e) => {
  body.value += e.i;
};

const onVictimSelect = (e) => {
  victim.value = e;
};

const handleYapClick = () => {
  if (victim.value.length > 0 && body.value.length > 0) {
    yapAPI.post_yap({
      author: userStore._id,
      victim: victim.value,
      body: body.value,
      deathTime: deathTime.value
    }).then(response => {
      clear.value = !clear.value;
      error.value = '';
      victim.value = '';
      body.value = '';
      deathTime.value = null;
      emojiPickerVisible.value = false;
      datePickerVisible.value = false;
      emit('yapped');
    }).catch(err => error.value = err.response.data.message);
  } else {
    error.value = 'Victim and some yap are required';
  }
};
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables';
@use '@/assets/scss/mixins';

.yap-create {
  padding: 1rem 1rem;
  display: flex;
  flex-direction: column;

  &-error {
    padding-left: .75rem;
    font: 1.2rem variables.$font-body;
    color: variables.$error-color;
  }

  &-controls {
    position: relative;
    padding: 0 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    &-switches {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: 4rem;

      &-emoji, &-date {
        width: 1rem;
        height: 1rem;

        @include mixins.breakpoint(xxl) {
          &:hover {
            cursor: pointer;
          }
        }
      }
    }

    &-emoji-select {
      font: 1rem variables.$font-body;
      position: absolute;
      top: 2.2rem;
      left: 0;
    }

    &-date-picker {
      width: 14rem;
      font: 1rem variables.$font-body;
      position: absolute;
      top: 2.2rem;
      left: 0;
    }
  }
}
</style>