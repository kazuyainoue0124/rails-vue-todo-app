# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::Todos', type: :request do
  let(:request_header) { { 'Content-Type' => 'application/json' } }

  describe 'GET /index' do
    it 'HTTPステータスが成功になること' do
      get '/api/v1/todos'
      expect(response).to have_http_status(:success)
    end

    it 'Todoのリストを返すこと' do
      todo = Todo.create(title: 'Test Todo', done: false)
      get '/api/v1/todos'
      expect(response.body).to include(todo.title)
    end

    it 'Todoのリストを正しい順番で返すこと' do
      todo1 = Todo.create(title: 'Test Todo 1', done: false)
      todo2 = Todo.create(title: 'Test Todo 2', done: false)
      get '/api/v1/todos'
      expect(response.body.index(todo1.title)).to be < response.body.index(todo2.title)
    end

    it 'リクエストスキーマに準拠していること' do
      get '/api/v1/todos'
      assert_request_schema_confirm
    end

    it 'レスポンスコード200でレスポンススキーマに準拠していること' do
      get '/api/v1/todos'
      assert_response_schema_confirm(200)
    end
  end

  describe 'GET /show' do
    it 'HTTPステータスが成功になること' do
      todo = Todo.create(title: 'Test Todo', done: false)
      get "/api/v1/todos/#{todo.id}"
      expect(response).to have_http_status(:success)
    end

    it 'Todoを返すこと' do
      todo = Todo.create(title: 'Test Todo', done: false)
      get "/api/v1/todos/#{todo.id}"
      expect(response.body).to include(todo.title)
    end

    it '存在しないTodoに対して404を返すこと' do
      get '/api/v1/todos/999'
      expect(response).to have_http_status(:not_found)
    end

    it 'リクエストスキーマに準拠していること' do
      todo = Todo.create(title: 'Test Todo', done: false)
      get "/api/v1/todos/#{todo.id}"
      assert_request_schema_confirm
    end

    it 'レスポンスコード200でレスポンススキーマに準拠していること' do
      todo = Todo.create(title: 'Test Todo', done: false)
      get "/api/v1/todos/#{todo.id}"
      assert_response_schema_confirm(200)
    end

    it 'レスポンスコード404でレスポンススキーマに準拠していること' do
      get '/api/v1/todos/999'
      assert_response_schema_confirm(404)
    end
  end

  describe 'POST /create' do
    it 'HTTPステータスが成功になること' do
      post '/api/v1/todos', params: { todo: { title: 'Test Todo' } }.to_json, headers: request_header
      expect(response).to have_http_status(:success)
    end

    it '新しいTodoを作成すること' do
      post '/api/v1/todos', params: { todo: { title: 'Test Todo' } }.to_json, headers: request_header
      expect(Todo.last.title).to eq('Test Todo')
    end

    it 'リクエストスキーマに準拠していること' do
      post '/api/v1/todos', params: { todo: { title: 'Test Todo' } }.to_json, headers: request_header
      assert_request_schema_confirm
    end

    it 'レスポンスコード200でレスポンススキーマに準拠していること' do
      post '/api/v1/todos', params: { todo: { title: 'Test Todo' } }.to_json, headers: request_header
      assert_response_schema_confirm(200)
    end

    it 'レスポンスコード422でレスポンススキーマに準拠していること' do
      post '/api/v1/todos', params: { todo: { title: '' } }.to_json, headers: request_header
      assert_response_schema_confirm(422)
    end
  end

  describe 'PUT /update' do
    it 'HTTPステータスが成功になること' do
      todo = Todo.create(title: 'Test Todo', done: false)
      put "/api/v1/todos/#{todo.id}", params: { todo: { title: 'Updated Todo' } }.to_json, headers: request_header
      expect(response).to have_http_status(:success)
    end

    it 'Todoを更新すること' do
      todo = Todo.create(title: 'Test Todo', done: false)
      put "/api/v1/todos/#{todo.id}", params: { todo: { title: 'Updated Todo' } }.to_json, headers: request_header
      expect(Todo.last.title).to eq('Updated Todo')
    end

    it '存在しないTodoに対して404を返すこと' do
      put '/api/v1/todos/999', params: { todo: { title: 'Updated Todo' } }.to_json, headers: request_header
      expect(response).to have_http_status(:not_found)
    end

    it 'リクエストスキーマに準拠していること' do
      todo = Todo.create(title: 'Test Todo', done: false)
      put "/api/v1/todos/#{todo.id}", params: { todo: { title: 'Updated Todo' } }.to_json, headers: request_header
      assert_request_schema_confirm
    end

    it 'レスポンスコード200でレスポンススキーマに準拠していること' do
      todo = Todo.create(title: 'Test Todo', done: false)
      put "/api/v1/todos/#{todo.id}", params: { todo: { title: 'Updated Todo' } }.to_json, headers: request_header
      assert_response_schema_confirm(200)
    end

    it 'レスポンスコード404でレスポンススキーマに準拠していること' do
      put '/api/v1/todos/999', params: { todo: { title: 'Updated Todo' } }.to_json, headers: request_header
      assert_response_schema_confirm(404)
    end

    it 'レスポンスコード422でレスポンススキーマに準拠していること' do
      todo = Todo.create(title: 'Test Todo', done: false)
      put "/api/v1/todos/#{todo.id}", params: { todo: { title: '' } }.to_json, headers: request_header
      assert_response_schema_confirm(422)
    end
  end

  describe 'DELETE /destroy' do
    it 'HTTPステータスが成功になること' do
      todo = Todo.create(title: 'Test Todo', done: false)
      delete "/api/v1/todos/#{todo.id}"
      expect(response).to have_http_status(:success)
    end

    it 'Todoを削除すること' do
      todo = Todo.create(title: 'Test Todo', done: false)
      delete "/api/v1/todos/#{todo.id}"
      expect(Todo.find_by(id: todo.id)).to be_nil
    end

    it '存在しないTodoに対して404を返すこと' do
      delete '/api/v1/todos/999'
      expect(response).to have_http_status(:not_found)
    end

    it 'リクエストスキーマに準拠していること' do
      todo = Todo.create(title: 'Test Todo', done: false)
      delete "/api/v1/todos/#{todo.id}"
      assert_request_schema_confirm
    end

    it 'レスポンスコード200でレスポンススキーマに準拠していること' do
      todo = Todo.create(title: 'Test Todo', done: false)
      delete "/api/v1/todos/#{todo.id}"
      assert_response_schema_confirm(200)
    end

    it 'レスポンスコード404でレスポンススキーマに準拠していること' do
      delete '/api/v1/todos/999'
      assert_response_schema_confirm(404)
    end
  end
end
