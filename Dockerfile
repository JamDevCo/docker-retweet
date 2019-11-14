FROM node:10

# Create app directory
WORKDIR /usr/src/app
ENV TWITTER_CONSUMER_KEY=''
ENV TWITTER_CONSUMER_SECRET=''
ENV TWITTER_ACCESS_TOKEN_KEY=''
ENV TWITTER_ACCESS_TOKEN_SECRET=''
ENV TWITTER_USERIDs=''
ENV TWITTER_USERNAME=''


# Bundle app source
COPY . /usr/src/app

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

CMD [ "npm", "start" ]