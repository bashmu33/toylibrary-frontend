const admin = require('firebase-admin');
const serviceAccount = require('./firebase-adminsdk-xjzgo@toylib-2426a.iam.gserviceaccount.com');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://toylib-2426a.firebaseio.com'
});

module.exports = admin;
