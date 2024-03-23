# frozen_string_literal: true

FactoryBot.define do
  factory :todo do
    title { 'MyString' }
    description { 'MyText' }
    done { false }
  end
end
