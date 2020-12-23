const serviceAccount = require("../projetographqlfiap-firebase-adminsdk-8mman-ffbc8c444c.json");
const admin = require("firebase-admin");
const express = require("express");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `${process.env.DATABASE}`,
});

module.exports = admin;
