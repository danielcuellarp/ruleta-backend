# Imagen de NodeJS
FROM node:13.14

# Directorio destino
WORKDIR /app

# Copiar el archivo de los modulos
COPY package*.json ./

# Instalar los modulos
RUN npm install

# Copiar todo el contenido del proyecto
COPY . .

# Iniciar proyecto
CMD ["npm", "start"]