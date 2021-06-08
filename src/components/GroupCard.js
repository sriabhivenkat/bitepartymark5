import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity } from "react-native";
//import { Text } from "galio-framework";
import { Card, Avatar, Divider, Chip, IconButton } from "react-native-paper";
import LinearGradient from "react-native-linear-gradient";
import { GradientButton } from "./";
import firestore, { firebase } from "@react-native-firebase/firestore";
import { useGroup, addGroup, useUser, rejectGroup } from 'lib';

export const GroupCard = ({ id, request, onTap, selected, onPress, groupName, groupMembers }) => {
  // const { groupName, groupMembers } = useGroup(id);
  // const { user } = useUser();
  //console.log(groupName);
  return (
    <View style={styles.container}>
      <Card style={[styles.card, { marginBottom: 20 }, selected && {
        backgroundColor: "#e0e0e0",
      },]} elevation={1} onPress={onPress}>
        {request === false &&
          !selected &&
          < LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["white", 'white']}
            style={[
              // styles.card,
              {
                justifyContent: "center",
                alignItems: "center",
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                alignSelf: "stretch",
                minHeight: 50,
                flex: 1,
                flexDirection: "row",

                // shadowRadius: 2,
                // borderWidth: 2,
              },
            ]}
          >
            <Card.Content style={styles.innerCard}>
              <View minHeight={20}>
                <View flexDirection="row" flex={1} alignItems="center" minHeight={50}>
                  <View flex={1} flexDirection="column" >
                    <Text
                      style={[styles.text, { fontSize: 25, color: "black" }]}
                      numberOfLines={1}
                      ellipsizeMode="tail" //new comment
                    >
                      {groupName}
                    </Text>
                  </View>

                  <View flex={1} flexDirection="column" style={{ position: "absolute", right: 0, }}>
                    {request === true &&
                      <View style={styles.chipContainer}>
                        <TouchableOpacity
                          style={styles.confirmButton}
                          onPress={() => console.log("yuh yuh yuh")}
                        >
                          <Text style={[styles.text, styles.confirmButtonText]}>
                            Accept
                      </Text>
                        </TouchableOpacity>
                      </View>
                    }
                  </View>
                </View>
              </View>
            </Card.Content>
          </LinearGradient>}


        {request === false &&
          selected &&
          < LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["#e0e0e0", "#e0e0e0"]}
            style={[
              // styles.card,
              {
                justifyContent: "center",
                alignItems: "center",
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                alignSelf: "stretch",
                minHeight: 50,
                flex: 1,
                flexDirection: "row",

                // shadowRadius: 2,
                // borderWidth: 2,
              },
            ]}
          >
            <Card.Content style={styles.innerCard}>
              <View minHeight={20}>
                <View flexDirection="row" flex={1} alignItems="center" minHeight={50}>
                  <View flex={1} flexDirection="column" >
                    <Text
                      style={[styles.text, { fontSize: 25, color: "black" }]}
                      numberOfLines={1}
                      ellipsizeMode="tail" //new comment
                    >
                      {groupName}
                    </Text>
                  </View>

                  <View flex={1} flexDirection="column" style={{ position: "absolute", right: 0, }}>
                    {request === true &&
                      <View style={styles.chipContainer}>
                        <TouchableOpacity
                          style={styles.confirmButton}
                          onPress={() => console.log("yuh yuh yuh")}
                        >
                          <Text style={[styles.text, styles.confirmButtonText]}>
                            Accept
                      </Text>
                        </TouchableOpacity>
                      </View>
                    }
                  </View>
                </View>
              </View>
            </Card.Content>
          </LinearGradient>}
        {request === true &&
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              borderBottomColor: "lightgray",
              borderBottomWidth: 1,
              alignSelf: "stretch",
              minHeight: 50,
              flex: 1,
              flexDirection: "row",
              // shadowRadius: 2,
              // borderWidth: 2,
            }}
          >
            <Card.Content style={styles.innerCard}>
              <View minHeight={65}>
                <View flexDirection="row" flex={1} alignItems="center" minHeight={50}>
                  <View flex={1} flexDirection="column">
                    <Text
                      style={[styles.text, { fontSize: 17, color: "black" }]}
                      numberOfLines={1}
                      ellipsizeMode="tail" //new comment
                    >
                      {groupName}
                    </Text>
                    <Text
                      style={[styles.text, { fontSize: 14, color: "black", marginTop: 5 }]}
                      numberOfLines={1}
                      ellipsizeMode="tail" //new comment
                    >
                      Group Request
                          </Text>
                  </View>
                  <Divider color="black" />
                  <View flex={1} flexDirection="column" style={{ position: "absolute", right: 0, }}>
                    {request === true &&
                      <View style={styles.chipContainer}>
                        <TouchableOpacity
                          style={[styles.confirmButton]}
                          onPress={() => addGroup(id, user)}
                        >
                          <Text style={[styles.text, styles.confirmButtonText]}>
                            Accept
                            </Text>
                        </TouchableOpacity>
                        <IconButton icon="close" onPress={() => rejectGroup(id, user)} />
                      </View>
                    }
                  </View>
                </View>
              </View>
            </Card.Content>
          </View>
        }
        <Divider style={{ height: 1, backgroundColor: 'black' }} />
        <Card.Content style={styles.innerCard}>
          <ScrollView style={{ backgroundColor: 'blue' }} horizontal={true} scrollEnabled={true}>
            {Dimensions.get("window").height >= 896 &&
              <View
                width={100}
                flexDirection="row"
                style={{
                  // borderColor: "black", 
                  // borderWidth: 3,
                  marginVertical: 5,
                  top: 7.5,
                  left: 2,
                  alignItems: "center",
                  width: "100%"
                }}
              >
                {groupMembers?.map((item) => (
                  <Chip
                    avatar={
                      <Image
                        source={{ uri: item?.imageUrl }}
                        style={{
                          height: 35,
                          width: 35,
                          borderRadius: 25,
                          right: 1,
                          borderColor: "black",
                          borderWidth: 1,
                          backgroundColor: "purple",
                          marginLeft: 3,
                        }}
                      />
                    }
                    style={{
                      width: 125,
                      //left: 40,
                      height: 50,
                      alignItems: "center",
                      marginRight: 4,
                      marginVertical: 2.5,
                    }}
                    textStyle={{ fontFamily: "Kollektif", fontSize: 15 }}
                    mode="outlined"
                  >
                    {item?.firstName}
                  </Chip>
                ))}
              </View>
            }
            {Dimensions.get("window").height <= 667 &&
              <View
                width={100}
                flexDirection="row"
                style={{
                  // borderColor: "black", 
                  // borderWidth: 3,
                  marginVertical: 5,
                  top: 7.5,
                  left: 5,
                  alignItems: "center",
                  width: "100%"
                }}
              >
                {groupMembers?.map((item) => (
                  <Chip
                    avatar={
                      <Image
                        source={{ uri: item?.imageUrl }}
                        style={{
                          height: 35,
                          width: 35,
                          borderRadius: 25,
                          right: 1,
                          borderColor: "black",
                          borderWidth: 1,
                          backgroundColor: "purple",
                          marginLeft: 3,
                        }}
                      />
                    }
                    style={{
                      width: 125,
                      //left: 40,
                      height: 50,
                      alignItems: "center",
                      marginRight: 4,
                      marginVertical: 2.5,
                    }}
                    textStyle={{ fontFamily: "Kollektif", fontSize: 15 }}
                    mode="outlined"
                  >
                    {item?.firstName}
                  </Chip>
                ))}
              </View>
            }
          </ScrollView>
        </Card.Content>
      </Card>
    </View >);
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 2,
    width: Dimensions.get("window").width - 20 * 2,
  },
  card: {
    borderRadius: 15,
    shadowRadius: 2,
    // flex: 1,
    // padding: 1,
    // marginHorizontal: 20,
    // padding: 10,
    // width: "100%",
    // width: Dimensions.get("window").width - 20 * 2.1,
  },
  buttonContainer: {
    justifyContent: "center",
  },
  innerCard: { flexDirection: "column", justifyContent: "space-between", flex: 1 },
  subText: {
    fontFamily: "PingFangHK-Semibold",
    color: "#f76f6d",
    // marginBottom: "7%",
  },
  text: {
    fontFamily: "Kollektif",
  },
  text2: {
    fontFamily: "PingFangHK-Light",
    // marginTop: "5%",
    fontSize: 20,
    marginLeft: 5,
    fontWeight: "500",
  },
  buttonStyle: {
    minWidth: 50,
    marginVertical: 10,
  },
  chipContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
    position: "relative",
    left: 10,
    // backgroundColor: "red",
  },
  confirmButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    borderRadius: 40,
    height: 35,
    backgroundColor: "#E77771",
  },
  confirmButtonText: { color: "#fff", fontSize: 15 },
})
