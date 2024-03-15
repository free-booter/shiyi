<template>
  <div class="sy_dropdown" ref="dropdownRef">
    <div class="sy_dropdown_trigger" @click="isShowMenu = !isShowMenu">
      <div class="sy_dropdown_trigger_tit">{{ currentTrigger }}</div>
      <div class="sy_dropdown_trigger_icon">
        <IEpCaretBottom></IEpCaretBottom>
      </div>
    </div>
    <div class="sy_dropdown_menu" v-show="isShowMenu">
      <div class="sy_dropdown_menu_item flex-center" v-for="n in 8" :key="n">全部格式</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import useClickOutside from '@/hooks/useClickOutside'
const isShowMenu = ref(false)
const dropdownRef = ref<HTMLElement>()

const currentTrigger = ref('全部格式')

let destroyFn: (() => void) | null = null
onMounted(() => {
  destroyFn = useClickOutside(dropdownRef.value as HTMLElement, () => {
    if(isShowMenu.value) {
      isShowMenu.value = false
    }
  })
})

onUnmounted(() => {
  if (destroyFn) {
    destroyFn()
  }
})

</script>

<style scoped lang="scss">
.sy_dropdown {
  position: relative;
  width: 138px;
  height: 40px;
  margin-left: 32px;

  &_trigger {
    width: 138px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $--color-bg-1;
    border-radius: 100px;
    cursor: pointer;

    &_icon {
      margin-top: 5px;
      margin-left: 8px;
      font-size: 14px;
      color: #bfbfbf;
    }
  }

  &_menu {
    position: absolute;
    left: 0;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 409px;
    margin-top: 16px;
    border-radius: 20px;
    box-sizing: border-box;
    background: #292929;
    z-index: 1;

    &_item {
      width: 80px;
      height: 46px;
      margin: 14px 10px;
      font-size: var(--font-size-midden);
      border-radius: 10px;
      color: $--color-text-2;
      background: $--color-bg-1;
      cursor: pointer;

      &.active {
        background: $--color-main-bg;
      }
    }
  }
}
</style>