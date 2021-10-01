FROM node:12.18.3-buster-slim

WORKDIR /app
COPY . /app/
ENV NODE_ENV=production
RUN npm install --production
CMD ["npm", "start"]
