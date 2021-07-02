import { useCollection, useDocument } from "@nandorojo/swr-firestore";
import firestore from "@react-native-firebase/firestore";
import { useUser } from "./user";
import { getNearby } from "./yelp";
// import algoliasearch from "algoliasearch";
// import { pick } from "lodash";
import { useState, useEffect } from "react";

/*
React Hooks
*/

export const useRandom = (id) => {
    // console.log({ id });
    const { user } = useUser();
    const [randomId, setRandomId] = useState(id);
    const [random, setRandom] = useState({})
    const [randomMember, setRandomMember] = useState({})


    const [isRandomLoading, setIsRandomLoading] = useState(true);
    const [isRandomMemberLoading, setIsRandomMemberLoading] = useState(true);


    // useEffect(() => {
    //     const unsubscribe = firestore()
    //         .collection("Parties")
    //         .doc(id)
    //         .onSnapshot(
    //             (snapshot) => {
    //                 setRandom(snapshot.data());
    //                 setIsRandomLoading(false);
    //             },
    //             (err) => console.error(err)
    //         );
    //     return () => unsubscribe();
    // }, [id]);

    // useEffect(() => {
    //     const unsubscribe = firestore()
    //         .collection("Parties")
    //         .doc(id)
    //         .collection("members")
    //         .doc(user?.uidvalue)
    //         .onSnapshot(
    //             (snapshot) => {
    //                 setRandomMember(snapshot.data());
    //                 setIsRandomMemberLoading(false);
    //             },
    //             (err) => console.error(err)
    //         );
    //     return () => unsubscribe();
    // }, [id]);


    import { useCollection, useDocument } from "@nandorojo/swr-firestore";
    import firestore from "@react-native-firebase/firestore";
    import { useUser } from "./user";
    import { getNearby } from "./yelp";
    // import algoliasearch from "algoliasearch";
    // import { pick } from "lodash";
    import { useState, useEffect } from "react";
    /*
    React Hooks
    */

    export const useRandom = (id) => {
        // console.log({ id });
        const { user } = useUser();
        const [partyId, setPartyId] = useState(id);
        const [party, setParty] = useState({})
        const [partyMember, setPartyMember] = useState({})


        const [isPartyLoading, setIsPartyLoading] = useState(true);
        const [isPartyMemberLoading, setIsPartyMemberLoading] = useState(true);


        useEffect(() => {
            const unsubscribe = firestore()
                .collection("Parties")
                .doc(id)
                .onSnapshot(
                    (snapshot) => {
                        setParty(snapshot.data());
                        setIsPartyLoading(false);
                    },
                    (err) => console.error(err)
                );
            return () => unsubscribe();
        }, [id]);

        useEffect(() => {
            const unsubscribe = firestore()
                .collection("Parties")
                .doc(id)
                .collection("members")
                .doc(user?.uidvalue)
                .onSnapshot(
                    (snapshot) => {
                        setPartyMember(snapshot.data());
                        setIsPartyMemberLoading(false);
                    },
                    (err) => console.error(err)
                );
            return () => unsubscribe();
        }, [id]);

        // const { data: party, error: partyError } = useDocument(`Parties/${id}`, {
        //   listen: true,
        // });

        // const { data: partyMember } = useDocument(
        //   `Parties/${partyId}/members/${user?.uidvalue}`,
        //   {
        //     listen: true,
        //   }
        // );

        useEffect(() => {
            !id && setPartyId(Math.random().toString(36).substring(7));
        }, []);

        return {
            partyId,
            party,
            partyMember,
            partyMeta: {
                partyError: false,
                isLoading: isPartyLoading && isPartyMemberLoading
            },
            createParty: async (members, options) => {

                await createParty(partyId, user, members, options);
                return partyId;
            },
            // addPartySelections: async (selections, override) => {
            //     if (!partyId) {
            //         throw new Error("Party Id not set!");
            //     }
            //     await addPartySelections(partyId, user, party, selections, override);
            //     return partyId;
            // },
            //     resolveParty: async () => {
            //         if (!partyId) {
            //             throw new Error("Party Id not set!");
            //         }
            //         await resolveParty(partyId);
            //         return partyId;
            //     },
            //     endParty: async () => {
            //         if (!partyId) {
            //             throw new Error("Party Id not set!");
            //         }
            //         await endParty(partyId, user);
            //         return partyId;
            //     },
            //     leaveParty: async () => {
            //         if (!partyId) {
            //             throw new Error("Party Id not set!");
            //         }
            //         await leaveParty(partyId, user);
            //         return partyId;
            //     },
            //     addSelfToParty: async (id) => {
            //         return await addSelf(id, user)
            //     },
        };
    };

    export const usePartyData = (id) => {
        const [party, setParty] = useState({});

        firestore().collection("Parties").doc(id);
        useEffect(() => {
            const unsubscribe = firestore()
                .collection("Parties")
                .doc(id)
                .onSnapshot(
                    (snapshot) => setParty(snapshot.data()),
                    (err) => console.error(err)
                );
            return () => unsubscribe();
        }, [id]);

        return { party };
    };

    export const usePartyMembers = (id) => {
        const { data, error } = useCollection(`Parties/${id}/members`, {
            listen: true,
        });

        return {
            partyMembers: data,
            partyMeta: {
                partyMemberError: error,
                isLoading: !error && !data,
            },
        };
    };

    /*
    Helper Methods
    */

    const addPartySelections = async (id, user, party, selections, override) => {
        if (Object.keys(selections).length != party?.restaurants?.length || override)
            throw new Error("Not enough items yet");

        const partyRef = firestore().collection("Parties").doc(id);
        const partyMemberRef = partyRef.collection("members").doc(user.uidvalue);
        const historyRef = firestore()
            .collection("Users")
            .doc(user.uidvalue)
            .collection("history")
            .doc(id);

        const updatedData = party.restaurants.map((item) => ({
            ...item,
            matches: item.matches + selections[item.id],
        }));

        await partyRef.update({ restaurants: updatedData });
        await partyMemberRef.update({ status: "complete" });

        await historyRef.set(
            party.restaurants.map((item) => ({
                ...item,
                matches: selections[item.id],
            }))
        );
    };




    const createRandom = async (id, user, options) => {
        const restaurants = await getNearby(options);
        if (restaurants.length < 2) {
            throw Error("Too restrictive!");
        }
        const randomRef = firestore().collection("Random").doc(id);
        const usersRef = firestore().collection("Users");
        console.log({ options })
        await partyRef.set({
            admin: user.uidvalue,
            restrictions: {
                ...options,
            },
            autoResolve: options.autoResolve,
            restaurants,
        });

        // voodoo magic to add all members at once

    };

    const leaveParty = async (partyId, user) => {
        await firestore()
            .collection("Users")
            .doc(user.uidvalue)
            .collection("invitations")
            .doc(partyId)
            .update({
                status: "completed",
            });

        await firestore()
            .collection("Parties")
            .doc(partyId)
            .collection("members")
            .doc(user.uidvalue)
            .delete();
    };

    const resolveParty = async (partyId) => {
        const partyRef = firestore().collection("Parties").doc(partyId);


        partyRef.update({ autoResolve: true });
        console.log({ partyId })
        console.log('foo')

        const members = (await partyRef.collection("members").get()).docs.map((x) =>
            x.data()
        );
        console.log({ members });

        let membersBatch = firestore().batch();
        members.forEach((doc) => {
            const docRef = partyRef.collection("members").doc(doc.uidvalue);
            membersBatch.update(docRef, {
                status: "complete",
                rand: Math.floor(Math.random() * 10)
            });
        });

        await membersBatch.commit();
    };

    const endParty = async (partyId, user) => {
        // voodoo magic to add all members at once
        const partyRef = firestore().collection("Parties").doc(partyId);

        await leaveParty(partyId, user);


        // const res = await partyRef.collection("members").get()

        // res.docs.

        const members = (await partyRef.collection("members").get()).docs.map((x) =>
            x.data()
        );

        console.log({ members });
        let invitesBatch = firestore().batch();
        members.forEach((doc) => {
            try {
                const docRef = firestore()
                    .collection("Users")
                    .doc(doc.uidvalue)
                    .collection("invitations")
                    .doc(partyId);
                invitesBatch.update(docRef, {
                    status: "completed",
                });
            } catch {
                console.error("Couldn't add to batch");
            }
        });

        invitesBatch.commit();

        // partyRef.
    };


    const addSelf = (partyId, user) => {
        const partyRef = firestore().collection("Parties").doc(partyId);
        const usersRef = firestore().collection("Users");

        partyRef.collection("members").doc(user.uidvalue).set({
            ...user,
            status: "accepted"
        })

        const inviteRef = usersRef.doc(user.uidvalue).collection("invitations").doc(partyId);
        inviteRef.set({
            timestamp: firestore.FieldValue.serverTimestamp(),
            inviter: user.uidvalue,
            inviterHandle: user.handle,
            isDuo: false,
            status: "accepted",
            imagePath: user.imageUrl,
            docID: partyId,
        });


    }
    // const { data: random, error: randomError } = useDocument(`Parties/${id}`, {
    //   listen: true,
    // });

    // const { data: randomMember } = useDocument(
    //   `Parties/${randomId}/members/${user?.uidvalue}`,
    //   {
    //     listen: true,
    //   }
    // );

    useEffect(() => {
        !id && setRandomId(Math.random().toString(36).substring(7));
    }, []);

    return {
        randomId,
        random,
        randomMember,
        randomMeta: {
            randomError: false,
            isLoading: isRandomLoading && isRandomMemberLoading
        },
        createRandom: async (members, options) => {
            if (!randomId) {
                throw new Error("Random Id not set!");
            }
            await createRandom(randomId, user, members, options);
            return randomId;
        },
        addRandomSelections: async (selections, override) => {
            if (!randomId) {
                throw new Error("Random Id not set!");
            }
            await addRandomSelections(randomId, user, random, selections, override);
            return randomId;
        },
        resolveRandom: async () => {
            if (!randomId) {
                throw new Error("Random Id not set!");
            }
            await resolveRandom(randomId);
            return randomId;
        },
        endRandom: async () => {
            if (!randomId) {
                throw new Error("Random Id not set!");
            }
            await endRandom(randomId, user);
            return randomId;
        },
        leaveRandom: async () => {
            if (!randomId) {
                throw new Error("Random Id not set!");
            }
            await leaveRandom(randomId, user);
            return randomId;
        },
        addSelfToRandom: async (id) => {
            return await addSelf(id, user)
        },
    };
};

