FROM node:14.14.0 AS build
WORKDIR /app
RUN apt install python -y && npm install node-sass --unsafe-perm
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build --env=prod

FROM nginx:alpine
COPY --from=build /app/dist/ /usr/share/nginx/html
EXPOSE 80