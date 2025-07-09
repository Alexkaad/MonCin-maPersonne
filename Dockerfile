# Utilise une image officielle de Node.js
FROM node:20

# Crée le dossier de travail dans le conteneur
WORKDIR /app

# Copie les fichiers nécessaires
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie tout le reste du code (src, app.js, etc.)
COPY . .

# Expose le port que ton serveur utilise (ex: 3000)
EXPOSE 3000

# Commande pour démarrer ton serveur
CMD ["node", "index.js"]
