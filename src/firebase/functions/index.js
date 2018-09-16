const functions = require('firebase-functions');
const admin = require('firebase-admin');
const fs = require('fs');
const pdfkit = require('pdfkit');
const sendDocumentServer = require('./SignDoc.js');
const cors = require('cors')({origin: true});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.generatePdf = functions.https.onRequest( (req, res) => {
    var uid = req.query.uid;
    
    admin.firestore().doc('users/' + uid).get().then( (fireDoc) => {
        return cors(req, res, () => {
            if( fireDoc.exists ) {
            
            // create empty pdf document
            let pdf = new pdfkit();

            let buffers = [];
            pdf.on('data', buffers.push.bind(buffers));
            pdf.on('end', () => {

                let pdfData = Buffer.concat(buffers);

                /*
                // write pdf to firebase storage
                var storageRef = admin.storage().ref();
                storageRef.putString(pdfData).then( (snapshot) => {
                    console.log("put in raw string");
                })
*/


                // ... now send pdfData as attachment ...
                res.send(pdfData);

            });

            // writes pdf text
            pdf.text('Hello', 100, 100);
            pdf.end();

            } else {
                res.send("no doc");
            }
        })
    }).catch( (error) => {
        res.send(error);
    })
})

exports.sendDocument = functions.https.onRequest((request, response) => {
 sendDocumentServer(request, response);
});
