<template>
  <div class="item_box flex-column">
    <div class="item_img">
      <img src="https://file.shiyiyunpan.com/base/65ea7f81f572a9ec19f4cc86.png" alt="" />
    </div>
    <div class="item_title">
      <p>历年2023四川大学有机化学机期末考题(个人笔记)啊啊啊啊啊啊啊啊1123456642346.pdf</p>
    </div>
    <div class="item_info">
      <p class="item_info_page">433页</p>
      <p class="item_info_size">2.5M</p>
      <p class="item_info_time">2023-10-05 14:44:12</p>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
<style scoped lang="scss">
.item_box {
  width: 275px;
  .item_img {
    width: 100%;
    height: 378px;
    border-radius: 20px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .item_title {
    margin-top: 12px;
    margin-bottom: 8px;
    // 显示两行，超出部分显示省略号
    p {
      font-size: var(--font-size-normal);
      color: var(--color-text-1);
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }

  .item_info {
    width: 100%;
    display: flex;
    p {
      font-size: var(--font-size-small);
      color: #bfbfbf;
    }
    &_time {
      margin-left: auto;
    }
    &_size {
      margin-left: 10px;
    }
  }
}
</style>