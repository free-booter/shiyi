<template>
  <div class="layout">
    <Header />
    <ElRow class="content">
      <ElCol :xs="0" :sm="0" :md="4" :lg="4" :xl="5" class="layout_aside hidden-xs-only">
        <Aside />
      </ElCol>
      <ElCol :xs="24" :sm="24" :md="20" :lg="20" :xl="19" class="layout_main">
        <Main />
      </ElCol>
    </ElRow>
  </div>
</template>

<script setup lang="ts">
import Header from './Header.vue'
import Aside from './Aside.vue'
import Main from './Main.vue'
console.log('layout')
</script>
<style scoped lang="scss">
.layout {
  height: 100vh;
  max-width: 100vw;
  max-height: 100vh;
  display: flex;
  flex-direction: column;

  .content {
    flex: 1;
    display: flex;

    .layout_aside {
      position: relative;
      width: vw(264);
      max-width: 264px;
      min-width: 160px;
      height: 100%;
      /* background: pink; */
    }

    .layout_main {
      flex: 1;
      padding-left: var(--column-gap);
      padding-right: var(--column-gap);
      box-sizing: border-box;
    }
  }
}
@media (min-width: 1440px) {
  .layout_main {
    max-width: calc(100vw - 264px) !important;
  }
}
</style>