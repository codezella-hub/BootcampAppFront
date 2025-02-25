# Étape 1 : Utiliser l'image de Node.js
FROM node:22 AS build

# Étape 2 : Définir le répertoire de travail
WORKDIR /app

# Étape 3 : Copier le fichier de configuration et installer les dépendances
COPY package.json package-lock.json ./
RUN npm install

# Étape 4 : Copier le reste de l'application et construire
COPY . .
RUN npm run build

# Étape 5 : Étape de production
FROM nginx:alpine

# Étape 6 : Copier la configuration Nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Étape 7 : Copier les fichiers construits de l'étape précédente
COPY --from=build /app/dist /usr/share/nginx/html

# Étape 8 : Exposer le port
EXPOSE 80

# Étape 9 : Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
