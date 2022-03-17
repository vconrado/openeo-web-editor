FROM node:16-alpine as build

ARG CLIENT_URL=/
ENV CLIENT_URL $CLIENT_URL

# Copy source code
COPY . /src/openeo-web-editor
WORKDIR /src/openeo-web-editor

# Build
RUN npm install
RUN npm run build

# Copy build folder and run with nginx
FROM nginx:1.20.1-alpine
COPY --from=build /src/openeo-web-editor/dist /usr/share/nginx/html
