import { useContext } from "react";
import { AuthContext } from "../navigation/AuthProvider.js";
import { useDocument } from "@nandorojo/swr-firestore";
import firestore from "@react-native-firebase/firestore";
/*
React Hooks
*/

export const useUser = () => {
  const { user: ctxUser } = useContext(AuthContext);
  const { data, error, update, mutate} = useDocument(`Users/${ctxUser.uid}`);

return {
    user: data,
    userMeta: {
      error,
      isLoading: !error && !data,
    },
    updateUser: async (updatedData) => {
      const docs = (await firestore().collection("Users").where("handle", "==", updatedData.handle.toLowerCase()).get()).docs.map(x => x.data())
      if (docs.filter(d => d.uidvalue != data.uidvalue).length > 0 ) {
        throw new Error(`Username ${updatedData.handle.toLowerCase()} already taken`)
      } else {
        console.log('bix')
        await update({...updatedData, handle: updatedData.handle.toLowerCase()});
        await mutate({...updatedData, handle: updatedData.handle.toLowerCase()})
      }
    },
  };
};

/*
Helper Methods
*/
