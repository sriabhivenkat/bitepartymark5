import React, {useState} from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import { FAB, Chip } from "react-native-paper";
import { Text } from "galio-framework";
import LinearGradient from "react-native-linear-gradient";
import { YelpRating } from "./YelpRating";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Modal, Portal, Provider } from 'react-native-paper';



export const RestarauntCard = ({ data }) => {
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {flex: 1,  backgroundColor: 'white', borderRadius: 15, borderWidth:1, borderColor: "black"};
  return(
    <View
      // start={{ x: 0, y: 0 }}
      // end={{ x: 1, y: 1 }}
      // colors={["#ee0979", "#f76f6d", "#ff6a00"]}
      backgroundColor="white"
      style={{
        flex: 1,
        borderRadius: 15,
        color: "#fff",
        // paddingVertical: 30,
        // paddingBottom: 40,
        maxHeight: 650,
        bottom: 50
        // paddingHorizontal: 30,
      }}
      // style={[styles.background]}
    >
      <Provider>
        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            {/* <Image 
              source={{ uri: data.image_url }}
              style={[styles.image, {marginTop: 10}]}
            /> */}
            <Text h1>hi</Text>
          </Modal>
        </Portal>
      <ImageBackground
        source={{ uri: data.image_url }}
        style={[
          {
            flex: 1,
            resizeMode: "cover",
            justifyContent: "flex-end",
            margin: 0,
            borderRadius: 15,
          },
        ]}
        borderRadius={15}
        // marginHorizontal={20}
        // marginBottom={15}
      >
        <LinearGradient
          style={[
            {
              flex: 1,
              resizeMode: "cover",
              justifyContent: "flex-end",
              margin: 0,
              borderRadius: 15,
            },
            styles.card,
            styles.background,
          ]}
          // marginHorizontal={20}
          // marginBottom={15}
          locations={[0.5]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,1)"]}
        >
          <View style={[styles.textContainer, {top: 40, right: 10}]}>
            <View flexDirection="row" flexWrap="wrap-reverse" style={{flex: 0.2, alignItems: "flex-start",}}>
              {data.categories.map((item, i) => (
                <Chip
                  key={i}
                  textAlign="center"
                  marginRight={10}
                  flex={0}
                  marginVertical={2}
                  style={{ justifyContent: "center", alignItems: "center", marginTop: "1.5%",}}
                  textStyle={{ fontSize: 17, fontWeight: "bold", fontFamily: "Kollektif" }}
                >
                  {item.title}
                </Chip>
              ))}
            </View>
            <Text h3 style={[styles.text, {marginTop: "2%"}]}>{data.name}</Text>
            <View flexDirection="row" marginTop="4%">
              <YelpRating rating={data.rating} />
              <Text p style={styles.reviews}>{`${data.review_count} Reviews`}</Text>
            </View>
          </View>
          <View>
              <Image
                style={{
                  height: 40,
                  width: undefined,
                  aspectRatio: 1000 / 637,
                  position: "relative",
                  bottom: -30,
                  left: 275,
                }}
                source={require("assets/images/yelp/logo.png")}
                // backgroundColor="yellow"
              />
          </View>
          <View style={styles.chevron}>
            <Ionicons 
              name="chevron-up-outline"
              color="white"
              size={35}
            />
          </View>
        </LinearGradient>
      </ImageBackground>
      </Provider>
    </View>
  )
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 15,
    color: "#fff",
    paddingVertical: 30,
    paddingBottom: 40,
    maxHeight: 650,
    paddingHorizontal: 30,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    resizeMode: "cover",
    borderRadius: 15,
  },
  text: {
    color: "#fff",
    fontFamily: "Kollektif",
  },
  textContainer: {
    flex: 0.3,
    justifyContent: "flex-end",
    flexDirection: "column",
  },
  categoriesContainer: {
    alignSelf: "stretch",
    marginTop: 15,
    maxHeight: 30,
  },
  chevron: {
    ...StyleSheet.absoluteFill,
    width: 100,
    height: 100,
    top: 575,
    left: 135,
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",

  },
  name: {
    fontSize: 40,
    fontWeight: "600",
  },
  categories: {
    fontSize: 32,
    fontWeight: "300",
  },
  reviews: {
    fontSize: 20,
    marginTop: 5,
    color: "#fff",
    fontFamily: "Kollektif",
    position: "relative",
    bottom: "1.5%",
    left: "100%",
    right: 1,
    fontWeight: "500",
  },
});