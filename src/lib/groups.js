import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import { useDocument } from "@nandorojo/swr-firestore";



export const useGroup = (id) => {
    const [groupName, setGroupName] = useState();
    const [groupMembers, setGroupMembers] = useState();


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
        getGroup(id).then((name) => setGroupName(name)).catch(err => console.log(err))
    }, [id])

    useEffect(() => {
        getMembers(id).then((members) => setGroupMembers(members)).catch(err => console.log(err))
    })


    return {
        groupName,
        groupMembers
    }

}


// const {groupName, groupMembers} = useGroup(id)


export const createGroup = async (array, name, user) => {
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
        imageUrl: user?.imageUrl,
        firstName: user?.firstName,
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
            imageUrl: doc?.imageUrl,
            firstName: doc?.firstName,
            isGroup: true,
            status: "pending",
        })
    })
    await membersBatch.commit()
}

export const getGroup = async (id) => {
    const groupRef = firestore().collection("Groups");
    const nameGet = await groupRef.doc(id).get()
    const { partyName } = nameGet.data();
    return partyName;
};

export const getMembers = async (id) => {
    const membersRef = firestore().collection("Groups").doc(id)
    const members = await membersRef.collection("members").get();
    return members.docs.map((x) => x.data())
        .map(({ imageUrl, firstName }) => ({ imageUrl, firstName }));
}