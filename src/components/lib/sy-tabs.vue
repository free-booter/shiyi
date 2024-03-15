<template>
  <div class="sy_tabs">
    <div class="sy_tabs_nav">
      <div class="sy_tabs_nav-item" :class="{ active: index == activeTab }" v-for="(item, index) in navList" :key="index"
        @click="$emit('on-change', index)">{{ item }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

defineProps({
  navList: {
    type: Array as PropType<string[]>,
    required: true
  },
  activeTab: {
    type: Number as PropType<number>,
    default: 0
  }
})
</script>
<style scoped lang='scss'>
.sy_tabs {
  width: 100%;
  height: 100%;
  padding: 5px 20px;
  border-radius: 100px;
  background: $--color-bg-1;
  box-sizing: border-box;

  &_nav {
    display: flex;
    justify-content: space-between;

    &-item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 70px;
      height: 30px;
      border-radius: 100px;
      color: #fff;
      cursor: pointer;

      &.active {
        background-color: $--color-main-bg;
      }
    }
  }
}</style>