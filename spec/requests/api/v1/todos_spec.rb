# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::Todos', type: :request do
  let(:request_header) { { 'Content-Type' => 'application/json' } }

  describe 'GET /index' do
    it 'returns http success' do
      get '/api/v1/todos'
      expect(response).to have_http_status(:success)
    end

    it 'returns a list of todos' do
      todo = Todo.create(title: 'Test Todo', done: false)
      get '/api/v1/todos'
      expect(response.body).to include(todo.title)
    end

    it 'returns a list of todos in the correct order' do
      todo1 = Todo.create(title: 'Test Todo 1', done: false)
      todo2 = Todo.create(title: 'Test Todo 2', done: false)
      get '/api/v1/todos'
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

  describe 'POST /create' do
    it 'returns http success' do
      post '/api/v1/todos', params: { todo: { title: 'Test Todo' } }.to_json, headers: request_header
      expect(response).to have_http_status(:success)
    end

    it 'creates a new todo' do
      post '/api/v1/todos', params: { todo: { title: 'Test Todo' } }.to_json, headers: request_header
      expect(Todo.last.title).to eq('Test Todo')
    end

    it 'conforms to request schema' do
      post '/api/v1/todos', params: { todo: { title: 'Test Todo' } }.to_json, headers: request_header
      assert_request_schema_confirm
    end

    it 'conforms to response schema with 200 response code' do
      post '/api/v1/todos', params: { todo: { title: 'Test Todo' } }.to_json, headers: request_header
      assert_response_schema_confirm(200)
    end

    it 'conforms to response schema with 422 response code' do
      post '/api/v1/todos', params: { todo: { title: '' } }.to_json, headers: request_header
      assert_response_schema_confirm(422)
    end
  end
end
