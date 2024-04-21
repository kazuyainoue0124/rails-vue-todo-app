import axios from 'axios';


const useTodo = () => {
  // Vite の環境変数を読み込む
  const API_URL = import.meta.env.VITE_API_URL;

  const addTodo = async (title: string, description: string) => {
    try {
      await axios.post(`${API_URL}/api/v1/todos`, { title, description });
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