<script setup lang="ts">
import BaseSection from '@/components/BaseSection.vue';
import { ref } from 'vue';
import { reactive } from 'vue';

export type Props = {
  id: number;
  title: string;
  description: string;
};

const props = defineProps<Props>();

const title = ref(props.title);
const description = ref(props.description);

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
