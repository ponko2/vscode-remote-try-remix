FROM node:24.12.0-alpine@sha256:c921b97d4b74f51744057454b306b418cf693865e73b8100559189605f6955b8 as development-dependencies-env
COPY . /app
WORKDIR /app
RUN npm ci

FROM node:24.12.0-alpine@sha256:c921b97d4b74f51744057454b306b418cf693865e73b8100559189605f6955b8 as production-dependencies-env
COPY ./package.json package-lock.json /app/
WORKDIR /app
RUN npm ci --omit=dev

FROM node:24.12.0-alpine@sha256:c921b97d4b74f51744057454b306b418cf693865e73b8100559189605f6955b8 AS build-env
COPY . /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
RUN npm run build

FROM node:24.12.0-alpine@sha256:c921b97d4b74f51744057454b306b418cf693865e73b8100559189605f6955b8
COPY ./package.json package-lock.json /app/
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
WORKDIR /app
CMD ["npm", "run", "start"]
