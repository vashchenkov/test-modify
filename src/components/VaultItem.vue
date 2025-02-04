<template>
  <div
    class="vault-item"
    ref="compRef"
  >
    <v-btn
      class="vault-btn"
      :text="props.vaultName"
      @click="() => emit('selectVault')"
    />
    <v-menu>
      <template
        #activator="{ props }">
        <v-btn
          density="compact"
          icon="mdi-dots-vertical"
          v-bind="props"
        />
      </template>

      <v-list>
        <v-list-item>
          <v-btn
            density="compact"
            class="vault-action delete-action"
            icon="mdi-delete-empty"
            @click="() => emit('deleteVault')"
          />
          <v-btn
            density="compact"
            class="vault-action"
            icon="mdi-pencil"
            @click="() => emit('edit-vault')"
          />
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup>
import {ref} from "vue";

const props = defineProps({
  vaultName: String
})

const emit = defineEmits(['selectVault', 'deleteVault', 'edit-vault'])
const compRef = ref()
</script>

<style scoped lang="sass">

.vault-item
  width: 100%
  display: flex
  flex-wrap: nowrap
  justify-content: flex-start

.vault-action
  color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity))
  display: block

  &:hover
    color: rgba(25, 118, 210, 1)

.vault-action.delete-action
  &:hover
    color: rgba(210, 125, 125, 1)


.vault-btn
  flex-shrink: 1
  flex-grow: 1
  text-wrap: pretty

.vault-actions
  display: none

.vault-item .vault-actions_shown
  display: flow
  position: absolute
  top: 15px
  width: 100%
  height: 50px
  border: 1px solid red
</style>
