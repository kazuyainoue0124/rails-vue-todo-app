import axios from 'axios';
import { ref } from 'vue';

export type Todo = {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  done: boolean;
};

const useTodo = () => {
  // Vite の環境変数を読み込む
  const API_URL = import.meta.env.VITE_API_URL;

  // TODOを全て取得する
  const todos = ref<Todo[]>([]);
  const getTodos = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/todos`);
      todos.value = response.data.todos;
    } catch (error) {
      console.error(error);
    }
  };

  // TODOを追加する
  const addTodo = async (title: string, description: string) => {
    try {
      await axios.post(`${API_URL}/api/v1/todos`, { title, description });
      return { success: true, message: 'TODOを追加しました' };
    } catch (error) {
      return { success: false, message: 'TODOの追加に失敗しました' };
    }
  };

  // TODOを削除する
  const deleteTodo = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/api/v1/todos/${id}`);
      return { success: true, message: 'TODOを削除しました' };
    } catch (error) {
      return { success: false, message: 'TODOの削除に失敗しました' };
    }
  };

  return {
    todos,
    getTodos,
    addTodo,
    deleteTodo
  };
};

export { useTodo };
