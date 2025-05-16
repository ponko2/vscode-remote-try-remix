FROM node:20.19.2-alpine@sha256:be56e91681a8ec1bba91e3006039bd228dc797fd984794a3efedab325b36e679 as development-dependencies-env
COPY . /app
WORKDIR /app
RUN npm ci

FROM node:20.19.2-alpine@sha256:be56e91681a8ec1bba91e3006039bd228dc797fd984794a3efedab325b36e679 as production-dependencies-env
COPY ./package.json package-lock.json /app/
WORKDIR /app
RUN npm ci --omit=dev

FROM node:20.19.2-alpine@sha256:be56e91681a8ec1bba91e3006039bd228dc797fd984794a3efedab325b36e679 AS build-env
COPY . /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
RUN npm run build

FROM node:20.19.2-alpine@sha256:be56e91681a8ec1bba91e3006039bd228dc797fd984794a3efedab325b36e679
COPY ./package.json package-lock.json /app/
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
WORKDIR /app
CMD ["npm", "run", "start"]
