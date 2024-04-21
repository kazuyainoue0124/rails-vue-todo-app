import axios from 'axios';

const useTodo = () => {
  const addTodo = async (title: string, description: string) => {
    try {
      await axios.post('http://localhost:3000/api/v1/todos', { title, description });
      return { success: true, message: 'TODOを追加しました' };
    } catch (error) {
      return { success: false, message: 'TODOの追加に失敗しました' };
    }
  };

  return {
    addTodo,
  };
}

export { useTodo }