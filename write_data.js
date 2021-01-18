const admin = require('./node_modules/firebase-admin');
const serviceAccount = require("./bite-party-firebase-adminsdk-hgu1t-3010c7bb51.json");
const data = require("./restaurants.json");
const collectionKey = "Restaurants"; //name of the collection
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const firestore = admin.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);
if (data && (typeof data === "object")) {
Object.keys(data).forEach(docKey => {
 firestore.collection(collectionKey).doc(docKey).set(data[docKey]).then((res) => {
    console.log("Document " + docKey + " successfully written!");
}).catch((error) => {
   console.error("Error writing document: ", error);
});
});
}
