import { defineStore } from 'pinia';
import { ref } from 'vue';

/**
 * メッセージを表示するためのストア
 */
export const useMessageStore = defineStore('message', () => {
  const flashMessage = ref<string>('');

  const setMessage = (message: string) => {
    flashMessage.value = message;
  };

  const clearMessage = () => {
    flashMessage.value = '';
  };


  return {
    flashMessage,
    setMessage,
    clearMessage,
  };
});