export const useRandomData = (id) => {
    const [random, setRandom] = useState({});

    firestore().collection("Parties").doc(id);
    useEffect(() => {
        const unsubscribe = firestore()
            .collection("Parties")
            .doc(id)
            .onSnapshot(
                (snapshot) => setRandom(snapshot.data()),
                (err) => console.error(err)
            );
        return () => unsubscribe();
    }, [id]);

    return { random };
};

export const useRandomMembers = (id) => {
    const { data, error } = useCollection(`Parties/${id}/members`, {
        listen: true,
    });

    return {
        randomMembers: data,
        randomMeta: {
            randomMemberError: error,
            isLoading: !error && !data,
        },
    };
};

/*
Helper Methods
*/

const addRandomSelections = async (id, user, random, selections, override) => {
    if (Object.keys(selections).length != random?.restaurants?.length || override)
        throw new Error("Not enough items yet");

    const randomRef = firestore().collection("Parties").doc(id);
    const randomMemberRef = randomRef.collection("members").doc(user.uidvalue);
    const historyRef = firestore()
        .collection("Users")
        .doc(user.uidvalue)
        .collection("history")
        .doc(id);

    const updatedData = random.restaurants.map((item) => ({
        ...item,
        matches: item.matches + selections[item.id],
    }));

    await randomRef.update({ restaurants: updatedData });
    await randomMemberRef.update({ status: "complete" });

    await historyRef.set(
        random.restaurants.map((item) => ({
            ...item,
            matches: selections[item.id],
        }))
    );
};




