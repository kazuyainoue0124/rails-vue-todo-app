<script setup lang="ts">
import BaseSection from '@/components/BaseSection.vue';
import { ref } from 'vue';
import { reactive } from 'vue';
import axios from "axios";

const title = ref('');
const description = ref('');

const rules = reactive({
  required: (value: string) => !!value || 'タイトルは必須です'
});

const addTodo = async () => {
  await axios.post('http://localhost:3000/api/v1/todos', {
    title: title.value,
    description: description.value
  }).then(() => {
    title.value = '';
    description.value = '';
    alert('Todoを追加しました');
  }).catch(() => {
    alert('Todoの追加に失敗しました');
  });
};
</script>

<template>
  <BaseSection title="Add Todo">
    <v-text-field variant="outlined" v-model="title" label="タイトル" :rules="[rules.required]" />
    <v-textarea variant="outlined" v-model="description" label="詳細" />
    <v-col class="text-center">
      <v-btn type="submit" color="primary" size="large" @click="addTodo">作成</v-btn>
    </v-col>
    <v-col class="text-center">
      <v-btn type="submit" color="white" size="large" to="/">戻る</v-btn>
    </v-col>
  </BaseSection>
</template>
