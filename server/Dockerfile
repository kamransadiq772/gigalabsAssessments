FROM node:18-alpine

# set working directory
WORKDIR /app


# install app dependencies
COPY package.json ./

RUN npm install 

COPY . ./

EXPOSE 5000

# start app
CMD ["npm", "run", "start:dev"]