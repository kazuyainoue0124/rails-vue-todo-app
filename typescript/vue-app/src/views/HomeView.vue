<script setup lang="ts">
import BaseSection from '@/components/BaseSection.vue';
import { ref } from 'vue';

const todos = ref([
  { id: 1, title: 'TODO 1', description: 'TODO 1 の詳細' },
  { id: 2, title: 'TODO 2', description: 'TODO 2 の詳細' },
  { id: 3, title: 'TODO 3', description: 'TODO 3 の詳細' }
]);

const handleDelete = (id: number, title: string) => {
  console.log(`${title} を削除しました。`);
};
</script>

<template>
  <BaseSection title="Todo List">
    <v-list>
      <v-list-item
        class="mb-6"
        border
        height="60"
        lines="two"
        rounded
        v-for="todo in todos"
        :key="todo.id"
      >
        <v-list-item-title>
          {{ todo.title }}
        </v-list-item-title>
        <template v-slot:append>
          <v-list-item-action>
            <v-icon @click="handleDelete(todo.id, todo.title)">mdi-delete</v-icon>
          </v-list-item-action>
        </template>
      </v-list-item>
      <v-col class="text-center">
        <v-btn type="submit" color="primary" size="large" to="/todos/new">TODOを追加</v-btn>
      </v-col>
    </v-list>
  </BaseSection>
</template>
