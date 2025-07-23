# Étape 1 : Image de base
FROM node:20

# Étape 2 : Dossier de travail dans le conteneur
WORKDIR /server

# Étape 3 : Copier les fichiers package.json
COPY package*.json ./

# Étape 4 : Installer les dépendances
RUN npm install

# Étape 5 : Copier tous les fichiers du projet
COPY . .

# Étape 6 : Compiler le TypeScript
RUN npx tsc

# Étape 7 : Exposer le port
EXPOSE 3000

# Étape 8 : Lancer le fichier compilé
CMD ["node", "dist/app.js"]
