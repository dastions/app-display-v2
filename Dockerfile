# Etapa de construcción
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package.json ./

# Instalar dependencias con yarn
RUN yarn install --frozen-lockfile

# Copiar el resto del código
COPY . .

# Construir la aplicación
RUN yarn build

# Etapa de producción
FROM nginx:1.27-alpine

# Copiar el build desde la etapa anterior
COPY --from=builder /app/build /usr/share/nginx/html

# Copiar configuración personalizada de nginx (opcional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80
EXPOSE 80

# Iniciar nginx
CMD ["nginx", "-g", "daemon off;"]

