//On execution an envelope is sent to the provided email address, one signHere
//tab is added, the document supplied in workingdirectory\fileName is used.
//Open a new browser pointed at http://localhost:3000 to execute. 
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------

//Fill in Variables Here

//Obtain an OAuth token from https://developers.docusign.com/oauth-token-generator
//Obtain your accountId from account-d.docusign.com > Go To Admin > API and Keys

const OAuthToken = 'eyJ0eXAiOiJNVCIsImFsZyI6IlJTMjU2Iiwia2lkIjoiNjgxODVmZjEtNGU1MS00Y2U5LWFmMWMtNjg5ODEyMjAzMzE3In0.AQkAAAABAAUABwCAHbyDbhvWSAgAgF3fkbEb1kgCAH9LU4OXviBMkpJFHSCRMlgVAAEAAAAYAAEAAAAFAAAADQAkAAAAZjBmMjdmMGUtODU3ZC00YTcxLWE0ZGEtMzJjZWNhZTNhOTc4EgABAAAACwAAAGludGVyYWN0aXZlMAAAWvKBbhvWSA.IXjVDHm6q8OHzYsHNFYHzE7oFcLY44Gg6SEETqXDLuZ0F7zMuqB_QyqwcZ8XHCj1pXAT-IE7S8fipJMEAlhlKYiYBwTNIBbmJxIoASKAQ1DB7b3n0AiFRjRR6q7MC00kD2DqnpVuOIJ2RnrXgOVWPge6FGvU0XkdeaJqlWLln1cxGX-ZKumjw6rNm_I8z4kkvwB2GDN1-w5rp7A5tvyOxqq-ZVngNf6iKPXIaz7NTwhR5zfGe59hNjyQlaORWMKB9-3Rz1UFQzUf2rirmgD4Q5fL7rsYuUWCkPHLQCOc6_9FRUF1ObFl2pPqqPzxuc8FXN_5uyUVfhOwhBer3Y3opQ';
const accountId = 'joseph.lanzone@yale.edu';

//Recipient Information goes here
const claimantName = '';
const claimantEmail = '';

const insurerName = '';
const insurerEmail = '';

const adjustorName = '';
const adjustorEmail = '';

var contractorName = '';
var contractorEmail = '';

//Point this to the document you wish to send's location on the local machine. Default location is __workingDir\fileName
const fileName = newDoc; //IE: test.pdf
//-------------------------------------------------------------------------------


