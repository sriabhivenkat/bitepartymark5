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
  const [party, setParty] = useState({})
  const [partyMember, setPartyMember] = useState({})


  const [isPartyLoading, setIsPartyLoading] = useState(true);
  const [isPartyMemberLoading, setIsPartyMemberLoading] = useState(true);


  useEffect(() => {
    const unsubscribe = firestore()
      .collection("Parties")
      .doc(id)
      .onSnapshot(
        (snapshot) => {
          setParty(snapshot.data());
          setIsPartyLoading(false);
        },
        (err) => console.error(err)
      );
    return () => unsubscribe();
  }, [id]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("Parties")
      .doc(id)
      .collection("members")
      .doc(user?.uidvalue)
      .onSnapshot(
        (snapshot) => {
          setPartyMember(snapshot.data());
          setIsPartyMemberLoading(false);
        },
        (err) => console.error(err)
      );
    return () => unsubscribe();
  }, [id]);

  // const { data: party, error: partyError } = useDocument(`Parties/${id}`, {
  //   listen: true,
  // });

  // const { data: partyMember } = useDocument(
  //   `Parties/${partyId}/members/${user?.uidvalue}`,
  //   {
  //     listen: true,
  //   }
  // );

  useEffect(() => {
    !id && setPartyId(Math.random().toString(36).substring(7));
  }, []);

  return {
    partyId,
    party,
    partyMember,
    partyMeta: {
      partyError: false,
      isLoading: isPartyLoading && isPartyMemberLoading
    },
    createParty: async (members, options) => {
      if (!partyId) {
        throw new Error("Party Id not set!");
      }
      await createParty(partyId, user, members, options);
      return partyId;
    },
    addPartySelections: async (selections, override) => {
      if (!partyId) {
        throw new Error("Party Id not set!");
      }
      await addPartySelections(partyId, user, party, selections, override);
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
      await endParty(partyId, user);
      return partyId;
    },
    leaveParty: async () => {
      if (!partyId) {
        throw new Error("Party Id not set!");
      }
      await leaveParty(partyId, user);
      return partyId;
    },
    addSelfToParty: async (id) => {
      return await addSelf(id, user)
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

const addPartySelections = async (id, user, party, selections, override) => {
  if (Object.keys(selections).length != party?.restaurants?.length || override)
    throw new Error("Not enough items yet");

  const partyRef = firestore().collection("Parties").doc(id);
  const partyMemberRef = partyRef.collection("members").doc(user.uidvalue);
  const historyRef = firestore()
    .collection("Users")
    .doc(user.uidvalue)
    .collection("history")
    .doc(id);

  const updatedData = party.restaurants.map((item) => ({
    ...item,
    matches: item.matches + selections[item.id],
  }));

  await partyRef.update({ restaurants: updatedData });
  await partyMemberRef.update({ status: "complete" });

  await historyRef.set(
    party.restaurants.map((item) => ({
      ...item,
      matches: selections[item.id],
    }))
  );
};

const createParty = async (id, user, members, options) => {
  const restaurants = await getNearby(options);
  if (restaurants.length < 2) {
    throw Error("Too restrictive!");
  }
  const partyRef = firestore().collection("Parties").doc(id);
  const usersRef = firestore().collection("Users");
  console.log({options})
  await partyRef.set({
    admin: user.uidvalue,
    restrictions: {
      ...options,
    },
    isDuo: members.length <= 1,
    autoResolve: options.autoResolve,
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
      inviter: user.uidvalue,
      inviterHandle: user.handle,
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


  partyRef.update({autoResolve: true});
  console.log({partyId})
  console.log('foo')

  const members = (await partyRef.collection("members").get()).docs.map((x) =>
    x.data()
  );
  console.log({ members });

  let membersBatch = firestore().batch();
  members.forEach((doc) => {
    const docRef = partyRef.collection("members").doc(doc.uidvalue);
    membersBatch.update(docRef, {
      status: "complete",
      rand:  Math.floor(Math.random() * 10)
    });
  });

  await membersBatch.commit();
};

const endParty = async (partyId, user) => {
  // voodoo magic to add all members at once
  const partyRef = firestore().collection("Parties").doc(partyId);

  await leaveParty(partyId, user);


  // const res = await partyRef.collection("members").get()

  // res.docs.

  const members = (await partyRef.collection("members").get()).docs.map((x) =>
    x.data()
  );

  console.log({ members });
  let invitesBatch = firestore().batch();
  members.forEach((doc) => {
    try {
      const docRef = firestore()
        .collection("Users")
        .doc(doc.uidvalue)
        .collection("invitations")
        .doc(partyId);
      invitesBatch.update(docRef, {
        status: "completed",
      });
    } catch {
      console.error("Couldn't add to batch");
    }
  });

  invitesBatch.commit();

  // partyRef.
};


const addSelf = (partyId, user) => {
  const partyRef = firestore().collection("Parties").doc(partyId);
  const usersRef = firestore().collection("Users");

  partyRef.collection("members").doc(user.uidvalue).set({
    ...user,
    status: "accepted"
  })

  const inviteRef = usersRef.doc(user.uidvalue).collection("invitations").doc(partyId);
  inviteRef.set({
    timestamp: firestore.FieldValue.serverTimestamp(),
    inviter: user.uidvalue,
    inviterHandle: user.handle,
    isDuo: false, 
    status: "accepted",
    imagePath: user.imageUrl,
    docID: partyId,
  });
  

}