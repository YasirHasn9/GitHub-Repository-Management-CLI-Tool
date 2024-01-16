# Base
FROM node:14 as base
WORKDIR /usr/src

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Bundle the app source inside the Docker image
COPY . .

# Make port 8080 available to the world outside the Docker container
EXPOSE 8080

RUN npm run build

#                 dev
# local machine build and test build to run nodemon and install devDependencies libs
# --------------------------------------
FROM base as dev
ENV NODE_ENV=dev
RUN npm ci
CMD ["npm", "run", "dev"]


#                 test
# local machine build and test build to run nodemon and install devDependencies libs
# --------------------------------------
FROM base as test
ENV NODE_ENV=test
RUN npm ci
CMD ["npm", "run", "test"]


#               release
# --------------------------------------
FROM base as release
ENV NODE_ENV=production
CMD ["node", "./dist/src/app.js"]





