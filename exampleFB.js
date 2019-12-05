import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

export const example = functions.https.onRequest(async (req, res) => {
 res.send("Welcome to the example!");
});

export const addMessage = functions.https.onRequest(async (req, res) => {
  //Grab query param
  const example = req.query.example || 'default';

  //Push message to firebase db
  await admin.database().ref('/exampleMessage').push({message: example});

  //Return message interpolated with example
  res.send({message: `Example: ${example}`});
});

export const watchMessage = functions.database.ref('/exampleMessage/{pushId}/text').onWrite(async () => {
    console.log("New example message added");
});
