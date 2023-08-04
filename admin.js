const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://console.firebase.google.com/u/1/project/toylib-2426a/database' // Replace with your Firebase Realtime Database URL
});

module.exports = admin;

