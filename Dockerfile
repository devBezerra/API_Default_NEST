FROM node:20.12.2-alpine as build

WORKDIR /app

COPY package*.json ./

COPY tsconfig*.json ./

COPY . .