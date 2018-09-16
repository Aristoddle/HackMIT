const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.helloWorld = functions.https.onRequest( (request, response) => {
    response.send("Hello from Firebase!");
});

exports.generatePdf = functions.https.onRequest( (request, response) => {
    // retrieve the uid in the url
    var uid = request.query.uid;
    response.send(uid);
});

/*
exports.autoSuggestAggregate = functions.database.ref('/claims/{claim}/items')
    .onCreate((snapshot, context) => {
        const original = snapshot.val();

        // need to return a promise
    })
*/