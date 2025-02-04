<template>
  <v-layout class="rounded rounded-md">
    <AuthenticatedHeader />

    <v-navigation-drawer>
      <VaultsList />
      <AddVault />
    </v-navigation-drawer>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      <slot></slot>
    </v-main>
    <AppFooter />
  </v-layout>
</template>

<script setup>
import {ref} from "vue";
import AuthenticatedHeader from "@/components/AuthenticatedHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import VaultsList from "@/components/VaultsList.vue";
import AddVault from "@/components/AddVault.vue";
const name=ref("defaultLayout")
</script>
