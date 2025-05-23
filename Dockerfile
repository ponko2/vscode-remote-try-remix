FROM node:22.16.0-alpine@sha256:9f3ae04faa4d2188825803bf890792f33cc39033c9241fc6bb201149470436ca as development-dependencies-env
COPY . /app
WORKDIR /app
RUN npm ci

FROM node:22.16.0-alpine@sha256:9f3ae04faa4d2188825803bf890792f33cc39033c9241fc6bb201149470436ca as production-dependencies-env
COPY ./package.json package-lock.json /app/
WORKDIR /app
RUN npm ci --omit=dev

FROM node:22.16.0-alpine@sha256:9f3ae04faa4d2188825803bf890792f33cc39033c9241fc6bb201149470436ca AS build-env
COPY . /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
RUN npm run build

FROM node:22.16.0-alpine@sha256:9f3ae04faa4d2188825803bf890792f33cc39033c9241fc6bb201149470436ca
COPY ./package.json package-lock.json /app/
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
WORKDIR /app
CMD ["npm", "run", "start"]
