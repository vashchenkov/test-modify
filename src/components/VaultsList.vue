<template>
  <v-list>
    <v-list-item title="Ваши сейфы"/>
    <v-list-item
      v-for="vault in store.vaults"
      :key="vault.id"
    >
      <VaultItem
        :vault-name="vault.name"
        @delete-vault="deleteVault(vault.id)"
        @select-vault="selectVault(vault)"
        @edit-vault="editVault(vault)"
      />
    </v-list-item>
  </v-list>
  <EditVault
    v-if="showEditDialog"
    v-model="showEditDialog"
    :vault-name="theName"
    :vault-id="theId"
    @close="showEditDialog = false"
  />
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useVaultStore} from "@/stores/vault.js"
import VaultItem from "@/components/VaultItem.vue";
import EditVault from "@/components/EditVault.vue";
const store = useVaultStore()
const showEditDialog = ref(false)
const theName = ref('')
const theId = ref('')

onMounted(() => {
  store.clearVaults()
  store.loadVaults()
})

function selectVault(vault) {
  store.setCurrentVault(vault)
}
function deleteVault(vaultId) {
  store.deleteVault(vaultId)
}
function editVault(vault) {
  theName.value = vault.name
  theId.value = vault.id
  showEditDialog.value = true
}
</script>

<style scoped lang="sass">

</style>
