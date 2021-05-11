import { useCollection } from "@nandorojo/swr-firestore";
import firestore from "@react-native-firebase/firestore";
import { useUser } from "./user";

/*
React Hooks
*/

export const useInvites = () => {
  const { user } = useUser();
  const { data, error } = useCollection(`Users/${user?.uidvalue}/invitations`, {
    orderBy: ["timestamp", "desc"],
    listen: true,
  });

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



export const useCurrentParty = () => {
  const { user } = useUser();
  const { data, error } = useCollection(`Users/${user?.uidvalue}/currentParty`);

  return {
    currParties: data,
    invitesMeta: {
      error,
      isLoading: !error && !data,
    },

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
  console.log({ invite });
  // update my party status
  await firestore()
    .collection("Parties")
    .doc(invite.docID)
    .collection("members")
    .doc(user.uidvalue)
    .update({ status: "accepted" });
  console.log("foo");

  // update my invite status
  await firestore()
    .collection("Users")
    .doc(user.uidvalue)
    .collection("invitations")
    .doc(invite.id)
    .update({
      status: "accepted",
    });

  console.log("bar");
};
