<script setup lang="ts">
import { ref } from 'vue';

export type Props = {
  onAddTodo: (value: string) => Promise<void>
}
const props = defineProps<Props>()

const newTodo = ref('');

const handleSubmit = () => {
  if (newTodo.value.trim()) {
    props.onAddTodo(newTodo.value.trim());
    newTodo.value = '';
  }
}
</script>

<template>
  <v-form @submit.prevent="handleSubmit">
    <v-text-field v-model="newTodo" label="New Todo" required></v-text-field>
    <v-btn type="submit" color="primary">Add</v-btn>
  </v-form>
</template>