const createRandom = async (id, user, options) => {
    const restaurants = await getNearby();

    return restaurants
    // voodoo magic to add all members at once
};

const leaveRandom = async (randomId, user) => {
    await firestore()
        .collection("Users")
        .doc(user.uidvalue)
        .collection("invitations")
        .doc(randomId)
        .update({
            status: "completed",
        });

    await firestore()
        .collection("Parties")
        .doc(randomId)
        .collection("members")
        .doc(user.uidvalue)
        .delete();
};

const resolveRandom = async (randomId) => {
    const randomRef = firestore().collection("Parties").doc(randomId);


    randomRef.update({ autoResolve: true });
    console.log({ randomId })
    console.log('foo')

    const members = (await randomRef.collection("members").get()).docs.map((x) =>
        x.data()
    );
    console.log({ members });

    let membersBatch = firestore().batch();
    members.forEach((doc) => {
        const docRef = randomRef.collection("members").doc(doc.uidvalue);
        membersBatch.update(docRef, {
            status: "complete",
            rand: Math.floor(Math.random() * 10)
        });
    });

    await membersBatch.commit();
};

const endRandom = async (randomId, user) => {
    // voodoo magic to add all members at once
    const randomRef = firestore().collection("Parties").doc(randomId);

    await leaveRandom(randomId, user);


    // const res = await randomRef.collection("members").get()

    // res.docs.

    const members = (await randomRef.collection("members").get()).docs.map((x) =>
        x.data()
    );

    console.log({ members });
    let invitesBatch = firestore().batch();
    members.forEach((doc) => {
        try {
            const docRef = firestore()
                .collection("Users")
                .doc(doc.uidvalue)
                .collection("invitations")
                .doc(randomId);
            invitesBatch.update(docRef, {
                status: "completed",
            });
        } catch {
            console.error("Couldn't add to batch");
        }
    });

    invitesBatch.commit();

    // randomRef.
};


const addSelf = (randomId, user) => {
    const randomRef = firestore().collection("Parties").doc(randomId);
    const usersRef = firestore().collection("Users");

    randomRef.collection("members").doc(user.uidvalue).set({
        ...user,
        status: "accepted"
    })

    const inviteRef = usersRef.doc(user.uidvalue).collection("invitations").doc(randomId);
    inviteRef.set({
        timestamp: firestore.FieldValue.serverTimestamp(),
        inviter: user.uidvalue,
        inviterHandle: user.handle,
        isDuo: false,
        status: "accepted",
        imagePath: user.imageUrl,
        docID: randomId,
    });


}