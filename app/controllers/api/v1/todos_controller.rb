# frozen_string_literal: true

class Api::V1::TodosController < ApplicationController
  def index
    @todos = Todo.all.order(:id)
    render json: { todos: @todos }
  end

  def show
    @todo = Todo.find(params[:id])
    render json: { todo: @todo }
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Todo not found' }, status: :not_found
  end

  def create
    @todo = Todo.new(todo_params)
    if @todo.save
      render json: { todo: @todo }
    else
      render json: { error: @todo.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def todo_params
    params.require(:todo).permit(:id, :title, :description)
  end
end
