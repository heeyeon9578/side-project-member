# be/Dockerfile
FROM node:18

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 5001

CMD ["npm", "run", "start:dev"]