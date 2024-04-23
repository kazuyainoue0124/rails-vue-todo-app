<script setup lang="ts">
import BaseSection from '@/components/BaseSection.vue';
import { onMounted, ref } from 'vue';
import { useTodo } from '@/composables/useTodo';
import { useRoute } from 'vue-router';
import { useValidation } from '@/composables/useValidation';

const { todo, getTodo } = useTodo();
const route = useRoute();

const { rules } = useValidation();

const title = ref('');
const description = ref('');

onMounted(async () => {
  await getTodo(Number(route.params.id));
  if (todo.value) {
    title.value = todo.value.title;
    description.value = todo.value.description;
  }
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
    <v-col class="text-center">
      <v-btn type="submit" color="white" size="large" to="/">戻る</v-btn>
    </v-col>
  </BaseSection>
</template>
