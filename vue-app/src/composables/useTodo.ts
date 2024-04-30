import { ref } from 'vue';
import { TodoApi } from '@/openapi/api';
import type { PostRequestTodo, PutRequestTodo, Todo } from '@/openapi/api';

const useTodo = () => {
  const todoApi = new TodoApi();

  // TODOを全て取得する
  const todos = ref<Todo[] | []>([]);
  const getTodos = async () => {
    try {
      const response = await todoApi.apiV1GetTodos();
      todos.value = response.data.todos;
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    }
  };

  // TODOを１件取得する
  const todo = ref<Todo | null>(null);
  const getTodo = async (id: number) => {
    try {
      const response = await todoApi.apiV1GetTodoById(id);
      todo.value = response.data.todo;
    } catch (error) {
      console.error('Failed to fetch todo:', error);
    }
  };

  // TODOを追加する
  const addTodo = async (title: string, description: string) => {
    try {
      const postRequestTodo: PostRequestTodo = {
        todo: {
          title,
          description
        }
      };
      const response = await todoApi.apiV1PostTodos(postRequestTodo);
      return { success: true, message: 'TODOを追加しました', data: response.data };
    } catch (error) {
      return { success: false, message: 'TODOの追加に失敗しました' };
    }
  };

  // TODOを更新する
  const updateTodo = async (id: number, title: string, description: string) => {
    try {
      const putRequestTodo: PutRequestTodo = {
        todo: {
          id,
          title,
          description
        }
      };
      const response = await todoApi.apiV1PutTodos(id, putRequestTodo);
      return { success: true, message: 'TODOを更新しました', data: response.data };
    } catch (error) {
      return { success: false, message: 'TODOの更新に失敗しました' };
    }
  };

  // TODOを削除する
  const deleteTodo = async (id: number) => {
    try {
      const response = await todoApi.apiV1DeleteTodoById(id);
      return { success: true, message: 'TODOを削除しました', data: response.data };
    } catch (error) {
      return { success: false, message: 'TODOの削除に失敗しました' };
    }
  };

  return {
    todos,
    getTodos,
    todo,
    getTodo,
    addTodo,
    updateTodo,
    deleteTodo
  };
};

export { useTodo };
