# # ---------- Angular Builder ----------
# FROM node:14.18.0 AS ng_builder

# # RUN mkdir -p /app

# WORKDIR /app

# COPY ./client ./

# RUN npm install

# RUN npm run build --prod

# # ---------- Rails Builder ----------

# FROM ruby:3.0.0

# RUN mkdir -p /app
# WORKDIR /app

# # RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
# RUN apt-get update && apt-get install -y nodejs postgresql-client sqlite3 vim --no-install-recommends && rm -rf /var/lib/apt/lists/*

#  ENV SECRET_KEY_BASE 242bbc9f2777267603c768fb11127611470e481214b511d47d0815b5465d4861994266822d7a5cc0d58171f600c4bd44f7beb14e82826c03b084168e3dccb3a7
# #  ENV DATABASE_URL postgres://txywejtsjgwbco:ce75168abe4911d0918c7d5e1ea3e58dcacaaadbc49bd8513a824a75d623e4cb@ec2-23-23-133-10.compute-1.amazonaws.com:5432/d6pmt2843hphe4
#  ENV RAILS_ENV production
#  ENV RAILS_SERVE_STATIC_FILES true
#  ENV RAILS_LOG_TO_STDOUT true

# COPY server/Gemfile /app/Gemfile
# COPY server/Gemfile.lock /app/Gemfile.lock

# RUN bundle install --without development test

# COPY ./server /app

# COPY --from=ng_builder /app/dist/client ./web

# # FROM ruby:3.0.0 as base
# # # RUN apt-get update -qq && apt-get install -y nodejs postgresql-client
# # WORKDIR /ngapp

# # FROM base as builder

# # COPY server/ ./

# # RUN bundle install



# # # ---------- Relase ----------
# # FROM base AS release
# # WORKDIR /ngapp
# # COPY --from=builder /ngapp/ ./ngapp
# # # COPY --from=builder /app/dist ./
# # COPY --from=ng_builder /app/dist/client ./web

# RUN rails db:migrate

# # EXPOSE 5000

# # Precompile Rails assets
# RUN bundle exec rake assets:precompile
# # Start puma
# CMD bundle exec puma -C config/puma.rb
# # CMD ["rails", "server", "-b", "0.0.0.0"]


FROM ruby:3.0.0

# Install node & yarn
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y nodejs
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install -y yarn

# Install base deps or additional (e.g. tesseract)
ARG INSTALL_DEPENDENCIES
RUN apt-get update -qq \
  && apt-get install -y --no-install-recommends ${INSTALL_DEPENDENCIES} \
    build-essential libpq-dev git \
  && apt-get clean autoclean \
  && apt-get autoremove -y \
  && rm -rf \
    /var/lib/apt \
    /var/lib/dpkg \
    /var/lib/cache \
    /var/lib/log

# Install deps with bundler
RUN mkdir /app
WORKDIR /app
COPY server/Gemfile* /app/
ARG BUNDLE_INSTALL_ARGS
RUN gem install bundler:2.1.4
RUN bundle config set without 'development test'
RUN bundle install ${BUNDLE_INSTALL_ARGS} \
  && rm -rf /usr/local/bundle/cache/* \
  && find /usr/local/bundle/gems/ -name "*.c" -delete \
  && find /usr/local/bundle/gems/ -name "*.o" -delete
COPY server/ /app/

RUN mkdir -p tmp/pids
# Compile assets
ARG RAILS_ENV=development

RUN if [ "$RAILS_ENV" = "production" ]; then SECRET_KEY_BASE=$(rake secret) bundle exec rake assets:precompile; fi

