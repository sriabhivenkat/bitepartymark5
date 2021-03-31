import React, { useContext, useState, useEffect } from 'react';
import { View, Image, StyleSheet, Share } from 'react-native';
import { Text } from 'galio-framework';
import { Avatar } from 'react-native-paper';
import { AuthContext } from '../navigation/AuthProvider.js';
import { ListItem  } from 'react-native-elements';
import firestore, { firebase } from "@react-native-firebase/firestore";
import LinearGradient from 'react-native-linear-gradient';
import TouchableScale from 'react-native-touchable-scale';
import { TouchableOpacity } from "react-native-gesture-handler";
import dynamicLinks from '@react-native-firebase/dynamic-links';

const AddDuosViewController = ({ route, navigation }) => {
    const [groupId, setGroupId] = useState("")
    const [duosmember, setDuosMember] = useState([]);
    const [query, setQuery] = useState("");
    const { user } = useContext(AuthContext);
    const [selectedPeople, setSelectedPeople] = useState([]);
    const [userHandle, setUserHandle] = useState("");
    const [imagePath, setImagePath] = useState("");

    useEffect(() => {
        const main = async () => {
            const refVal = firestore().collection("Users").doc(user.uid);
            const doc = await refVal.get();
            const { handle } = doc.data();
            const { imageUrl } = doc.data();
            setUserHandle(handle)
            setImagePath(imageUrl);
        };
        main();
    }, []);

    useEffect(() => {
        firestore()
            .collection("Users")
            .doc(user.uid)
            .collection("friends")
            .get()
            .then((res) => {
                const results = res.docs.map((x) => x.data());
                setDuosMember(results);
            })

            .catch((err) => alert(err));
    }, [query]);

    useEffect(() => setGroupId(Math.random().toString(36).substring(7)), [])
    

    const generateLink = async (groupId) => {
        const link = await dynamicLinks().buildShortLink({
            link: `https://biteparty.app/join?id=${groupId}`,
            domainUriPrefix: 'https://biteparty.page.link',
            androidInfo: {
                androidPackageName: "com.kastech.biteparty"
            },
            iosInfo: {
                iosBundleId: "com.kastech.biteparty"
            }
        });
        // alert(link)
        console.log(link)

        return link;
    }

    const onShare = async ({ url }) => {
        try {
            const result = await Share.share({
                message: `BiteParty | Join the party! ${url}`,
            });
 
        } catch (error) {
            alert(error.message);
        }
    };

    console.log(selectedPeople)
    return (
        <View style={styles.container}>
            <Text h3 style={styles.title}>Who's coming?</Text>

            {duosmember.map((item) => (
                <View style={{ marginTop: "-2%" }}>
                    <ListItem
                        Component={TouchableScale}
                        friction={90}
                        tension={100}
                        containerStyle={selectedPeople.includes(item.uidvalue) && {backgroundColor: '#edf0f5'}}
                        activeScale={0.95}
                        onPress={() => {
                            if (selectedPeople.includes(item.uidvalue)) {
                                setSelectedPeople(selectedPeople.filter(i => i!= item.uidvalue))
                            } else {
                                setSelectedPeople([item.uidvalue, ...selectedPeople])
                                // setIsPressed(true);
                            }
                        }}
                        style={{ borderBottomColor: "lightgray", borderBottomWidth: 1, borderTopColor: "lightgray", borderTopWidth: 1 }}
                    >
                        <Avatar.Image size={45} source={{ uri: item.imageUrlPath }} />
                        <ListItem.Content style={styles.queryContent}>
                            <ListItem.Title style={styles.querytitle}>{"@" + item.handle}</ListItem.Title>
                            <ListItem.Subtitle style={styles.querysubtitle}>{item.firstName + " " + item.lastName}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                </View>
            ))}
            <View style={styles.buttonContainer}>
                {selectedPeople.length!=0 &&
                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.9}
                        onPress={() => {
                            navigation.navigate('Filters', { admin: { uid: user.uid, profileImage: imagePath, handle: userHandle}, partyID: groupId, imagePath, members: selectedPeople.map(id => duosmember.find(({uidvalue}) => uidvalue == id)), userHandle, selectedPeople});
                        }}
                        style={{ height: 50, marginHorizontal: "20%", marginVertical: 15 }}
                    >
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={["#ee0979", "#f76f6d", '#ff6a00']}
                            style={{ height: "100%", justifyContent: "center", alignItems: "center", borderRadius: 15}}>
                            <Text style={{ color: "white", fontFamily: "PingFangHK-Regular", fontSize: 17, }}>Done</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                }
                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.9}
                    onPress={async () => onShare({ url: await generateLink(groupId) })}
                    style={{ height: 50, marginHorizontal: "20%", marginVertical: 15 }}
                >
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={["#ee0979", "#f76f6d", '#ff6a00']}
                        style={{ height: "100%", justifyContent: "center", alignItems: "center", borderRadius: 15 }}>
                        <Text style={{ color: "white", fontFamily: "PingFangHK-Regular", fontSize: 17, }}>Share link 🔗</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default AddDuosViewController;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    queryView: {
        flex: 0.13,
        backgroundColor: "#16335e",
        marginTop: 20
    },
    queryContent: {
        width: "80%"
    },
    containercolumn: {
        flex: 0.25,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "15%",
    },
    button: {
        marginTop: 20,
        height: 37,
        width: "50%",
        backgroundColor: "#F76F6D",
        borderRadius: 15,
    },
    title: {
        padding: "5%",
        fontFamily: "PingFangHK-Medium",
        color: "#f76f6d",
        textAlign: "center",
        marginTop: "10%"
    },
    queryResults: {
        marginTop: 20,
        backgroundColor: "#16335e"
    },
    pfp: {
        alignItems: "center"
    },
    querytitle: {
        fontWeight: "bold",
        color: "black",
        textAlign: "center"
    },
    querysubtitle: {
        color: "black"
    },
    modalStyling: {
        display: "flex",
        backgroundColor: "white",
        position: "absolute",
        padding: "20%",
        bottom: "-7%",
        left: 0,
        right: "-2.5%"
    },
    modalTitle: {
        padding: "5%",
        fontFamily: "PingFangHK-Medium",
        color: "#f76f6d",
        textAlign: "center",
    },
    buttonContainer: {
        position: "absolute",
        bottom: 0,
        display: "flex",
        width: "100%"

    }
});