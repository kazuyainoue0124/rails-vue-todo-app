import { reactive } from 'vue';

const useValidation = () => {
  const rules = reactive({
    required: (value: string) => !!value || 'タイトルは必須です'
  });

  return {
    rules
  };
};

export { useValidation };
