<script setup lang="ts">
import BaseSection from '@/components/BaseSection.vue';
import { ref } from 'vue';
import { reactive } from 'vue';
import useTodo from '@/composables/useTodo';

const { addTodo } = useTodo();

const title = ref('');
const description = ref('');

const rules = reactive({
  required: (value: string) => !!value || 'タイトルは必須です'
});

const handleAddTodo = async () => {
  const success = await addTodo(title.value, description.value);
  if (success) {
    title.value = '';
    description.value = '';
  }
};
</script>

<template>
  <BaseSection title="Add Todo">
    <v-text-field variant="outlined" v-model="title" label="タイトル" :rules="[rules.required]" />
    <v-textarea variant="outlined" v-model="description" label="詳細" />
    <v-col class="text-center">
      <v-btn type="submit" color="primary" size="large" @click="handleAddTodo">作成</v-btn>
    </v-col>
    <v-col class="text-center">
      <v-btn type="submit" color="white" size="large" to="/">戻る</v-btn>
    </v-col>
  </BaseSection>
</template>
