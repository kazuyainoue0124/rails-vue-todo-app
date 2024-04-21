<script setup lang="ts">
import BaseSection from '@/components/BaseSection.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTodo } from '@/composables/useTodo';
import { useValidation } from '@/composables/useValidation';

const router = useRouter();
const { rules } = useValidation();
const { addTodo } = useTodo();

const title = ref('');
const description = ref('');

const handleAddTodo = async () => {
  const result = await addTodo(title.value, description.value);
  if (result.success) {
    router.push({ name: 'home', query: { message: result.message } });
  } else {
    alert(result.message);
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
