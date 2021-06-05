import { useContext } from "react";
import { AuthContext } from "../navigation/AuthProvider.js";
import { useDocument } from "@nandorojo/swr-firestore";
import firestore from "@react-native-firebase/firestore";
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
    updateUser: async (updatedData) => {
      const docs = (await firestore().collection("Users").where("handle", "==", updatedData.handle.toLowerCase()).get()).docs.map(x => x.data())
      console.log(docs)
      console.log('foo', docs.length)
      if (docs.filter(d => d.uidvalue != data.uidvalue).length > 0) {
        console.log('bar')
        throw new Error(`Username ${updatedData.handle.toLowerCase()} already taken`)
      } else {
        console.log('bix')
        await update({...updatedData, handle: updatedData.handle.toLowerCase()});
      }
    },
  };
};

/*
Helper Methods
*/
