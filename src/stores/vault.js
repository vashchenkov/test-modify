// Utilities
import {defineStore} from 'pinia'
import {inject, ref} from 'vue'
import vaultApi from "@/api/vault-api.js";
import {VaultsEvents} from "@/events/VaultEvents.js";

export const useVaultStore = defineStore('vault', () => {
  const emitter = inject('$emitter')
  const vaults = ref([])
  const currentVault = ref(null)
  const secrets = ref([])

  function clearVaults() {
    vaults.value = []
    setCurrentVault(null)
    emitter.emit(VaultsEvents.vaultsListCleared)
  }

  function reloadVaults() {
    vaultApi.loadAllVaults((resp) => {
      vaults.value = resp;
    })
  }

  function createVault(vaultName) {
    vaultApi.createVault({"vaultName": vaultName}, () => {
      emitter.emit(VaultsEvents.vaultSaved)
      reloadVaults()
    })
  }

  function reloadSecrets() {
    vaultApi.loadSecretsForVault({id: currentVault.value.id}, (list) => {
      secrets.value = list
    })
  }

  function setCurrentVault(vault) {
    currentVault.value = vault;
    secrets.value = [];
    if (vault !== null) {
      reloadSecrets()
    }
  }

  function createSecret(name, userName, secret, description) {

    const secretRequest = {
      vault: currentVault.value.id,
      name: name,
      userName: userName,
      secret: secret,
      description: description
    }
    vaultApi.createSecret(
      secretRequest, () => {
        emitter.emit(VaultsEvents.secretSaved)
        reloadSecrets()
      }
    )
  }

  function getValueForSecret(id) {
    const request = { id: id}
    vaultApi.getSecretValue(request, (result) => {
      emitter.emit(VaultsEvents.secretValueReceived, result)
    })
  }

  function deleteSecret(secretId) {
    const request = { id: secretId}
    vaultApi.deleteSecret(request, (result) => {
      if (result) {
        reloadSecrets()
      }
    })
  }

  function deleteVault(vaultId) {
    const request = { id: vaultId}
    vaultApi.deleteVault(request, (result) => {
      if (result) {
        reloadVaults()
      }
    })
  }

  function updateVault(vaultId, vaultName) {
    const request = {
      id: vaultId,
      vaultName: vaultName
    }
    vaultApi.updateVault(request, (result) => {
      if (result) {
        reloadVaults()
        emitter.emit(VaultsEvents.vaultSaved)
      }
    })
  }

  return {
    // getters
    vaults,
    secrets,
    currentVault,
    // actions
    clearVaults,
    createVault,
    loadVaults: reloadVaults,
    setCurrentVault,
    createSecret,
    getValueForSecret,
    deleteSecret,
    deleteVault,
    updateVault
  }
})
