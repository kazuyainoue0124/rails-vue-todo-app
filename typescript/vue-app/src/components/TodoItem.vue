<script setup lang="ts">
import { ref } from 'vue';

export type Props = {
  todo: string,
  index: number,
  onUpdateTodo: (value: string) => Promise<void>,
  onDeleteTodo: () => Promise<void>,
}

const props = defineProps<Props>();

const editing = ref(false);
const editedTodo = ref(props.todo);

const handleSave = () => {
  props.onUpdateTodo(editedTodo.value);
  editing.value = false;
}

const handleCancel = () => {
  editedTodo.value = props.todo;
  editing.value = false;
}
</script>

<template>
  <v-list-item>
    <v-list-item-content>
      <v-text-field v-if="editing" v-model="editedTodo" @keyup.enter="handleSave" @blur="handleCancel"></v-text-field>
      <v-list-item-title v-else @click="editing = true">{{ todo }}</v-list-item-title>
    </v-list-item-content>
    <v-list-item-action>
      <v-btn icon @click="onDeleteTodo">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>
