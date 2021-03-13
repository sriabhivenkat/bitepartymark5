// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require("firebase-functions");

// // // // The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

exports.sendInviteNotification = functions.firestore
  .document("Users/{userId}/invitations/{inviteId}")
  .onWrite(async (change, context) => {
    const { userId } = context.params;
    const { inviter } = change.after.data();
    try {
      var { tokens } = (await db.collection("Users").doc(userId).get()).data();
      const payload = {
        notification: {
          title: "You have new party invite!",
          body: `Join ${inviter}'s party`,
          // icon: follower.photoURL
        },
      };

      const response = await admin.messaging().sendToDevice(tokens, payload);
    } catch (err) {
      console.log("Error getting documents", err);
      throw err;
    }
    console.log("triggered!");

    console.log({ userId, data });
  });
