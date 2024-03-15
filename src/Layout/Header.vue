<template>
  <div class="header_wrap">
    <ElRow :gutter="10" class="header_content" v-if="false">
      <ElCol :xs="0" :sm="0" :md="4" :lg="4" :xl="5" class="header_logo hidden-xs-only">
        <!-- <img src="@/assets/images/common/logo.png" alt=""> -->
        <!-- <div class="logo_text">时一</div> -->
      </ElCol>
      <ElCol :xs="24" :sm="24" :md="20" :lg="17" :xl="16" class="header_center">
        <div class="header_search">
          <input class="search_input" type="text" placeholder="搜索">
          <img class="search_icon" src="../assets/images/common/search_icon.png" alt="">
        </div>
        <div class="header_dropdown hidden-xs-only">
          <SyDropdown />
        </div>
        <div class="header_nav hidden-xs-only">
          <SyTabs :navList="tabList" :activeTab="activeTab" @on-change="handleChangeActiveTab" />
        </div>

        <!-- 面包屑 -->
        <div class="header_menu ">
          <!-- 下拉面板 -->
          <ElDropdown trigger="click" placement="bottom-end" popper-class="header_menu_dropdown">
            <span class="el-dropdown-link">
              <ElIcon :size="25">
                <Menu />
              </ElIcon>
            </span>
            <template #dropdown>
              <ElDropdownMenu>
                <ElDropdownItem>
                  存储空间
                </ElDropdownItem>
                <ElDropdownItem divided>首页</ElDropdownItem>
                <ElDropdownItem>帖子</ElDropdownItem>
                <ElDropdownItem>消息</ElDropdownItem>
                <ElDropdownItem>我的</ElDropdownItem>
                <ElDropdownItem divided>会员中心</ElDropdownItem>
                <ElDropdownItem>时币：0</ElDropdownItem>
                <ElDropdownItem divided>退出登录</ElDropdownItem>
              </ElDropdownMenu>
            </template>
          </ElDropdown>
        </div>
      </ElCol>
      <ElCol :xs="0" :sm="0" :md="0" :lg="3" :xl="3" class="header_right hidden-md-and-down">
        <div class="tingtie">
          <img src="../assets/images/common/tingtie_icon.png" alt="">
        </div>
        <div class="operation">
          <img src="../assets/images/common/operation_icon.png" alt="">
        </div>
        <div class="user">
          <img src="../assets/images/common/user_icon.png" alt="">
        </div>
      </ElCol>
    </ElRow>
  </div>
</template>

<script setup lang="ts">
import SyDropdown from '@/components/lib/sy-dropdown.vue';
import SyTabs from '@/components/lib/sy-tabs.vue';
import { ref } from 'vue';
const tabList = ref(['全部', '同校', '关注']);
const activeTab = ref(0);
const handleChangeActiveTab = (index: number) => {
  activeTab.value = index;
}

</script>
<style scoped lang="scss">
.header_wrap {
  width: 100%;
  height: 72px;
  color: $--color-main-text;

  .el-row {
    margin: 0 !important;

    .el-col {
      padding: 0 !important;
    }
  }

  .header_content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .header_logo {
      display: flex;
      align-items: center;
      justify-content: center;
      width: vw(264);
      height: 42px;
      max-width: 264px;
      min-width: 160px;
      box-sizing: border-box;
      background-color: pink;

      img {
        width: 42px;
        height: 42px;
        border-radius: 50%;
      }

      .logo_text {
        margin-left: 8px;
        font-size: 24px;
        font-weight: 500;
      }
    }

    .header_center {
      flex: 1;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      padding-left: 40px !important;
      padding-right: 20px !important;
      box-sizing: border-box;

      .header_search {
        position: relative;
        width: 50%;
        max-width: 346px;
        min-width: 250px;
        margin-left: 10px;
        height: 40px;

        .search_input {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          font-size: inherit;
          color: $--color-main-text;
          border-radius: 40px;
          padding-left: 62px;
          box-sizing: border-box;
          outline: none;
          border: none;
          background: $--color-bg-1;

          &::placeholder {
            font-size: inherit;
            color: $--color-placeholder;
          }
        }

        .search_icon {
          position: absolute;
          left: 22px;
          top: 50%;
          transform: translateY(-50%);
          width: 20px;
          height: 20px;
        }
      }

      .header_nav {
        margin-left: 30px;
        width: 40%;
        min-width: 200px;
        max-width: 280px;
        height: 40px;
      }

      .header_menu {
        position: relative;
        display: none;
        color: $--color-placeholder;
        cursor: pointer;

        &:hover {
          .el-dropdown-link {
            .el-icon {
              color: $--color-main-text;
            }
          }
        }
      }
    }

    .header_right {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 157px;
      max-width: 157px;
      min-width: 157px;
      height: 40px;
      margin-right: 40px;
      margin-left: 10px;

      .tingtie,
      .operation {
        display: flex;
        align-items: center;
        cursor: pointer;

        img {
          width: 30px;
          height: 30px;
        }
      }

      .user {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}

// 在大屏下
@media only screen and (min-width: 1900px) {
  .header_wrap {
    .header_content {
      .header_right {
        justify-content: flex-end;
        max-width: 230px;
        margin-right: 80px !important;

        .operation {
          margin: 0 30px;
        }
      }
    }
  }
}

@media only screen and (max-width: 1000px) {
  .header_wrap {
    .header_content {
      .header_center {
        justify-content: space-evenly;

        .header_search {
          width: 80%;
          max-width: 450px;
        }

        .header_dropdown,
        .header_nav {
          display: none;
        }

        .header_menu {
          display: block !important;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.header_menu_dropdown.el-dropdown__popper.el-popper {
  background: $--color-main-bg-dark;
  border: none;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: var(--el-box-shadow-lighter);

  .el-dropdown-menu {
    background-color: $--color-bg-black-light;

    .el-dropdown-menu__item {
      width: 100px;
      color: $--color-text-3;

      &:hover {
        color: $--color-main-text;
        background: $--color-bg-1;
      }
    }

    .el-dropdown-menu__item:not(.is-disabled):focus {
      background-color: $--color-bg-1;
    }

    .el-dropdown-menu__item--divided {
      border-top: 1px solid $--border-color-light;
    }
  }

  .el-popper__arrow {
    display: none;
  }
}
</style>