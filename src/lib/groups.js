import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import { useDocument } from "@nandorojo/swr-firestore";
import { useUser } from "./user";
import { keyBy } from "lodash";

export const useGroup = (id) => {
  const [groupName, setGroupName] = useState();
  const [groupMembers, setGroupMembers] = useState();
  const { user } = useUser();

  // useEffect(() => firestore()
  //     .collectionGroup('members')
  //     .where("isGroup", '==', true)
  //     .where('status', '==', "accepted") //filter by user uidvalue
  //     .get()
  //     .then((res) => {
  //         const results = res.docs.map((x) => x.data());
  //         console.log(results);
  //         const filtered = results.filter(resval => resval?.uidval === user?.uidvalue)
  //        filtered[0].
  //         console.log("groups array is: ", groups)
  //     })
  //     .catch((err) => console.log(err)), [])

  useEffect(() => {
    getGroup(id)
      .then((name) => setGroupName(name))
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    getMembers(id)
      .then((members) => setGroupMembers(members))
      .catch((err) => console.log(err));
  });

  return {
    groupName,
    groupMembers,
  };
};

export const useGroups = () => {
  const { user } = useUser();
  const [data, setData] = useState([]);

  useEffect(() => {
    firestore()
      .collection("Groups")
      .where(`members.${user.uidvalue}.exists`, "==", true)
      .get()
      .then((res) => {
        const results = res.docs.map((x) => x.data());
        // console.log("yuh yuh yuh")
        console.log("this is results", results);
        setData(results);
      })
      .catch((err) => console.log(err));
  }, [user]);

  return { groups: data };
};

// const {groupName, groupMembers} = useGroup(id)

export const createGroup = async (members, name, user) => {
  var groupId = Math.random().toString(36).substring(8);

  var localArray = [];
  const groupRef = firestore().collection("Groups");
  const usersRef = firestore().collection("Users");
  await groupRef
    .doc(groupId)
    .collection("members")
    .doc(user?.uidvalue)
    .set({
      name: user?.handle,
      groupID: groupId,
      uidval: user?.uidvalue,
      imageUrl: user?.imageUrl,
      firstName: user?.firstName,
      isGroup: true,
      status: "accepted",
    })
    //.then(() => {localArray.push(user?.firstName)})
    .catch((err) => console.log(err));

  // let membersBatch = firestore().batch();
  // array.forEach((doc) => {
  //     const docRef = groupRef.doc(groupId).collection("members").doc(doc?.uidvalue);
  //     membersBatch.set(docRef, {
  //         name: doc?.handle,
  //         groupID: groupId,
  //         uidval: doc?.uidvalue,
  //         imageUrl: doc?.imageUrl,
  //         firstName: doc?.firstName,
  //         isGroup: true,
  //         status: "pending",
  //     })
  //     localArray.push(doc?.uidvalue)
  // })
  // localArray.push(user?.uidvalue);
  // await groupRef.doc(groupId).set({
  //     members: localArray,
  // })
  await groupRef.doc(groupId).set({
    partyName: name,
    members: keyBy(
      [...members, user].map((m) => ({ ...m, exists: true })),
      "uidvalue"
    ),
    groupid: groupId,
  });
};

export const getGroup = async (id) => {
  const groupRef = firestore().collection("Groups");
  const nameGet = await groupRef.doc(id).get();
  const { partyName } = nameGet.data();
  return partyName;
};

export const getMembers = async (id) => {
  const membersRef = firestore().collection("Groups").doc(id);
  const members = await membersRef.collection("members").get();
  return members.docs
    .map((x) => x.data())
    .map(({ imageUrl, firstName }) => ({ imageUrl, firstName }));
};

export const getGroups = () => {
  const { user } = useUser();

  const unsub = firestore()
    .collectionGroup("members")
    .where("isGroup", "==", true)
    .where("status", "==", "accepted") //filter by user uidvalue
    .onSnapshot(
      (snapshot) => {
        const results = snapshot.docs.map((x) => x.data());
        console.log(results);
        const filtered = results.filter(
          (resval) => resval?.uidval === user?.uidvalue
        );
        console.log(filtered);

        console.log("groups array is: ", groups);
      },
      (err) => console.error(err)
    );
  return unsub;
};

export const addGroup = async (id, user) => {
  firestore()
    .collection("Groups")
    .doc(id)
    .collection("members")
    .doc(user?.uidvalue)
    .update({
      status: "accepted",
    })
    .then(() => {
      console.log("yuh yuh yuh");
    });
  // return console.log("yuh yuh yuh")
};

export const rejectGroup = async (id, user) => {
  firestore()
    .collection("Groups")
    .doc(id)
    .collection("members")
    .doc(user?.uidvalue)
    .delete()
    .then(() => {
      console.log("chortle my balls");
    });
};
