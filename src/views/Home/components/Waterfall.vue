<template>
  <div ref="containerRef" class="waterfall_container" @scroll="handleScroll">
    <div class="waterfall_list">
      <div class="waterfall_list_item" v-for="(item, index) in state.cardList" :key="item.id" :style="{
        width: `${state.cardWidth}px`,
        transform: `translate3d(${state.cardPos[index].x}px, ${state.cardPos[index].y}px,0)`

      }">
        <img :src="item.url" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ICardItem, ICardPos, IWaterFallProps } from './type';


const props = defineProps<IWaterFallProps>();
const containerRef = ref()
const state = reactive({
  isFinish: false,  // 判断是否已经没有数据，后续不再发送请求
  page: 1,
  cardWidth: 0, // 每一个卡片的宽度
  cardList: [] as ICardItem[],
  cardPos: [] as ICardPos[], // 卡片摆放位置信息
  columnHeight: Array(props.column).fill(0) as number[], // 每一列的高度
  loading: false, // 是否正在加载
});

onMounted(() => {
  init();
});

onUnmounted(() => {
  containerRef.value && resizeObserver.unobserve(containerRef.value);
});

const init = () => {
  if (containerRef.value) {
    const containerWidth = containerRef.value.clientWidth;
    // 计算每一个卡片的宽度
    state.cardWidth = (containerWidth - props.gap * (props.column - 1)) / props.column;
    // 获取卡片列表
    getCardList(state.page, props.pageSize);
    resizeObserver.observe(containerRef.value);
  }
};

const getCardList = async (page: number, pageSize: number) => {
  const data = await props.request(page, pageSize);
  state.cardList = state.cardList.concat(data);
  state.page++;

  if (!data.length) {
    state.isFinish = true;
    return;
  }
  state.loading = false;

  computedCardPos(data);
};

// 计算最小的卡片
const minColumn = computed(() => {
  let minIndex = -1
  let minHeight = Infinity

  state.columnHeight.forEach((height, index) => {
    if (height < minHeight) {
      minHeight = height
      minIndex = index
    }
  })

  return {
    minHeight,
    minIndex
  }
})

// 计算每一个卡片的位置
const computedCardPos = (list: ICardItem[]) => {
  list.forEach((item, index) => {
    const cardHeight = Math.floor((item.height * state.cardWidth) / item.width);
    if (index < props.column && state.cardList.length <= props.pageSize) {
      state.cardPos.push({
        width: state.cardWidth,
        height: cardHeight,
        x: index % props.column !== 0 ? index * (state.cardWidth + props.gap) : 0,
        y: 0,
      });
      state.columnHeight[index] = cardHeight + props.gap;
    } else {
      const { minIndex, minHeight } = minColumn.value;
      state.cardPos.push({
        width: state.cardWidth,
        height: cardHeight,
        x: minIndex % props.column !== 0 ? minIndex * (state.cardWidth + props.gap) : 0,
        y: minHeight,
      });
      state.columnHeight[minIndex] += cardHeight + props.gap;
    }
  });
};

// 监听滚动
const handleScroll = (e: Event) => {
  const { scrollTop, clientHeight, scrollHeight } = e.target as HTMLDivElement;
  if (scrollTop + clientHeight >= scrollHeight - props.bottom) {
    if (!state.isFinish && !state.loading) {
      state.loading = true;
      getCardList(state.page, props.pageSize);
    }
  }
}

// 监听屏幕变化
const resizeObserver = new ResizeObserver(() => {
  handleResize();
});

const handleResize = () => {
  if (containerRef.value) {
    const containerWidth = containerRef.value.clientWidth;
    state.cardWidth = (containerWidth - props.gap * (props.column - 1)) / props.column;
    console.log(state.cardWidth, 'state.cardWidth');
    state.cardPos = [];
    state.columnHeight = new Array(props.column).fill(0);
    computedCardPos(state.cardList);
  }
}



</script>
<style scoped lang='scss'>
.waterfall {
  &_container {
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 0;
    }
  }

  &_list {
    position: relative;
    width: 100%;
    height: 100%;

    &_item {
      position: absolute;
      left: 0;
      top: 0;
      box-sizing: border-box;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>