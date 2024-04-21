<script setup lang="ts">
import BaseSection from '@/components/BaseSection.vue';
import { onMounted, ref } from 'vue';
import { useTodo } from '@/composables/useTodo';
import { useMessageStore } from '@/stores/message';

const { todos, getTodos } = useTodo();

const messageStore = useMessageStore();
const message = ref('');

onMounted(async () => {
  await getTodos();

  message.value = messageStore.flashMessage;
  if (message.value) {
    messageStore.clearMessage(); // メッセージを削除
  }
});

const handleDelete = (id: number, title: string) => {
  console.log(`${title} を削除しました。`);
};
</script>

<template>
  <v-alert v-if="message" type="success" closable>{{ message }}</v-alert>
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
