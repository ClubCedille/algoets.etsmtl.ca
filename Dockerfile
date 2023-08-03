FROM node:14 AS build
WORKDIR /app

COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.21-alpine

COPY --from=build /app/theme /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
