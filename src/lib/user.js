import { useContext } from "react";
import { AuthContext } from "../navigation/AuthProvider.js";
import { useDocument } from "@nandorojo/swr-firestore";

/*
React Hooks
*/

export const useUser = () => {
  const { user: ctxUser } = useContext(AuthContext);
  const { data, error, update } = useDocument(`Users/${ctxUser.uid}`);

  return {
    user: data,
    userMeta: {
      error,
      isLoading: !error && !data,
    },
    updateUser: update,
  };
};

/*
Helper Methods
*/
