FROM --platform=linux/x86-64 node:14

ENV PORT 1337

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY ./package*.json /usr/src/app
# COPY . ./
RUN yarn
#RUN yarn build

# Copying source files
COPY . /usr/src/app

# Building app
EXPOSE 1337

# Running the app
CMD "yarn" "develop"