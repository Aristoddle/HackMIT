const fs = require('fs');
const pdfkit = require('pdfkit');
const sendDocumentServer = require('./functions/SignDoc.js');
const admin = require('firebase-admin');

var express = require('express');
var app = express();
app.use(express.json());
app.use(express.urlencoded());

var serviceAccount = require("./hackmit-7c665-firebase-adminsdk-wfvi3-c7dbc8b3d4.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hackmit-7c665.firebaseio.com"
});

app.get('/:uid', (req, res) => {
    var uid = req.params.uid;
    
    admin.firestore().doc('users/' + uid).get().then( (fireDoc) => {

    // return cors(req, res, () => {
        if( fireDoc.exists ) {
            console.log(fireDoc.data());
            // create empty pdf document
            let pdf = new pdfkit();
            let buffers = [];
            pdf.on('data', buffers.push.bind(buffers));
            pdf.on('end', () => {
                let pdfData = Buffer.concat(buffers);
                sendDocumentServer(req, res, pdfData.toString('base64'));
            });
            pdf.text('Hello', 100, 100);
            pdf.end();

            /*
            // add html, turn into blob, turn into b64
            var pdf = new jsPDF("l", "pt", "letter");
            pdf.addHTML(html, y, x, options, function () {
                var blob = pdf.output("blob");
                var reader = new FileReader();
                reader.readAsDataURL(blob); 
                reader.onloadend = () => {
                    base64data = reader.result;                
                    sendDocumentServer(req, res, base64data);
                }
            });
            */
        } else {
            res.send("no doc");
        }
    }).catch( (error) => {
        res.send("error: " + JSON.stringify(error));
    });
});

app.listen(4000, () => {
    console.log("listening on port 4000");
})