app.get('/', function (req, res) {

  apiClient.setBasePath('https://demo.docusign.net/restapi');
  apiClient.addDefaultHeader('Authorization', 'Bearer ' + OAuthToken);

  // Envelope Code goes here

  //Read the file you wish to send from the local machine.
  fileStream = process.argv[2];
  pdfBytes = fs.readFileSync(path.resolve(__dirname, fileName));
  pdfBase64 = pdfBytes.toString('base64');

  docusign.Configuration.default.setDefaultApiClient(apiClient);

  var envDef = new docusign.EnvelopeDefinition();

  //Set the Email Subject line and email message
  envDef.emailSubject = 'Please sign this document sent from Node SDK';
  envDef.emailBlurb = 'Please sign this document sent from the DocuSign Node.JS SDK.'

  //Read the file from the document and convert it to a Base64String
  var doc = new docusign.Document();
  doc.documentBase64 = pdfBase64;
  doc.fileExtension = 'pdf';
  doc.name = 'Node Doc Send Sample';
  doc.documentId = '1';

  //Push the doc to the documents array.
  var docs = [];
  docs.push(doc);
  envDef.documents = docs;

  //Set up list of signers
  var signers = [];

  //Create the signer with the previously provided name / email address
  var claimant = new docusign.Signer();
  claimant.name = claimantName;
  claimant.email = claimantEmail;
  claimant.routingOrder = '1';
  claimant.recipientId = '1';

  var claimantSignHere = new docusign.SignHere();
  claimantSignHere.anchorString = 'Claimant Signature';
  claimantSignHere.anchorXOffset = '1';
  claimantSignHere.anchorYOffset = '0';
  claimantSignHere.anchorIgnoreIfNotPresent = 'true';
  claimantSignHere.anchorUnits = 'inches';
  
  claimantTabArray = [];
  claimantTabArray.push(claimantSignHere);

  //Create a tabs object and a signHere tab to be placed on the envelope
  var claimantTabs = new docusign.Tabs();
  //Create the array for SignHere tabs, then add it to the general tab array
  claimantTabs.signHereTabs = claimantTabArray;
  //Then set the recipient, named signer, tabs to the previously created tab array
  claimant.tabs = claimantTabs;
  signers.push(claimant);

  var adjustor = new docusign.Signer();
  adjustor.name = adjustorName;
  adjustor.email = adjustorEmail;
  adjustor.routingOrder = '2';
  adjustor.recipientId = '2';

  var adjustorSignHere = new docusign.SignHere();
  adjustorSignHere.anchorString = 'Adjustor Signature';
  adjustorSignHere.anchorXOffset = '1';
  adjustorSignHere.anchorYOffset = '0';
  adjustorSignHere.anchorIgnoreIfNotPresent = 'true';
  adjustorSignHere.anchorUnits = 'inches';

  adjustorTabArray = [];
  adjustorTabArray.push(adjustorSignHere);

  var adjustorTabs = new docusign.Tabs();
  adjustorTabs.signHereTabs = adjustorTabArray;
  adjustor.Tabs = adjustorTabs;

  signers.push(adjustor);

  var contractor = new docusign.Signer();
  contractor.name = contractorName;
  contractor.email = contractorEmail;
  contractor.routingOrder = '3';
  contractor.recipientId = '3';


  var contractorSignHere = new docusign.SignHere();
  contractorSignHere.anchorString = 'Contractor Signature';
  contractorSignHere.anchorXOffset = '1';
  contractorSignHere.anchorYOffset = '0';
  contractorSignHere.anchorIgnoreIfNotPresent = 'true';
  contractorSignHere.anchorUnits = 'inches';

  contractorTabArray = [];
  signHereTabArray.push(contractorSignHere);

  var contractorTabs = new docusign.Tabs();
  contractorTabs.signHereTabs = contractorTabArray;
  contractor.Tabs = contractorTabs;

  signers.push(contractor);

  var insurer = new docusign.Signer();
  insurer.name = claimantName;
  insurer.email = claimantEmail;
  insurer.routingOrder = '4';
  insurer.recipientId = '4';

  var insurerSignHere = new docusign.SignHere();
  insurerSignHere.anchorString = 'Insurer Signature';
  insurerSignHere.anchorXOffset = '1';
  insurerSignHere.anchorYOffset = '0';
  insurerSignHere.anchorIgnoreIfNotPresent = 'true';
  insurerSignHere.anchorUnits = 'inches';

  insurerTabArray = [];
  insurerTabArray.push(insurerSignHere);

  var insurerTabs = new docusign.Tabs();
  insurerTabs.signHereTabs = insurerTabArray;
  insurer.Tabs = insurerTabs;

  signers.push(insurer);

  //Envelope status for drafts is created, set to sent if wanting to send the envelope right away
  envDef.status = 'sent';

  //Create the general recipients object, then set the signers to the signer array just created
  var recipients = new docusign.Recipients();
  recipients.signers = signers;

  //Then add the recipients object to the enevelope definitions
  envDef.recipients = recipients;

  //Send the envelope
  var envelopesApi = new docusign.EnvelopesApi();
  envelopesApi.createEnvelope(accountId, { 'envelopeDefinition': envDef }, function (err, envelopeSummary, response) {

    if (err)
      console.log(err);

    res.send(envelopeSummary);

  });
});

app.listen(port, host, function (err) {
  if (err)
    throw err;

  console.log('Your server is running on http://' + host + ':' + port + '.');
});