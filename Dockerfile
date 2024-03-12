FROM ruby:3.2.2

WORKDIR /todo-app
COPY Gemfile /todo-app/Gemfile
COPY Gemfile.lock /todo-app/Gemfile.lock
RUN bundle install

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]
