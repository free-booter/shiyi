<template>
  <div>
    <object :data="svg" type="image/svg+xml"></object>
  </div>
</template>

<script setup lang="ts">
import { fetchSvg } from '@/service/svg';
const svg = ref<string>('')
const handleSvg = () => {
  fetchSvg().then((res) => {
    svg.value = res
  });
}
handleSvg()

</script>
<style scoped lang="scss"></style>