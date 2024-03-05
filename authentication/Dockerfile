# Usa la imagen oficial de Node.js como base
FROM node:14

# Establece el directorio de trabajo en la aplicación
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

ENV DATABASE_HOST=mongo_authentication


# Expone el puerto en el que la aplicación va a correr
EXPOSE 50051

# Comando para ejecutar la aplicación
CMD ["node", "gRPC_server.js"]
