import { useCollection } from "@nandorojo/swr-firestore";
import { useUser } from "./user";
import firestore from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";
/*
React Hooks
*/

export const useFriends = () => {
  const { user } = useUser();
  // const { data, error, add } = useCollection(
  //   `Users/${user?.uidvalue}/friends`,
  //   {
  //     listen: true,
  //     shouldRetryOnError: true,
  //   }
  // );

  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const unsub = firestore()
      .collection("Users")
      .doc(user?.uidvalue)
      .collection("friends")
      .onSnapshot(
        (snap) => setData(snap.docs.map((x) => x.data())),
        (err) => setError(err)
      );
    return unsub;
  }, [user]);

  return {
    friends: data,
    addFriend: async (data) => addFriend(user, data),
    acceptFriend: async (data) => acceptFriend(user, data),
    rejectFriend: async (data) => rejectFriend(user, data),

    friendsMeta: {
      error,
      isLoading: !error && !data,
    },
  };
};

/*
Helper Methods
*/

const addFriend = async (user, data) => {
  const ret = await firestore()
    .collection("Users")
    .doc(user?.uidvalue)
    .collection("friends")
    .doc(data.uidvalue)
    .set({ ...data, friendStatus: "sent" });

  await firestore()
    .collection("Users")
    .doc(data.uidvalue)
    .collection("friends")
    .doc(user.uidvalue)
    .set({ ...user, friendStatus: "pending" });

  return ret;
};

const acceptFriend = async (user, data) => {
  // console.log({user})
  // console.
  const ret = await firestore()
    .collection("Users")
    .doc(user?.uidvalue)
    .collection("friends")
    .doc(data.uidvalue)
    .update({ friendStatus: "accepted" });

  await firestore()
    .collection("Users")
    .doc(data.uidvalue)
    .collection("friends")
    .doc(user.uidvalue)
    .update({ friendStatus: "accepted" });

  return ret;
};

const rejectFriend = async (user, data) => {
  // console.log({user})
  // console.
  const ret = await firestore()
    .collection("Users")
    .doc(user?.uidvalue)
    .collection("friends")
    .doc(data.uidvalue)
    .delete();
  await firestore()
    .collection("Users")
    .doc(data.uidvalue)
    .collection("friends")
    .doc(user.uidvalue)
    .delete();

  return ret;
};
