# Etapa 1: Compilar la app Angular
FROM node:20 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build -- --configuration=production

# Etapa 2: Servir la app usando NGINX
FROM nginx:alpine
COPY --from=builder /app/dist/RIU-Frontend-PabloDefelitto/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
