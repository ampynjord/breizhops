# Étape 1 : Construire l'application React
FROM node:18 AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json pour installer les dépendances
COPY frontend/package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le code source du frontend
COPY frontend/ .

# Construire l'application pour la production
RUN npm run build

# Étape 2 : Server avec Nginx
FROM nginx:alpine

# Copier les fichiers construits dans l'image de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Démarrer Nginx pour servir l'application
CMD ["nginx", "-g", "daemon off;"]
