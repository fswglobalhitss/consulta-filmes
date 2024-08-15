ARG CHROME_VERSION='125.0.6422.141-1'
ARG EDGE_VERSION='125.0.2535.85-1'
ARG FIREFOX_VERSION='126.0.1'

FROM cypress/factory:cypress-13.11.0-node-20.14.0-

WORKDIR /app

COPY package.json /app

RUN npm install cypress --save-dev

RUN npx cypress install

COPY . .

CMD ["npm", "run", "cy:run"]