import axios from 'axios';

export default function useTodo() {
  const addTodo = async (title: string, description: string) => {
    try {
      await axios.post('http://localhost:3000/api/v1/todos', { title, description });
      alert('Todoを追加しました');
      return true;
    } catch (error) {
      alert('Todoの追加に失敗しました');
      return false;
    }
  };

  return {
    addTodo,
  };
}
