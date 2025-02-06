<template>

  <v-btn
    density="compact"
    icon="mdi-plus"
    @click="dialog = true"
  />
  <EditVault
    v-if="dialog"
    v-model="dialog"
    vault-name=""
    @close="dialog = false"
  />
</template>
<script setup>
  import {ref} from "vue";
  import EditVault from "@/components/EditVault.vue";
  const dialog = ref(false)
</script>

<style scoped lang="sass">

</style>
