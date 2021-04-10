import { useCollection, useDocument } from "@nandorojo/swr-firestore";
import firestore from "@react-native-firebase/firestore";
import { useUser } from "./user";
import algoliasearch from "algoliasearch";
import { pick } from "lodash";
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
    `Parties/${partyId}/members/${user.uidvalue}`,
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
  };
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
  if (Object.keys(selections).length != party.restaurants?.length)
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
    const docRef = usersRef
      .doc(doc.uidvalue)
      .collection("invitations")
      .doc(doc.uidvalue);
    invitesBatch.set(docRef, {
      timestamp: firestore.FieldValue.serverTimestamp(),
      inviter: user.handle,
      isDuo: members.length <= 1,
      status: user.uidvalue == doc.uidvalue ? "accepted" : "pending",
      imagePath: user.imageUrl,
      docID: id,
    });
  });

  await invitesBatch.commit();
};

const getNearby = async ({ radius, count, loc }) => {
  const client = algoliasearch(
    "HKZL5TPBOR",
    "4de96ea74e0d95a51d065d3f9c317fdb"
  );
  const index = client.initIndex("restaurants");
  // const loc = await getUserLocation();
  // console.log(loc);

  const results = await index.search("", {
    aroundLatLng: loc.join(","),
    aroundRadius: Math.round(radius * 1609.34),
    hitsPerPage: 30,
  });

  // console.log(results);

  return results.hits
    .map((hit) => ({
      ...pick(hit, [
        "name",
        "address",
        "_geoloc",
        "city",
        "website",
        "state",
        "zip_code",
        "cuisine",
      ]),
      matches: 0,
      id: hit.objectID,
    }))
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.round(count));
};
