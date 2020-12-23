require("dotenv").config(".env");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const app = express();
const resolvers = require("./resolvers");
const functions = require("firebase-functions");
const { importSchema } = require("graphql-import");

const server = new ApolloServer({
  typeDefs: importSchema("./schema/index.graphql"),
  resolvers: resolvers,
});

server.applyMiddleware({ app, path: "/", cors: true });

exports.graphql = functions.https.onRequest(app);
