# ---------- Angular Builder ----------
FROM node:14.18.0 AS ng_builder

# RUN mkdir -p /app

WORKDIR /app

copy ./client ./

RUN npm install

RUN npm run build --prod

# ---------- Rails Builder ----------

FROM ruby:3.0.0

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs

RUN mkdir -p /app
WORKDIR /app

COPY server/Gemfile /app/Gemfile
COPY server/Gemfile.lock /app/Gemfile.lock

RUN bundle install
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

EXPOSE 5000
CMD ["rails", "server", "-b", "0.0.0.0"]