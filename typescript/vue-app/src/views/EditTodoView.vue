<script setup lang="ts">
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
  <v-container>
    <v-row justify="center">
      <v-col cols="6">
        <p class="text-h5 text-center">TODOの編集</p>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="6">
        <v-text-field v-model="title" label="タイトル" :rules="[rules.required]" />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="6">
        <v-textarea v-model="description" label="詳細" />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="6" class="text-center">
        <v-btn type="submit" color="primary" size="large" @click="updateTodo">更新</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
