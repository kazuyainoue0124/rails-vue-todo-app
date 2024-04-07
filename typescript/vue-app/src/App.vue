<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title> TODOアプリ </v-app-bar-title>
    </v-app-bar>
    <v-main>
      <RouterView />
    </v-main>
    <v-footer color="primary" app> 2024 (c) K.INOUE </v-footer>
  </v-app>
</template>
