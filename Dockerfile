FROM cypress/included:13.13.3
WORKDIR /e2e
COPY package*.json ./
RUN npm install cypress --save-dev
COPY . .