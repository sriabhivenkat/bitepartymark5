// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require("firebase-functions");

// // // // The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

exports.sendInviteNotification = functions.firestore
  .document("Users/{userId}/invitations/{inviteId}")
  .onWrite(async (change, context) => {
    const { userId, inviteId } = context.params;
    const { inviter, notified } = change.after.data();
    try {
      if (notified) return;

      await db
        .collection("Users")
        .doc(userId)
        .collection("invitations")
        .doc(inviteId)
        .update({ notified: true });

      const inviterDoc = (
        await db.collection("Users").doc(inviter).get()
      ).data();
      // .collection("invitations")
      // .doc(inviteId)
      // .update({ notified: true });

      var { tokens } = (await db.collection("Users").doc(userId).get()).data();
      const payload = {
        notification: {
          title: "You have new party invite!",
          body: `Join ${inviterDoc.firstName}'s party`,
        },
        data: {
          inviteId,
          type: "invite",
        },
      };

      const response = await admin.messaging().sendToDevice(tokens, payload);
    } catch (err) {
      console.log("Error getting documents", err);
      throw err;
    }
    console.log("triggered!");

    // console.log({ userId, data });
  });

exports.resolveParty = functions.firestore
  .document("Parties/{partyID}/members/{memberID}")
  .onWrite(async (change, context) => {
    const { partyID } = context.params;
    try {
      const membersList = (
        await db.collection("Parties").doc(partyID).collection("members").get()
      ).docs.map((x) => x.data());

      const isComplete = membersList
        .filter(({ status }) => status != "rejected")
        .every(({ status }) => status == "complete");

      if (isComplete) {
        const {
          restaurants,
          winner,
          autoResolve = true,
        } = (await db.collection("Parties").doc(partyID).get()).data();

        if (winner || !autoResolve) {
          return;
        }

        const matchedRestaurant = restaurants
          .sort(() => 0.5 - Math.random())
          .sort((a, b) => b.matches - a.matches)[0];

        console.log({ membersList });

        await db.collection("Parties").doc(partyID).update({
          winner: matchedRestaurant,
        });

        const userPromises = membersList.map((member) =>
          db.collection("Users").doc(member.uidvalue).get()
        );

        var tokens = (await Promise.all(userPromises)).flatMap(
          (item) => item.data().tokens
        );

        const payload = {
          notification: {
            title: "Join the party!",
            body: `${matchedRestaurant.name} was selected`,
            icon: matchedRestaurant.image_url,
          },
          data: {
            partyId: partyID,
            type: "party",
          },
        };

        await admin.messaging().sendToDevice(tokens, payload);
      }
    } catch (err) {
      console.log("Error getting documents", err);
      throw err;
    }
  });
