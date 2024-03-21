require 'rails_helper'

RSpec.describe "Api::V1::Todos", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get "/api/v1/todos"
      expect(response).to have_http_status(:success)
    end

    it "returns a list of todos" do
      todo = Todo.create(title: "Test Todo", done: false)
      get "/api/v1/todos"
      expect(response).to have_http_status(:success)
      expect(response.body).to include(todo.title)
    end

    it "returns a list of todos in the correct order" do
      todo1 = Todo.create(title: "Test Todo 1", done: false)
      todo2 = Todo.create(title: "Test Todo 2", done: false)
      get "/api/v1/todos"
      expect(response).to have_http_status(:success)
      expect(response.body).to include(todo1.title)
      expect(response.body).to include(todo2.title)
      expect(response.body.index(todo1.title)).to be < response.body.index(todo2.title)
    end
  end
end
