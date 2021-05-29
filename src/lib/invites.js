import { useCollection } from "@nandorojo/swr-firestore";
import firestore from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";
import { useUser } from "./user";

/*
React Hooks
*/

export const useInvites = () => {
  const { user } = useUser();
  // const { data, error } = useCollection(`Users/${user?.uidvalue}/invitations`, {
  //   orderBy: ["timestamp", "desc"],
  //   listen: true,
  //   shouldRetryOnError: true,
  // });

  const [data, setData] = useState();
  const [error, setError] = useState();
  // useEffect(() => {
  //   const unsubscribe = firestore()
  //     .collection("Parties")
  //     .doc(id)
  //     .onSnapshot(
  //       (snapshot) => setParty(snapshot.data()),
  //       (err) => console.error(err)
  //     );
  //   return () => unsubscribe();
  // }, [id]);
  useEffect(() => {
    const unsub = firestore()
      .collection("Users")
      .doc(user?.uidvalue)
      .collection("invitations").orderBy("timestamp", "desc")
      .onSnapshot(
        (snap) => setData(snap.docs.map((x) => x.data())),
        (err) => setError(err)
      );
    return unsub;
  }, [user]);

  // const members = (await partyRef.collection("members").get()).docs.map((x) =>
  //   x.data()
  // );

  // await firestore()
  //   .collection("Parties")
  //   .doc(invite.docID)
  //   .collection("members")
  //   .doc(user.uidvalue)
  //   .update({ status: "rejected" });

  return {
    invites: data,
    invitesMeta: {
      error,
      isLoading: !error && !data,
    },
    acceptInvite: async (invite) => await acceptInvite(user, invite),
    rejectInvite: async (invite) => await rejectInvite(user, invite),
  };
};

/*
Helper Methods
*/

export const rejectInvite = async (user, invite) => {
  // update my party status
  await firestore()
    .collection("Parties")
    .doc(invite.docID)
    .collection("members")
    .doc(user.uidvalue)
    .update({ status: "rejected" });
  // update my invite status
  await firestore()
    .collection("Users")
    .doc(user.uidvalue)
    .collection("invitations")
    .doc(invite.id)
    .update({
      status: "rejected",
    });
};

export const acceptInvite = async (user, invite) => {
  // update my party status
  await firestore()
    .collection("Parties")
    .doc(invite.docID)
    .collection("members")
    .doc(user.uidvalue)
    .update({ status: "accepted" });

  // update my invite status
  await firestore()
    .collection("Users")
    .doc(user.uidvalue)
    .collection("invitations")
    .doc(invite.docID)
    .update({
      status: "accepted",
    });
};
