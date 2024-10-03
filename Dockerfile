FROM node:20 AS build
WORKDIR /app

COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.27.2-alpine

COPY --from=build /app/theme /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
