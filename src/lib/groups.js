import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import { useDocument } from "@nandorojo/swr-firestore";

export const createGroup = async(array, name, user) => {
    var groupId = Math.random().toString(36).substring(8);
    
    
    const groupRef = firestore().collection("Groups");
    const usersRef = firestore().collection("Users");

    await groupRef.doc(groupId).set({
        partyName: name,
    })
    await groupRef.doc(groupId).collection("members").doc(user?.uidvalue).set({
        name: user?.handle,
        groupID: groupId,
        uidval: user?.uidvalue,
        isGroup: true,
        status: "accepted"
    }).catch((err) => console.log(err))

    let membersBatch = firestore().batch();
    array.forEach((doc) => {
        const docRef = groupRef.doc(groupId).collection("members").doc(doc?.uidvalue);
        membersBatch.set(docRef, {
            name: doc?.handle,
            groupID: groupId,
            uidval: doc?.uidvalue,
            isGroup: true,
            status: "pending",
        })
    })
    await membersBatch.commit()
}

export const useGroup = async(id) => {
    const {data, error, update} = useDocument(`Groups/${id}`);
    return {
        groupval: data,
        groupMeta: {
            error,
            isLoading: !error && !data,
        },
        updateGroup: update,
    };
};