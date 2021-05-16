import { useCollection } from "@nandorojo/swr-firestore";
import { useUser } from "./user";

/*
React Hooks
*/

export const useFriends = () => {
  const { user } = useUser();
  const { data, error, add } = useCollection(
    `Users/${user?.uidvalue}/friends`,
    {
      listen: true,
      shouldRetryOnError: true,
    }
  );

  return {
    friends: data,
    addFriend: add,
    friendsMeta: {
      error,
      isLoading: !error && !data,
    },
  };
};

/*
Helper Methods
*/
