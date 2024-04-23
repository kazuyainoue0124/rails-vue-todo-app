<script setup lang="ts">
import BaseSection from '@/components/BaseSection.vue';
import { onMounted, ref, reactive } from 'vue';
import { useTodo } from '@/composables/useTodo';
import { useRoute } from 'vue-router';

const { todo, getTodo } = useTodo();
const route = useRoute();

const title = ref('');
const description = ref('');

onMounted(async () => {
  await getTodo(Number(route.params.id));
  if (todo.value) {
    title.value = todo.value.title;
    description.value = todo.value.description;
  }
});

const rules = reactive({
  required: (value: string) => !!value || 'タイトルは必須です'
});

const updateTodo = () => {
  console.log('更新に成功しました。');
};
</script>

<template>
  <BaseSection title="Edit Todo">
    <v-text-field variant="outlined" v-model="title" label="タイトル" :rules="[rules.required]" />
    <v-textarea variant="outlined" v-model="description" label="詳細" />
    <v-col class="text-center">
      <v-btn type="submit" color="primary" size="large" @click="updateTodo">更新</v-btn>
    </v-col>
  </BaseSection>
</template>
