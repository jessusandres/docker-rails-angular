# ---------- Angular Builder ----------
FROM node:14.18.0 AS ng_builder

# RUN mkdir -p /app

WORKDIR /app

copy ./client ./

RUN npm install

RUN npm run build --prod

# ---------- Rails Builder ----------

FROM ruby:3.0.0

RUN mkdir -p /app
WORKDIR /app

# RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN apt-get update && apt-get install -y nodejs postgresql-client sqlite3 vim --no-install-recommends && rm -rf /var/lib/apt/lists/*

ENV SECRET_KEY_BASE 242bbc9f2777267603c768fb11127611470e481214b511d47d0815b5465d4861994266822d7a5cc0d58171f600c4bd44f7beb14e82826c03b084168e3dccb3a7
ENV DATABASE_URL postgres://txywejtsjgwbco:ce75168abe4911d0918c7d5e1ea3e58dcacaaadbc49bd8513a824a75d623e4cb@ec2-23-23-133-10.compute-1.amazonaws.com:5432/d6pmt2843hphe4
ENV RAILS_ENV production
ENV RAILS_SERVE_STATIC_FILES true
ENV RAILS_LOG_TO_STDOUT true

COPY server/Gemfile /app/Gemfile
COPY server/Gemfile.lock /app/Gemfile.lock

RUN bundle install --without development test

COPY ./server /app

COPY --from=ng_builder /app/dist/client ./web

# FROM ruby:3.0.0 as base
# # RUN apt-get update -qq && apt-get install -y nodejs postgresql-client
# WORKDIR /ngapp

# FROM base as builder

# COPY server/ ./

# RUN bundle install



# # ---------- Relase ----------
# FROM base AS release
# WORKDIR /ngapp
# COPY --from=builder /ngapp/ ./ngapp
# # COPY --from=builder /app/dist ./
# COPY --from=ng_builder /app/dist/client ./web

RUN rails db:migrate

EXPOSE 5000
CMD ["rails", "server", "-b", "0.0.0.0"]