<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import router from "@/router/index.js";

const layout = ref("defaultLayout")

function defineLayout(route) {
  const lt = route?.meta?.layout;
  if (lt) {
    layout.value = lt + 'Layout';
  } else {
    layout.value = "defaultLayout";
  }
}

watch(
  () => router.currentRoute.value, (route) => {
    defineLayout(route);
  })

onMounted(() => defineLayout(router.currentRoute.value))

</script>

<style scoped lang="sass">
</style>
