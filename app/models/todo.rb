class Todo < ApplicationRecord
  validates :title,      presence: true
  validates :description
  validates :done,       inclusion: { in: [true, false] }
end
