import React, {useState, useRef, useMemo, useCallback} from "react";
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { Text } from "galio-framework";
import TouchableScale from "react-native-touchable-scale";
import { ImageBackground } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { startImages } from "../startImages";
import { useInvites } from "lib/invites.js";
import { Alert } from "react-native";
import {useUser} from "lib";
import {GradientButton} from "components";
import { Appbar, Button } from 'react-native-paper';
import {Input } from 'galio-framework';
import { Modal, Portal, Provider } from 'react-native-paper';
import { logoHeaderOptions } from "../../../components";
import { useEffect } from "react";
import PhoneInput from "react-native-phone-number-input";
import auth from '@react-native-firebase/auth';
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import firestore from "@react-native-firebase/firestore";


const Start = ({ navigation }) => {
  const hour = new Date().getHours();
  const { invites, rejectInvite, acceptInvite } = useInvites();
  const { user } = useUser();
  const acceptedInvites = invites?.filter((item) => item.status == "accepted");
  const height = Dimensions.get("window").height;
  const width = Dimensions.get("window").width;


  const [number, setNumber] = useState('')
  const [code, setCode] = useState('');
  const [visible, setVisible] = useState(false);
  const [confirm, setConfirm] = useState('')
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["0%", "100%"], []);

  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode() {
      try {
        await confirm.confirm(code)
        await firestore().collection("Users").doc(user?.uidvalue).update({
          phoneNumber: number,
          sliced: number.slice(-4),
        })
      } catch (error) {
        console.log(error);
      }
  }
  const isSmall = height < 700;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {height>=896 &&
        <Appbar.Header style={[styles.bottom, {height: 70}]}>
          {/* <View flexDirection="row" style={{width: 230}}> */}
          <View flexDirection="row" style={{width: 330}}>
          <Appbar.Content
              title={
                    <Image source={require("assets/images/newHeaderLogo.png")}
                                  style={{
                                      width: 29.333,
                                      height: 44,
                                      
                                  }}
                          />
                        }
                      titleStyle={{backgroundColor: "white"}}
                      style={{alignItems: "flex-start", top: 5}}
            />
          
          <Appbar.Content 
            title={`Welcome, ${user?.firstName}!`} 
            //title="Welcome, Kirthivel!"
            titleStyle={{
              fontFamily: "Kollektif", 
              fontSize: 20, 
              color: "black", 
              right: 120, 
              top: 15, 
              marginRight: -80
            }} 
            style={{
              alignItems: "flex-start", 
              top: 5
              }}
            />
          </View>
          {/* <View flexDirection="row" style={{width:175}}> */}
          <View flexDirection="row" style={{width:150}}>
            {/* <Appbar.Content 
              title={
                <Button 
                  icon="account-multiple-plus" 
                  mode="outlined"
                  labelStyle={{color: "black"}}
                  style={{borderRadius: 20, }} 
                  uppercase={false}
                  onPress={() => navigation.navigate("createParty/createGroup")}
                  color="black"
                >
                  Group
                </Button>
              } 
              color="black" 
              style={{top: 18}}
            /> */}
            <Appbar.Action icon={'account-plus'} size={30} onPress={() => navigation.navigate("profile", {screen: "profile/addFriends"})} style={{top: 5, }} color="black"/>
          </View>
        </Appbar.Header>
      }
      {height<=812 &&
        <Appbar.Header style={[styles.bottom, {height: 60,}]}>
          {/* <View flexDirection="row" style={{width: 230}}> */}
          <View flexDirection="row" style={{width: 300}}>
          <Appbar.Content
              title={
                    <Image source={require("assets/images/newHeaderLogo.png")}
                                  style={{
                                      width: 26.4,
                                      height: 39.6,
                                      aspectRatio: 2/3
                                  }}
                          />
                        }
                      titleStyle={{backgroundColor: "white", }}
                      style={{alignItems: "flex-start", top: 5}}
            />
          
          <Appbar.Content 
            title={`Welcome, ${user?.firstName}!`}
            // title="Welcome, Kirthivel!" 
            titleStyle={{
              fontFamily: "Kollektif", 
              fontSize: 20, 
              marginRight: -90, 
              right: 110, //70
              color: "black"
            }} 
            style={{
              alignItems: "flex-start", 
              top: 15
            }}
          />
          </View>
          <View flexDirection="row" style={{width:140}} alignItems="flex-end">
            {/* <Appbar.Action icon={'account-multiple-plus'} size={27.5} onPress={() => navigation.navigate("createParty/createGroup")} style={{top: 3.5, marginLeft: 40}} color="black"/> */}
            <Appbar.Action icon={'account-plus'} size={27.5} onPress={() => navigation.navigate("profile", {screen: "profile/addFriends"})} style={{top: 2, }} color="black"/>
          </View>
        </Appbar.Header>
      }
      {acceptedInvites?.length != 0 && (
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <GradientButton
            onPress={() =>
              navigation.navigate("joinParty", {
                screen: "joinParty/swiping",
                params: { partyID: acceptedInvites[0].docID },
              })
            }
            style={{
              width: "90%",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 3.5 },
              shadowOpacity: 0.5,
              shadowRadius: 2.5,
            }}
            innerStyle={{
              borderRadius: 14,
            }}
          >
            Resume your active party!
          </GradientButton>
        </View>
      )}
      {acceptedInvites?.length != 0 && !user?.phoneNumber && (
        <GradientButton 
          outline
          style={{
            width: "90%",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 3.5 },
            left: 20,
            marginTop: 50,
          }}
          innerStyle={{
            borderRadius: 14,
          }}
          textStyle={{
            color: "black"
          }}
          onPress={() => bottomSheetRef.current.expand()}
        >
          Verify phone number!
        </GradientButton>
      )}
      {acceptedInvites?.length === 0 && !user?.phoneNumber && (
        <GradientButton 
          outline
          style={{
            width: "90%",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 3.5 },
            left: 20,
            marginTop: 50,
            bottom: 40
          }}
          innerStyle={{
            borderRadius: 14,
          }}
          textStyle={{
            color: "black"
          }}
          onPress={() => bottomSheetRef.current.expand()}
        >
          Verify phone number!
        </GradientButton>
      )}
      {acceptedInvites?.length != 0 && (
        <TouchableOpacity
          style={[
            styles.image,
            {
              marginTop: 50,
              shadowColor: "#000",
              shadowOffset: { width: 1, height: 1 },
              shadowOpacity: 1,
              shadowRadius: 4,
            },
          ]}
          onPress={() => {
            if (acceptedInvites?.length == 0) {
              navigation.navigate("createParty/selectFriends");
            } else {
              Alert.alert(
                "You have an active Party!",
                "Complete it before starting a new one!"
              );
            }
          }}
          Component={TouchableScale}
          tension={100}
          activeScale={0.95}
        >
          <ImageBackground
            source={startImages.find(({ end }) => hour < end).image}
            style={styles.image}
            borderRadius={15}
            marginHorizontal={20}
            marginBottom={15}
            blurRadius={5}
          >
            <LinearGradient
              style={styles.image}
              marginHorizontal={20}
              marginBottom={15}
              locations={[0.5, 1]}
              // start={{ x: 0, y: 0 }}
              // end={{ x: 0, y: 1 }}
              colors={["rgba(0,0,0,0)", "rgba(0,0,0,1)"]}
            >
              <View style={styles.textContainer}>
                <Text
                  h2
                  style={{
                    fontFamily: "Kollektif",
                    fontWeight: "800",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Let's Party
                </Text>
                <Text
                  h5
                  style={{
                    fontFamily: "Kollektif",
                    color: "#f76f6d",
                    textAlign: "center",
                  }}
                >
                  Start partying with friends!
                </Text>
              </View>
            </LinearGradient>
          </ImageBackground>
        </TouchableOpacity>
      )}
      {acceptedInvites?.length === 0 && (
        <TouchableOpacity
          style={[styles.image, { marginTop: 10 }]}
          onPress={() => {
            if (acceptedInvites?.length == 0) {
              navigation.navigate("createParty/selectFriends");
            } else {
              Alert.alert(
                "You have an active Party!",
                "Complete it before starting a new one!"
              );
            }
          }}
          Component={TouchableScale}
          tension={100}
          activeScale={0.95}
        >
          <ImageBackground
            source={startImages.find(({ end }) => hour < end).image}
            style={styles.image}
            borderRadius={15}
            marginHorizontal={20}
            marginBottom={15}
            blurRadius={5}
          >
            <LinearGradient
              style={styles.image}
              marginHorizontal={20}
              marginBottom={15}
              locations={[0.5, 1]}
              // start={{ x: 0, y: 0 }}
              // end={{ x: 0, y: 1 }}
              colors={["rgba(0,0,0,0)", "rgba(0,0,0,1)"]}
            >
              <View style={styles.textContainer}>
                <Text
                  h2
                  style={{
                    fontFamily: "Kollektif",
                    fontWeight: "800",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Let's Party
                </Text>
                <Text
                  h5
                  style={{
                    fontFamily: "Kollektif",
                    color: "#f76f6d",
                    textAlign: "center",
                  }}
                >
                  Start partying with friends!
                </Text>
              </View>
            </LinearGradient>
          </ImageBackground>
        </TouchableOpacity>
      )}
      {/* {acceptedInvites?.length > 0 && (
        <TouchableOpacity
          style={styles.image}
          onPress={() =>
            alert(
              "You have an active party! Please finish that before staring a new one"
            )
          }
          Component={TouchableScale}
          tension={100}
          activeScale={0.95}
        >
          <ImageBackground
            source={startImages.find(({ end }) => hour < end).image}
            style={styles.image}
            borderRadius={15}
            marginHorizontal={20}
            marginBottom={15}
            blurRadius={5}
          >
            <LinearGradient
              style={styles.image}
              marginHorizontal={20}
              marginBottom={15}
              locations={[0.5]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              colors={["rgba(0,0,0,0)", "rgba(0,0,0,1)"]}
            >
              <View style={styles.textContainer}>
                <Text
                  h2
                  style={{
                    fontFamily: "Kollektif",
                    fontWeight: "800",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Let's Party
                </Text>
                <Text
                  h5
                  style={{
                    fontFamily: "Kollektif",
                    fontWeight: "bold",
                    color: "#f76f6d",
                    textAlign: "center",
                  }}
                >
                  Start partying with friends!
                </Text>
              </View>
            </LinearGradient>
          </ImageBackground>
        </TouchableOpacity>
      )} */}
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        enableHandlePanningGesture={false}
        handleComponent={null}
      >
        <BottomSheetView style={styles.contentContainer}>
        <TouchableWithoutFeedback
            accessible={false}
            onPress={() => Keyboard.dismiss()}
        >
            <View style={styles.bottomSheetContainer}>
                <StatusBar barStyle='dark-content' />
          {visible===false &&
          <View>
          <Text style={[{ marginTop: 100, left: 15, fontSize: 30, fontFamily: "Kollektif" }]}>Verify phone number</Text>
                <View style={{ alignItems: "center" }}>
                    {/* <Input
                        placeholder="Enter a phone number"
                        placeholderTextColor="gray"
                        onChangeText={(phone) => setNumber(phone)}
                        type="phone-pad"
                        color="black"
                        fontSize={17}
                        fontFamily="Kollektif"
                        style={styles.input1}
                        value={number}
                    /> */}
                    <PhoneInput 
                        defaultValue={number}
                        defaultCode="US"
                        onChangeFormattedText={(phone) => setNumber(phone)}
                        layout="second"
                        textInputStyle={{fontFamily: "Kollektif", fontSize: 20}}
                        countryPickerButtonStyle={{borderRightColor: "black", borderRightWidth: 1}}
                        codeTextStyle={{fontFamily: "Kollektif", fontSize: 20}}
                        containerStyle={{borderColor: "black", borderWidth: 1, marginVertical: 10, borderRadius: 25, width: "90%", height: 60}}
                        //containerStyle={styles.input1}
                        placeholder="Enter number"
                    />
                </View>
                <View
                    style={{
                        paddingHorizontal: 20,
                        alignItems: "center"
                    }}
                >
                    <Text style={{textAlign: "center", fontFamily: "Kollektif", color: "lightgray"}}>SMS will be sent for verification, and standard messaging and data rates may apply</Text>
                </View>

                <View style={{ alignItems: "center" }}>
                    {(number != '') &&
                        <GradientButton
                            onPress={() => {
                                signInWithPhoneNumber(number)
                                setVisible(true)
                            }}
                            style={styles.button}
                            innerStyle={{ paddingVertical: 10 }}
                        >
                            Send code!
                        </GradientButton>
                    }
                </View>
                <View style={{alignItems: "center"}}> 
                    <Button
                        onPress={() => bottomSheetRef.current?.close()}
                        style={{
                          marginTop: 50, 
                          borderColor: "red", 
                          borderWidth: 1, 
                          borderRadius: 15,
                          width: "60%",
                          height: 40,
                          justifyContent: "center",
                          backgroundColor: "red"
                        }}
                        labelStyle={{color: "white", fontFamily: "Kollektif", fontSize: 18}}
                        uppercase={false}
                      >
                        Dismiss
                    </Button>
                </View>
               </View> 
            }
                {visible===true &&
                    <View>
                    <Text style={[{ marginTop: 100, left: 15, fontSize: 30, fontFamily: "Kollektif" }]}>Enter code</Text>
                    <View style={{alignItems: 'center'}}>
                        <Input
                            placeholder="Enter code"
                            placeholderTextColor="gray"
                            onChangeText={text => setCode(text)}
                            type="numeric"
                            color="black"
                            fontSize={17}
                            fontFamily="Kollektif"
                            style={styles.input1}
                            value={code}                                
                        />
                    </View>
                    <View style={{ alignItems: "center" }}>
                        {(code.length === 6) &&
                            <GradientButton
                                onPress={() => {
                                    confirmCode(code);
                                    bottomSheetRef.current?.close();
                                }}
                                style={styles.button}
                                innerStyle={{ paddingVertical: 10 }}
                            >
                                Verify
                            </GradientButton>
                        }
                    </View>
                    <View style={{alignItems: "center", justifyContent: "center"}}> 
                      <Button
                        onPress={() => bottomSheetRef.current?.close()}
                        style={{
                          marginTop: 50, 
                          borderColor: "red", 
                          borderWidth: 1, 
                          borderRadius: 15,
                          width: "60%",
                          height: 40,
                          justifyContent: "center",
                          backgroundColor: "red"
                        }}
                        labelStyle={{color: "white", fontFamily: "Kollektif", fontSize: 18}}
                        uppercase={false}
                      >
                        Dismiss
                      </Button>
                    </View>
                    </View>
                }
            </View>
        </TouchableWithoutFeedback>
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default Start;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    alignContent: "flex-end",
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  input: {
    color: "white",
  },
  title: {
    padding: "5%",
    marginTop: "2.5%",
    marginBottom: "2.5%",
    fontFamily: "Kollektif",
    color: "#f76f6d",
    textAlign: "center",
  },
  button: {
    marginTop: 20,
    height: 37,
    width: "50%",
    backgroundColor: "#F76F6D",
    borderRadius: 15,
  },
  card: {
    height: "35%",
    width: "85%",
    borderRadius: 25,
    shadowRadius: 10,
    marginBottom: "5%",
    backgroundColor: "white",
  },
  image: {
    flex: 3,
    //resizeMode: "cover",
    justifyContent: "flex-end",
    margin: 0,
    borderRadius: 15,
  },
  textContainer: {
    marginBottom: "10%",
  },
  bottom: {
    backgroundColor: "white",
    elevation: 0,
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
  },
  contentContainer: {
    backgroundColor: 'white',
  },
  input1: {
    width: '90%',
    height: 45,
    // marginTop: 20,
    // marginBottom: 10,
     borderWidth: 1,
     borderColor: "black",
     borderRadius: 15,
},
//   bottomSheetontainer: {
//     flex: 1,
//     backgroundColor: "#fff",
// },
});