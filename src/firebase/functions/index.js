const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.generatePdf = functions.https.onRequest( (req, res) => {
    var uid = req.query.uid;
    
    admin.firestore().doc('users/' + uid).get().then( (doc) => {
        if( doc.exists ) {
            res.send(doc.data());
        } else {
            res.send("no doc");
        }
    }).catch( (error) => {
        res.send(error);
    })
})
