<template>
  <div class="home_wrap">
    <div class="home_content">
      <Waterfall :gap="horizontalGap" :column="feedsColumn" :bottom="verticalGap" :page-size="10" :request="getData" />
    </div>
  </div>
</template>

<script setup lang="ts">
import preLoadImage from '@/utils/preLoadImage';
import Waterfall from './components/Waterfall.vue'
import type { ICardItem } from './components/type';

const mockImg = ['https://file.shiyiyunpan.com/base/65efe8caf572934f4486747c.jpeg_webp', 'https://file.shiyiyunpan.com/base/65efe96bf572934f44867480.jpeg', 'https://file.shiyiyunpan.com/base/65efe8e0f572934f4486747d.jpeg_webp', 'https://file.shiyiyunpan.com/base/65efe937f572934f4486747e.jpeg_webp', 'https://file.shiyiyunpan.com/base/65efe9f5f572934f44867481.jpg', 'https://file.shiyiyunpan.com/base/65efe94cf572934f4486747f.jpg_webp', 'https://file.shiyiyunpan.com/base/65efeafcf572934f44867485.jpeg', 'https://file.shiyiyunpan.com/base/65efea7df572934f44867484.jpeg', 'https://file.shiyiyunpan.com/base/65efea04f572934f44867482.jpeg', 'https://file.shiyiyunpan.com/base/65efccf9f572934f4486746f.jpeg', 'https://file.shiyiyunpan.com/base/65efcd15f572934f44867470.jpg', 'https://file.shiyiyunpan.com/base/65efea15f572934f44867483.jpg', 'https://file.shiyiyunpan.com/base/65efcd4bf572934f44867473.jpeg', 'https://file.shiyiyunpan.com/base/65efcd27f572934f44867471.jpeg', 'https://file.shiyiyunpan.com/base/65efcd39f572934f44867472.jpg', 'https://file.shiyiyunpan.com/base/65efcd58f572934f44867474.jpeg', 'https://file.shiyiyunpan.com/base/65efcdabf572934f44867478.png', 'https://file.shiyiyunpan.com/base/65efcd6df572934f44867475.jpg', 'https://file.shiyiyunpan.com/base/65efeb09f572934f44867486.jpeg', 'https://file.shiyiyunpan.com/base/65efcd7cf572934f44867476.jpeg', 'https://file.shiyiyunpan.com/base/65efcdc3f572934f44867479.jpg', 'https://file.shiyiyunpan.com/base/65efeb9df572934f44867489.jpg', 'https://file.shiyiyunpan.com/base/65efcd95f572934f44867477.jpg', 'https://file.shiyiyunpan.com/base/65efccf9f572934f4486746f.jpeg', 'https://file.shiyiyunpan.com/base/65efcd15f572934f44867470.jpg', 'https://file.shiyiyunpan.com/base/65efcd4bf572934f44867473.jpeg', 'https://file.shiyiyunpan.com/base/65efcd27f572934f44867471.jpeg', 'https://file.shiyiyunpan.com/base/65efcd39f572934f44867472.jpg', 'https://file.shiyiyunpan.com/base/65efcd58f572934f44867474.jpeg', 'https://file.shiyiyunpan.com/base/65efcdabf572934f44867478.png', 'https://file.shiyiyunpan.com/base/65efeb27f572934f44867488.jpeg', 'https://file.shiyiyunpan.com/base/65efce04f572934f4486747b.jpeg', 'https://file.shiyiyunpan.com/base/65efcd7cf572934f44867476.jpeg', 'https://file.shiyiyunpan.com/base/65efcdc3f572934f44867479.jpg', 'https://file.shiyiyunpan.com/base/65efcde7f572934f4486747a.jpeg', 'https://file.shiyiyunpan.com/base/65efeb18f572934f44867487.jpeg',]

// 请求数据
const getData = (page: number, pageSize: number) => {

  return new Promise<ICardItem[]>(resolve => {
    setTimeout(async () => {
      const data: ICardItem[] = []
      const arr = mockImg.slice((page - 1) * pageSize, page * pageSize)
      for (let k = 0; k < arr.length; k++) {
        const imageElement: HTMLImageElement = await preLoadImage(arr[k]) as HTMLImageElement;
        const item: ICardItem = {
          id: k + (page - 1) * pageSize,
          url: arr[k],
          width: imageElement.width,
          height: imageElement.height
        };
        data.push(item);
      }
      resolve(data)
    }, 1000)
  })
}

// 根据屏幕大小计算瀑布流的列数
const feedsColumn = ref(5)
const verticalGap = ref(16)
const horizontalGap = ref(32)

const resizeObserver = new ResizeObserver(() => {
  let style = getComputedStyle(document.body); // 你可以根据实际情况选择任意元素，这里以body元素作为示例
  let columns = style.getPropertyValue('--feeds-columns').trim();
  let vertical = style.getPropertyValue('--vertical').trim();
  let horizontal = style.getPropertyValue('--horizontal').trim();
  feedsColumn.value = Number(columns)
  verticalGap.value = Number(vertical)
  horizontalGap.value = Number(horizontal)

});

onMounted(() => {
  resizeObserver.observe(document.body);
})

</script>
<style scoped lang="scss">
.home_wrap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.home_content {
  width: 100%;
  height: 100%;
}
</style>