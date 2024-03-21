class Api::V1::TodosController < ApplicationController
  def index
    @todos = Todo.all.order(:id)
    render json: @todos
  end
end
