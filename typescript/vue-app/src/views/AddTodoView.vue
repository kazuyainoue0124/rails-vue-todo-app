<script setup lang="ts">
import { ref } from 'vue';
import { reactive } from 'vue';

const title = ref('');
const description = ref('');

const rules = reactive({
  required: (value: string) => !!value || 'タイトルは必須です'
});

const addTodo = () => {
  console.log(title.value);
};
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="6">
        <p class="text-h5 text-center">TODOの作成</p>
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
        <v-btn type="submit" color="primary" size="large" @click="addTodo">作成</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
