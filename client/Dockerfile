FROM node:17-alpine3.14 as build

WORKDIR /app
ENV NODE_OPTIONS=--openssl-legacy-provider
COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.21.5-alpine

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
