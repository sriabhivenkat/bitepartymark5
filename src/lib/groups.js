import firestore from "@react-native-firebase/firestore";
import { useUser } from "./user";
import { useState, useEffect } from "react";


export const createGroup = async(array, name) => {
    const {user} = useUser();
    const [groupId, setGroupId] = useState("");
    useEffect(() => {
        setGroupId(Math.random().toString(36).substring(8));
      }, []);
    const groupRef = firestore().collection("Groups");
    const usersRef = firestore().collection("Users");

    await groupRef.doc(groupId).set({
        partyName: name,
    })
    await groupRef.doc(groupId).collection("members").doc(user?.uidvalue).set({
        status: "accepted"
    })

    let membersBatch = firestore().batch();
    array.forEach((doc) => {
        const docRef = groupRef.doc(groupId).collection("members").doc(doc?.uidvalue);
        membersBatch.set(docRef, {
            status: "pending"
        })
    })
    await membersBatch.commit()
}