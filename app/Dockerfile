FROM --platform=linux/x86-64 node:16

EXPOSE 19001

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install -g expo-cli@latest
RUN npm install
COPY . .

CMD ["npm", "run", "prod"]