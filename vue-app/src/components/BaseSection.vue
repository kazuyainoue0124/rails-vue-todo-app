<script setup lang="ts">
export type Props = {
  title: string;
};

defineProps<Props>();
</script>

<template>
  <v-container class="mt-12">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <h1 class="text-center">{{ title }}</h1>
        <v-card class="pa-10">
          <slot />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
