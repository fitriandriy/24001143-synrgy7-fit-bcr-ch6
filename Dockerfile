FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8000

RUN chmod +x ./start.sh

CMD ["./start.sh"]