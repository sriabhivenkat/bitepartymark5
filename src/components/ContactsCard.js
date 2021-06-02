import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Animated, Share} from "react-native";
import { Text } from "galio-framework";
import { Card, Avatar, Chip } from "react-native-paper";
import {GradientButton} from '../components'
import { Button } from "react-native";
import firestore, { firebase } from "@react-native-firebase/firestore";
import { useFriends, useUser } from "lib";
import dynamicLinks from "@react-native-firebase/dynamic-links";
import { Platform } from "react-native";
export const ContactsCard = ({
  onPress,
  data,
  selected,
  disabled,
  status,
  ...rest
}) => {
  const AnimatedCard = Animated.createAnimatedComponent(Card);
  const [resultval, setResults] = useState([]);

  const { friends, addFriend } = useFriends();
  const { user } = useUser();
  const cleanPhone = (str) => str?.replace(/\D/g, "").slice(-4);
  
  useEffect(() => {
    firestore()
    .collection("Users")
    .where('sliced', '==', cleanPhone(data.phoneNumbers[0].number))
    .get()
    .then((res) => {
      const results = res.docs.map((x) => x.data());
      console.log("results are,", results)
      setResults(results)
    })
    // const thing = data.phoneNumbers[0].number;
    // const spliced = thing.slice(-4)
    // console.log(spliced);
  }, [])

  
  const statusMap = {
    pending: {
      text: "Waiting",
      color: "#FFB75D",
      textColor: "#000",
    },
    rejected: {
      text: "Rejected",
      color: "#C23934",
      textColor: "#fff",
    },
    complete: {
      text: "Completed",
      color: "green",
      textColor: "#fff",
    },
    accepted: {
      text: "Swiping",
      color: "purple",
      textColor: "#fff",
    },
    friendPending: {
      text: "Pending",
      color: "#00000050",
      textColor: "#000",
    },
  };
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `BiteParty | Join the party! ${Platform.select({
          ios: 'https://apps.apple.com/us/app/biteparty/id1551432967',
          android: 'https://play.google.com/store/apps/details?id=com.bitepartymark4&hl=en_US&gl=US'
        })}`,
      });
    } catch (error) {
      alert(error.message);
    }
  }

  const addContact = async () => {
    try {
      const cleanPhone = (str) => str?.replace(/\D/g, "").slice(-9);
      alert(cleanPhone(data.phoneNumbers[0].number))
      const friend = (await firestore().collection('Users').where('sliced', '==', cleanPhone(data.phoneNumbers[0].number)).get()).docs[0]
      addFriend(friend)
    } catch (error) {
      console.error(error)
    }
    
  }
  return (
    <View style={styles.container}>
      <Card
        style={[
          styles.card,
          { maxHeight: 250, marginBottom: 15 },
          selected && {
            backgroundColor: "#e0e0e0",
          },
        ]}
        elevation={1}
        onPress={onPress}
        accessible={false}
      >
        <Card.Content style={[styles.innerCard]}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >

            <View style={styles.nameContainer}>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={[styles.text, styles.name, {right: (Dimensions.get("window").width)/20}]}
              >
                {`${data.givenName} ${data.familyName}`}
              </Text>
              {resultval.length!=0 && 
                <Text
                  // adjustsFontSizeToFit
                  numberOfLines={1}
                  style={[styles.text, styles.handle, {right: (Dimensions.get("window").width)/20, color: "lightgray"}]}
                >
                  On this app
                </Text>
              }
              {resultval.length===0 &&
                <Text
                // adjustsFontSizeToFit
                numberOfLines={1}
                style={[styles.text, styles.handle, {right: (Dimensions.get("window").width)/20, color: "lightgray"}]}
              >
                Invite
              </Text>
              }
            </View>
           {resultval.length!=0 &&
            <GradientButton
                style={{width: 75}}
                onPress={addContact}
            >
                Add
            </GradientButton>
           }
           {resultval.length===0 &&
            <GradientButton
                style={{width: 75,  }}
                textStyle={{color: "black", letterSpacing: 0.3}}

                // containerStyle={{backgroundColor: "black"}}
                onPress={onShare}
                outline
            >
                Invite
            </GradientButton>
          }
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

export default ContactsCard;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width - 20 * 2,
    paddingHorizontal: 2,
  },
  card: {
    borderRadius: 15,
    shadowRadius: 2,
    paddingHorizontal: 10,
    // borderColor: "#ee0979",
    // borderWidth: 4,
  },
  buttonContainer: {
    justifyContent: "center",
  },
  innerCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subText: {
    fontFamily: "Kollektif",
    color: "#f76f6d",
    // marginBottom: "7%",
  },
  text: {
    fontFamily: "Kollektif",
    // marginTop: "5%",
    fontSize: 17,
    fontWeight: "bold",
  },
  handle: {},
  name: {
    // fontWeight: "700",
  },
  nameContainer: {
    marginHorizontal: 15,
    flex: 1,
    // backgroundColor: "red",
  },
  buttonStyle: {
    minWidth: 150,
    marginVertical: 10,
  },
  chipContainer: {
    // backgroundColor: "blue",
    flex: 1,
  },
  confirmButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    borderRadius: 40,
    height: 35,
    backgroundColor: "#E77771",
  },
  italic: {
    fontStyle: "italic"
  }
});
