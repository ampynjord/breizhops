# Étape 1 : Construire l'application backend
FROM node:18 AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json pour installer les dépendances
COPY backend/package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le code source du backend
COPY backend/ .

# Exposer le port sur lequel ton backend sera disponible
EXPOSE 5000

# Lancer l'application backend (ajuste selon ton script de démarrage)
CMD ["npm", "start"]
