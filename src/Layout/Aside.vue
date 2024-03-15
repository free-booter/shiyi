<template>
  <div class="aside_menu" v-if="false">
    <div class="menu_item" v-for="item in menuList" :key="item.id" @click="handleToRoute(item)">
      <div class="menu_item_active" v-if="currentPath == item.path">
        <img src="../assets/images/common/active_tab_bg.png" alt="">
      </div>
      <img class="menu_icon" :src="`/src/assets/images/common/${item.icon}.png`" alt="">
      <span :class="{ active: currentPath == item.path }">{{ item.name }}</span>
    </div>
  </div>
  <div class="aside_other" v-if="false">
    <div class="coin_box">
      <img class="coin_icon" src="../assets/images/common/coin_icon.png" alt="">
      <div class="coin_num">15</div>
      <div class="coin_btn">充值</div>
    </div>
    <div class="space_info">
      <div class="space_head">
        <div class="head_tit">存储空间</div>
        <div class="head_btn">进入</div>
      </div>
      <div class="space_content">
        <div class="space_num">
          <span class="num_used">{{ usedSpace }}GB / </span>
          <span class="num_total">{{ totalSpace }}GB</span>
        </div>
        <div class="space_progress">
          <ElProgress :show-text="false" :stroke-width="15" color="#3165FB" :percentage="calSpacePercent" striped
            striped-flow />
        </div>
      </div>
      <div class="space_btn">会员中心</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
// 写路由菜单
const menuList = ref([
  {
    id: 1,
    name: '首页',
    path: '/home',
    icon: 'home_icon'
  },
  {
    id: 2,
    name: '帖子',
    path: '/post',
    icon: 'post_icon'
  },
  {
    id: 3,
    name: '消息',
    path: '/notice',
    icon: 'notice_icon'
  },
  {
    id: 4,
    name: '我的',
    path: '/mine',
    icon: 'mine_icon'
  }
])

// 当前的路由路径
const route = useRoute()
const router = useRouter()
const currentPath = computed(() => route.path)
// 路由跳转
const handleToRoute = (item: any) => {
  router.push(item.path)
}

const usedSpace = ref(100)
const totalSpace = ref(256)
const calSpacePercent = computed(() => {
  return (usedSpace.value / totalSpace.value) * 100
})


onMounted(() => {
})

</script>
<style scoped lang="scss">
.aside_menu {
  .menu_item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 50px;
    margin-bottom: 10px;
    cursor: pointer;

    .menu_icon {
      width: 20px;
      height: 20px;
      margin-right: 10px;
      margin-left: 47px;
    }

    .menu_item_active {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;

      img {
        width: 83px;
        height: 50px;
      }
    }

    .active {
      color: $--color-main-bg;
    }

    &:hover {
      color: $--color-main-bg;
    }
  }
}

.aside_other {
  position: absolute;
  left: vw(20);
  bottom: vh(128);

  .coin_box {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    padding: 8px;
    box-sizing: border-box;
    border-radius: 15px;
    background: $--color-bg-1;

    .coin_icon {
      width: 25px;
      height: 25px;
      margin-right: 10px;
    }

    .coin_num {
      color: $--color-text-4;
    }

    .coin_btn {
      padding: 5px 10px;
      margin-left: auto;
      background: $--color-main-bg;
      border-radius: 10px;
      cursor: pointer;
    }
  }

  .space_info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    width: vw(217 - 47);
    height: vw(207 - 47);
    min-width: 150px;
    min-height: 140px;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 15px;
    background: $--color-bg-1;

    .space_head {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 24px;

      .head_btn {
        padding: 2px 10px;
        border-radius: 15px;
        font-size: 14px;
        background: $--color-main-bg;
        cursor: pointer;
      }
    }

    .space_content {
      margin-top: 10px;
      width: 100%;

      .space_num {
        width: 100%;
      }

      .space_progress {
        margin-top: 5px;
      }
    }

    .space_btn {
      width: 100%;
      height: vw(42);
      line-height: vw(42);
      margin-top: 10px;
      text-align: center;
      background: $--color-main-bg;
      border-radius: 10px;
      cursor: pointer;
    }
  }
}
</style>