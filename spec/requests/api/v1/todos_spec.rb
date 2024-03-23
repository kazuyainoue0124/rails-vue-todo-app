require 'rails_helper'

RSpec.describe 'Api::V1::Todos', type: :request do
  describe 'GET /index' do
    it 'returns http success' do
      get '/api/v1/todos'
      expect(response).to have_http_status(:success)
    end

    it 'returns a list of todos' do
      todo = Todo.create(title: 'Test Todo', done: false)
      get '/api/v1/todos'
      expect(response).to have_http_status(:success)
      expect(response.body).to include(todo.title)
    end

    it 'returns a list of todos in the correct order' do
      todo1 = Todo.create(title: 'Test Todo 1', done: false)
      todo2 = Todo.create(title: 'Test Todo 2', done: false)
      get '/api/v1/todos'
      expect(response).to have_http_status(:success)
      expect(response.body).to include(todo1.title)
      expect(response.body).to include(todo2.title)
      expect(response.body.index(todo1.title)).to be < response.body.index(todo2.title)
    end

    it 'conforms to request schema' do
      get '/api/v1/todos'
      assert_request_schema_confirm
    end

    it 'conforms to response schema with 200 response code' do
      get '/api/v1/todos'
      assert_response_schema_confirm(200)
    end
  end
end
