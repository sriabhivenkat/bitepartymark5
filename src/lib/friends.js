import { useCollection } from "@nandorojo/swr-firestore";
import { useUser } from "./user";

/*
React Hooks
*/

export const useFriends = () => {
  const { user } = useUser();
  const { data, error } = useCollection(`Users/${user?.uidvalue}/friends`, {
    listen: true,
  });

  return {
    friends: data,
    friendsMeta: {
      error,
      isLoading: !error && !data,
    },
  };
};

/*
Helper Methods
*/
