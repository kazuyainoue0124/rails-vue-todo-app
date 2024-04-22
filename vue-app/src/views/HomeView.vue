<script setup lang="ts">
import BaseSection from '@/components/BaseSection.vue';
import { onMounted, ref } from 'vue';
import { useTodo } from '@/composables/useTodo';
import { useMessageStore } from '@/stores/message';

const { todos, getTodos, deleteTodo } = useTodo();

const messageStore = useMessageStore();
const message = ref('');

onMounted(async () => {
  await getTodos();

  message.value = messageStore.flashMessage;
  if (message.value) {
    messageStore.clearMessage(); // メッセージを削除
  }
});

const deleteTodoId = ref<number | null>(null);
const deleteTodoTitle = ref<string | null>(null);
const isOpenDeleteModal = ref(false);

const openDeleteModal = (id: number, title: string) => {
  deleteTodoId.value = id;
  deleteTodoTitle.value = title;
  isOpenDeleteModal.value = true;
};
const handleDeleteTodo = async () => {
  const result = await deleteTodo(deleteTodoId.value!);
  if (result.success) {
    messageStore.setMessage(result.message);
    await getTodos(); // TODOリストを更新
    message.value = messageStore.flashMessage; 
  } else {
    message.value = result.message;
  }
  isOpenDeleteModal.value = false;
};

const cancel = () => {
  isOpenDeleteModal.value = false
}
</script>

<template>
  <v-alert v-if="message" type="success" closable>{{ message }}</v-alert>
  <BaseSection title="Todo List">
    <v-col class="text-center">
      <v-btn color="primary" size="large" to="/todos/new">TODOを追加</v-btn>
    </v-col>
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
            <v-icon @click="openDeleteModal(todo.id, todo.title)">mdi-delete</v-icon>
          </v-list-item-action>
        </template>
      </v-list-item>
    </v-list>
  </BaseSection>

  <v-dialog v-model="isOpenDeleteModal" max-width="600">
    <v-card>
      <v-card-title class="headline">{{ deleteTodoTitle }}</v-card-title>
      <v-card-text>
        {{ `${deleteTodoTitle}を削除しますか？` }}
      </v-card-text>
      <v-card-actions>
        <v-btn @click="cancel">キャンセル</v-btn>
        <v-btn color="primary" @click="handleDeleteTodo">削除</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
