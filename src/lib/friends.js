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
    console.log({ user });
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
  console.log({ data });
  const ref = firestore()
    .collection("Users")
    .doc(user?.uidvalue)
    .collection("friends")
    .doc(data.uidvalue);

  return await ref.set(data);
};
