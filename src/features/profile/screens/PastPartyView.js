import React, { useRef, useMemo, useState, useEffect } from "react";
import {
    SafeAreaView,
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Text,
    StatusBar,
    Linking,
    Platform,
} from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { FlatList, Dimensions } from "react-native";
import MemberCard from "components/MemberCard";
import { Divider, Chip, Modal } from "react-native-paper";
import {
    usePartyData,
    usePartyMembers,
    useParty,
    useUser,
    useAsyncStorage,
} from "lib";
import { TitleText, SubtitleText } from "components";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ImageBackground } from "react-native";
import { GradientButton, PartyCard, RestarauntCard } from "../../../components";
import LinearGradient from "react-native-linear-gradient";
import { Alert } from "react-native";
import InAppReview, { RequestInAppReview } from "react-native-in-app-review";
import uuid from "react-native-uuid";
import ImagePicker from "react-native-image-crop-picker";
import Swiper from "react-native-deck-swiper";
import firestore, { firebase } from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import CustomRate from "components/CustomRate";
import moment from "moment";
import InAppBrowser from "react-native-inappbrowser-reborn";

const PastPartyView = ({ route, navigation }) => {
    const { partyID, timeStamp } = route.params;
    const { resolveParty, endParty, leaveParty } = useParty(partyID);
    const { partyMembers } = usePartyMembers(partyID);
    const { user } = useUser();
    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ["1%", "70%"], []);

    const { party } = usePartyData(partyID);

    const [modalVisible, setModalVisible] = useState(false);
    const [modal2Visible, setModal2Visible] = useState(false);
    const [distance, setDistance] = useState("");
    const [eta, setETA] = useState("")
    const hasNavigated = useRef(false);
    const [infoVisible, setInfoVisible] = useState(false);

    const handleSwipeUp = (item) => {
        setInfoVisible(true);
        // setModalData(item);
    };

    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);

    const show2Modal = () => setModal2Visible(true);
    const hide2Modal = () => setModal2Visible(false);

    const times = new Date(timeStamp.toDate())


    const currentWinner = party?.winner
        ? party?.winner
        : party?.restaurants &&
        party?.restaurants.sort((a, b) => b.matches - a.matches)[0];

    const [win, setWin] = useState(currentWinner)
    // links for opening maps
    const url = Platform.select({
        ios: `maps:0,0?q=${currentWinner?.location.display_address}`,
        android: `geo:0,0?q=${currentWinner?.location.display_address}`,
    });

    const handleTap = () => {
        InAppBrowser.open(currentWinner?.url);
    }




    useEffect(() => {
        const main = async () => {
            const position = await getUserLocation();
            console.log([position[0], position[1]])
            console.log(currentwinner?.coordinates.latitude, currentWinner?.coordinates.longitude)
            const time = await timeToDestination(
                position[0], position[1],
                currentWinner?.coordinates.latitude,
                currentWinner?.coordinates.longitude
            )
            console.log("time to get there is:", time);
            setETA(time[0]);
            setDistance(time[1]);
            // const time = await timeToDestination(29.7174, -95.4018, 29.539869, -95.597939)
        }
        main();
    }, [currentWinner])



    return (
        <SafeAreaView backgroundColor="#fff" flex={1}>
            <StatusBar barStyle="dark-content" />
            <View flex={1}>


                <View style={styles.container}>
                    {party && party.winner && (
                        <>
                            <View marginTop={10}>
                                {/* <TitleText
                numberOfLines={1}
                adjustsFontSizeToFit
                style={{ color: "#F76F6D", fontSize: 60, textAlign: "center" }}
              >
                Cheers!
              </TitleText> */}
                                {/* <SubtitleText
                numberOfLines={1}
                adjustsFontSizeToFit
                style={{
                  fontSize: 30,
                  textAlign: "center",
                  position: "relative",
                  bottom: 10,
                }}
              >
                Restaraunt Chosen
              </SubtitleText> */}

                                <TitleText
                                    style={{
                                        marginTop: 10,
                                        marginBottom: 15,
                                        textAlign: "center",
                                        fontSize: 35,
                                        marginBottom: 20
                                    }}
                                >
                                    Party from {moment(times).format("MMM Do")}
                                </TitleText>
                                {/* <View backgroundColor="#00000050" height={1} marginBottom={15} /> */}
                            </View>
                            <View flex={1} marginTop={25} position="relative" top={30} >
                                <TouchableOpacity style={{ flex: 1 }} onPress={handleTap}>
                                    <RestarauntCard
                                        style={{ flexShrink: 0 }}
                                        data={currentWinner}
                                        compact
                                    />
                                </TouchableOpacity>
                            </View>



                            {/* <Modal
                style={{ padding: 30 }}
                visible={modalVisible}
                onDismiss={hideModal}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    alignItems: "center",
                    borderRadius: 15,
                  }}
                  padding={20}
                >
                  <Text style={{ fontWeight: "600", fontSize: 20, marginBottom: 10 }}>
                    Rate your party!
                  </Text> */}
                            {/* <Rating
                    type="custom"
                    ratingImage={starImg}
                    ratingCount={5}
                    imageSize={50}
                    onFinishRating={setRatingVal}
                    ratingColor="#F76F6D"
                    startingValue="0"
                    jumpValue="1"
                  />
                  <AirbnbRating
                    selectedColor="#F76F6D"
                    reviewColor="#F76F6D"
                    starImage={starImg}
                    starContainerStyle={{}}
                  ></AirbnbRating> */}
                            {/* 
                  <CustomRate rating={rating} setRating={setRating} />
                  <GradientButton
                    containerStyle={{ marginTop: 20 }}
                    onPress={() => handleClick()}
                  >
                    <Text>Submit</Text>
                  </GradientButton>
                </View>
              </Modal> */}



                            <Modal
                                style={{ padding: 30, }}
                                visible={modal2Visible}
                                onDismiss={hide2Modal}
                            >
                                <View
                                    style={{
                                        backgroundColor: "white",
                                        alignItems: "center",
                                        borderRadius: 15,
                                        height: 225,
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Text style={{ fontWeight: "600", fontSize: 15, marginTop: 10, fontFamily: 'Kollektif' }}>
                                        Would you like to submit a photo of the menu?
                  </Text>

                                    <TouchableOpacity
                                        style={{ alignItems: "center" }}
                                        onPress={() => openCamera()}
                                    >
                                        <Ionicons name="camera" size={80} />
                                        <Text>Add Image of Menu</Text>
                                    </TouchableOpacity>

                                    <GradientButton
                                        containerStyle={{ marginTop: 10, paddingHorizontal: 10, marginBottom: 10 }}
                                        onPress={() =>
                                            endParty()
                                                .then(
                                                    navigation.reset({
                                                        index: 0,
                                                        routes: [{ name: "home" }],
                                                    })
                                                )
                                                .catch((err) => console.error(err))
                                        }
                                    >
                                        <Text>Leave Party</Text>
                                    </GradientButton>


                                </View>

                            </Modal>
                        </>
                    )}






                </View>

                {party && party.winner && <View height={30} />}

                <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints} style={{ width: "100%" }}>
                    <BottomSheetScrollView style={styles.bottomSheetContainer}>
                        <View style={{ top: 10, left: 22, marginBottom: 30, marginTop: 10 }}>
                            <Text h4 style={{ fontFamily: "Kollektif", color: "#f76f6d" }}>
                                Address
            </Text>
                            <Text style={{ fontFamily: "Kollektif", top: 5, fontSize: 25 }}>
                                {currentWinner?.location.address1}
                                {/* <Text>{JSON.stringify(currentWinner, null, 2)}</Text> */}
                            </Text>
                            <Text style={{ fontFamily: "Kollektif", top: 5, fontSize: 25 }}>
                                {currentWinner?.location.city +
                                    ", " +
                                    currentWinner?.location.state +
                                    " " +
                                    currentWinner?.location?.zip_code}
                            </Text>
                        </View>
                        <Divider />
                        <View
                            style={{
                                top: 10,
                                left: 22,
                                marginBottom: 22.5,
                                marginTop: 10,
                            }}
                        >
                            <Text
                                style={{ fontFamily: "Kollektif", color: "#f76f6d", fontSize: 17 }}
                            >
                                Distance
                  </Text>
                            <Text

                                style={{ fontFamily: "Kollektif", top: 5, fontSize: 25 }}
                            >
                                {distance}les ({eta} away)
                  </Text>
                        </View>
                        <Divider />
                        <View
                            style={{ top: 10, left: 22, marginBottom: 22.5, marginTop: 10 }}
                        >
                            <Text h4 style={{ fontFamily: "Kollektif", color: "#f76f6d" }}>
                                Phone
            </Text>
                            <Text style={{ fontFamily: "Kollektif", top: 5, fontSize: 25 }}>
                                {currentWinner?.display_phone}
                            </Text>
                        </View>

                        <Divider />
                        <View
                            style={{ top: 10, left: 22, marginBottom: 22.5, marginTop: 10 }}
                        >
                            <Text h4 style={{ fontFamily: "Kollektif", color: "#f76f6d" }}>
                                Filters
              </Text>
                            <View
                                flexDirection="row"
                                flexWrap="wrap-reverse"
                                style={{ marginTop: 5 }}
                            >
                                {currentWinner?.categories.map((item, i) => (
                                    <Chip
                                        key={i}
                                        textAlign="center"
                                        marginRight={10}
                                        flex={0}
                                        marginVertical={2}
                                        style={{
                                            justifyContent: "center",
                                            alignItems: "center",
                                            marginTop: "1.5%",
                                        }}
                                        textStyle={{
                                            fontSize: 17,
                                            fontWeight: "bold",
                                            fontFamily: "Kollektif",
                                        }}
                                    >
                                        {item.title}
                                    </Chip>
                                ))}
                            </View>
                            <View flexDirection="row" flexWrap="wrap-reverse">
                                {currentWinner?.price != null && (
                                    <Chip
                                        textAlign="center"
                                        marginRight={10}
                                        flex={0}
                                        marginVertical={2}
                                        style={{
                                            justifyContent: "center",
                                            alignItems: "center",
                                            marginTop: "1.5%",
                                        }}
                                        textStyle={{
                                            fontSize: 17,
                                            fontWeight: "bold",
                                            fontFamily: "Kollektif",
                                        }}
                                    >
                                        {currentWinner?.price}
                                    </Chip>
                                )}
                            </View>
                        </View>
                        <Divider />
                        <View alignItems="center" justifyContent="center">
                            <GradientButton
                                containerStyle={{
                                    position: "relative",
                                    width: "95%",

                                }}
                                innerStyle={{ paddingVertical: 10 }}
                                textStyle={{ fontSize: 22 }}
                                onPress={() => {
                                    Linking.openURL(url); //idk comment
                                }}
                            >
                                Take me here!
              </GradientButton>
                        </View>

                    </BottomSheetScrollView>
                </BottomSheet>

            </View>
        </SafeAreaView>

    );
};

export default PastPartyView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 20,
    },
    buttonContainer: {
        justifyContent: "center",
    },
    card: {
        borderRadius: 25,
        shadowRadius: 2,
        marginHorizontal: 20,
        width: Dimensions.get("window").width - 20 * 2,
    },
    innerCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 25,
        paddingVertical: 25,
    },
    background: {
        flexDirection: "row",
        minHeight: 40,
        borderRadius: 15,
    },
    text: {
        fontFamily: "Kollektif",
    },
    subText: {
        fontFamily: "PingFangHK-Semibold",
        color: "#fff",
    },
    buttonStyle: {
        minWidth: 150,
        marginVertical: 20,
    },
});