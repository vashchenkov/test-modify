<template>
  <v-dialog
    max-width="600"
  >
    <v-card
      prepend-icon="mdi-account"
      :title="props.vaultId==null?'Создание сейфа':'Редактирование сейфа'"
    >
      <v-card-text>
        <v-row dense>
          <v-col
            cols="12"
            md="12"
            sm="12"
          >
            {{props.vaultName}} /
            {{data.vaultName}}
            <v-text-field
              v-model="data.vaultName"
              label="Название сейфа*"
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <small class="text-caption text-medium-emphasis">*Обязательное поле</small>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          text="Отменить"
          variant="plain"
          @click="cancel"
        ></v-btn>

        <v-btn
          color="primary"
          text="Сохранить"
          variant="tonal"
          @click="save"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script setup>
import {onBeforeUnmount, onMounted, ref, reactive, watchEffect} from "vue";
import {useVaultStore} from "@/stores/vault.js";
import {VaultsEvents} from "@/events/VaultEvents.js";
import {useEmitter} from "@/emitter.js";
const emit = defineEmits(['close'])

const props = defineProps({
  vaultName:  String,
  vaultId: String
})
const store = useVaultStore()
const emitter = useEmitter()
const data = reactive({ ...props })

function cancel() {
  emit('close')
}

function save() {
  if ( (props.vaultId == null) || (props.vaultId.length === 0) ) {
    store.createVault(data.vaultName)
  } else {
    store.updateVault(props.vaultId, data.vaultName)
  }
}
onMounted(() => {
  emitter.on(VaultsEvents.vaultSaved, () => {
    cancel()
  })
})
onBeforeUnmount(() => {
  emitter.off(VaultsEvents.vaultSaved)
})
</script>

<style scoped lang="sass">

</style>
