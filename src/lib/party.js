import { useCollection, useDocument } from "@nandorojo/swr-firestore";
import firestore from "@react-native-firebase/firestore";
import { useUser } from "./user";
import { getNearby } from "./yelp";
// import algoliasearch from "algoliasearch";
// import { pick } from "lodash";
import { useState, useEffect } from "react";
/*
React Hooks
*/

export const useParty = (id) => {
  // console.log({ id });
  const { user } = useUser();
  const [partyId, setPartyId] = useState(id);

  const { data: party, error: partyError } = useDocument(`Parties/${id}`, {
    listen: true,
  });

  const { data: partyMember } = useDocument(
    `Parties/${partyId}/members/${user?.uidvalue}`,
    {
      listen: true,
    }
  );

  useEffect(() => {
    !id && setPartyId(Math.random().toString(36).substring(7));
  }, []);

  return {
    partyId,
    party,
    partyMember,
    partyMeta: {
      partyError,
      isLoading: !partyError && !party,
    },
    createParty: async (members, options) => {
      if (!partyId) {
        throw new Error("Party Id not set!");
      }
      await createParty(partyId, user, members, options);
      return partyId;
    },
    addPartySelections: async (selections) => {
      if (!partyId) {
        throw new Error("Party Id not set!");
      }
      await addPartySelections(partyId, user, party, selections);
      return partyId;
    },
    resolveParty: async () => {
      if (!partyId) {
        throw new Error("Party Id not set!");
      }
      await resolveParty(partyId);
      return partyId;
    },
    endParty: async () => {
      if (!partyId) {
        throw new Error("Party Id not set!");
      }
      await endParty(partyId);
      return partyId;
    },
    leaveParty: async () => {
      if (!partyId) {
        throw new Error("Party Id not set!");
      }
      await leaveParty(partyId, user);
      return partyId;
    },
  };
};

export const usePartyData = (id) => {
  const [party, setParty] = useState({});

  firestore().collection("Parties").doc(id);
  useEffect(() => {
    const unsubscribe = firestore()
      .collection("Parties")
      .doc(id)
      .onSnapshot(
        (snapshot) => setParty(snapshot.data()),
        (err) => console.error(err)
      );
    return () => unsubscribe();
  }, [id]);

  return { party };
};

export const usePartyMembers = (id) => {
  const { data, error } = useCollection(`Parties/${id}/members`, {
    listen: true,
  });

  return {
    partyMembers: data,
    partyMeta: {
      partyMemberError: error,
      isLoading: !error && !data,
    },
  };
};

/*
Helper Methods
*/

const addPartySelections = async (id, user, party, selections) => {
  console.log({ selections });
  if (Object.keys(selections).length != party?.restaurants?.length)
    throw new Error("Not enough items yet");

  const partyRef = firestore().collection("Parties").doc(id);
  const partyMemberRef = partyRef.collection("members").doc(user.uidvalue);

  const updatedData = party.restaurants.map((item) => ({
    ...item,
    matches: item.matches + selections[item.id],
  }));

  await partyRef.update({ restaurants: updatedData });
  await partyMemberRef.update({ status: "complete" });
};

const createParty = async (id, user, members, options) => {
  const restaurants = await getNearby(options);
  console.log("restaurants");
  if (restaurants.length < 2) {
    throw Error("Too restrictive!");
  }
  const partyRef = firestore().collection("Parties").doc(id);
  const usersRef = firestore().collection("Users");

  await partyRef.set({
    admin: user.uidvalue,
    restrictions: {
      ...options,
    },
    isDuo: members.length <= 1,
    restaurants,
  });

  // voodoo magic to add all members at once
  let membersBatch = firestore().batch();
  [...members, user].forEach((doc) => {
    const docRef = partyRef.collection("members").doc(doc.uidvalue);
    membersBatch.set(docRef, {
      ...doc,
      status: doc.uidvalue == user.uidvalue ? "accepted" : "pending",
    });
  });

  await membersBatch.commit();

  let invitesBatch = firestore().batch();
  [...members, { uidvalue: user.uidvalue }].forEach((doc) => {
    const docRef = usersRef.doc(doc.uidvalue).collection("invitations").doc(id);
    invitesBatch.set(docRef, {
      timestamp: firestore.FieldValue.serverTimestamp(),
      inviter: user.firstName + " " + user.lastName,
      isDuo: members.length <= 1,
      status: user.uidvalue == doc.uidvalue ? "accepted" : "pending",
      imagePath: user.imageUrl,
      docID: id,
    });
  });

  await invitesBatch.commit();
};

const leaveParty = async (partyId, user) => {
  await firestore()
    .collection("Users")
    .doc(user.uidvalue)
    .collection("invitations")
    .doc(partyId)
    .update({
      status: "completed",
    });

  await firestore()
    .collection("Parties")
    .doc(partyId)
    .collection("members")
    .doc(user.uidvalue)
    .delete();
};

const resolveParty = async (partyId) => {
  const partyRef = firestore().collection("Parties").doc(partyId);
  console.log(partyRef);
  const members = (await partyRef.collection("members").get()).docs.map((x) =>
    x.data()
  );
  console.log({ members });

  let membersBatch = firestore().batch();
  members.forEach((doc) => {
    const docRef = partyRef.collection("members").doc(doc.uidvalue);
    membersBatch.update(docRef, {
      status: "complete",
    });
  });

  await membersBatch.commit();
};

const endParty = async (partyId) => {
  // voodoo magic to add all members at once
  const partyRef = firestore().collection("Parties").doc(partyId);

  const members = (await partyRef.collection("members").get()).docs.map((x) =>
    x.data()
  );

  let invitesBatch = firestore().batch();
  members.forEach((doc) => {
    const docRef = firestore()
      .collection("Users")
      .doc(doc.uidvalue)
      .collection("invitations")
      .doc(partyId);
    invitesBatch.update(docRef, {
      status: "completed",
    });
  });

  invitesBatch.commit();

  // partyRef.
};
