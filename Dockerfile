FROM node:20-alpine
RUN npm install -g http-server
WORKDIR /DesafiosEducativos
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build
EXPOSE 80
CMD ["http-server", "dist"]