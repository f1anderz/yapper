<template>
  <div class="yap-select">
    <yap-input v-model="searchString" placeholder="Search victims" name="select-search" width="16rem"/>
    <div v-if="searchActive" class="yap-select-list">
      <transition-group name="select-list">
        <div v-for="option in searchedOptions" :key="option._id" @click="handleOptionClick"
             class="yap-select-list-option">
          {{ option.nickname }}
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script setup>
import YapInput from '@/components/YapInput.vue';
import {computed, ref, toRef, watch} from 'vue';
import userAPI from '@/api/user.js';

const emit = defineEmits(['selected']);
const props = defineProps(['clear']);

const selectOptions = ref([]);
userAPI.get_users().then(response => {
  selectOptions.value = response.data;
}).catch(err => console.log(err));

const searchString = defineModel({default: ''});

const searchActive = computed(() => {
  return searchString.value.length > 0 && selectOptions.value.filter(o => {
    return o.nickname === searchString.value;
  }).length === 0 && searchedOptions.value.length !== 0;
});

const searchedOptions = computed(() => {
  return selectOptions.value.filter(o => {
    return o.nickname.includes(searchString.value);
  });
});

const handleOptionClick = (e) => {
  searchString.value = e.target.innerHTML;
};

watch(searchString, (newSearchString, oldSearchString) => {
  emit('selected', newSearchString);
});

watch(toRef(() => props.clear), (newClear, oldClear) => {
  searchString.value = '';
});
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables';
@use '@/assets/scss/mixins';

.yap-select {
  position: relative;
  display: flex;
  flex-direction: column;

  &-list {
    z-index: 2;
    position: absolute;
    top: 2.2rem;
    left: .5rem;
    padding: .3rem 0;
    font: 1rem variables.$font-body;
    color: variables.$text-color;
    box-shadow: -1px 0px 23px 0px rgba(47, 47, 47, 0.45);
    background: variables.$secondary-background-color;
    max-height: 12rem;
    overflow-y: scroll;

    &-option {
      padding: .2rem .5rem;
      border-bottom: .01rem solid variables.$text-color;
      min-width: 12rem;

      &:last-of-type {
        border: none;
      }

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