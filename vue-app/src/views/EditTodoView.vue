<script setup lang="ts">
import BaseSection from '@/components/BaseSection.vue';
import { onMounted, ref } from 'vue';
import { useTodo } from '@/composables/useTodo';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { useValidation } from '@/composables/useValidation';
import { useMessageStore } from '@/stores/message';

const { todo, getTodo, updateTodo } = useTodo();
const route = useRoute();
const router = useRouter();

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

const message = ref('');
const messageStore = useMessageStore();

const handleUpdateTodo = async () => {
  if (rules.required(title.value.trim()) !== true) {
    return;
  }

  const result = await updateTodo(Number(route.params.id), title.value, description.value);
  if (result.success) {
    messageStore.setMessage(result.message);
    router.push({ name: 'home' });
  } else {
    message.value = result.message;
  }
};
</script>

<template>
  <v-alert v-if="message" type="error" closable>{{ message }}</v-alert>
  <BaseSection title="Edit Todo">
    <v-text-field variant="outlined" v-model="title" label="タイトル" :rules="[rules.required]" />
    <v-textarea variant="outlined" v-model="description" label="詳細" />
    <v-col class="text-center">
      <v-btn type="submit" color="primary" size="large" @click="handleUpdateTodo">更新</v-btn>
    </v-col>
    <v-col class="text-center">
      <v-btn type="submit" color="white" size="large" to="/">戻る</v-btn>
    </v-col>
  </BaseSection>
</template>
