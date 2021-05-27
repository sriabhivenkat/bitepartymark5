import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Image, ScrollView } from "react-native";
import { Text } from "galio-framework";
import { Card, Avatar, Divider, Chip, IconButton } from "react-native-paper";
import LinearGradient from "react-native-linear-gradient";
import { GradientButton } from "./";
import firestore, { firebase } from "@react-native-firebase/firestore";
import {useGroup} from 'lib';

export const GroupCard = ({id, functionval}) => {
    const {groupName, groupMembers} = useGroup(id);
  return(
    <View style={styles.container}>
    <Card style={[styles.card, { marginBottom: 20 }]} elevation={1}>
      <LinearGradient
            start={{x: 0, y: 0}}
            end={{x:1, y:0}}
            colors= {["#E1387F", '#F18F64']}
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
        <View minHeight={65}>
            <View flexDirection="row" flex={1} alignItems="center" minHeight={50}>
                <View flex={1} flexDirection="column">
                    <Text
                    style={[styles.text, { fontSize: 30, color: "white" }]}
                    numberOfLines={1}
                    ellipsizeMode="tail" //new comment
                    >
                    {groupName}
                    </Text>
                </View>
                <View flex={1} flexDirection="column" style={{position: "absolute", right: 0, }}>
                  <IconButton 
                    icon="plus"
                    color="white"
                    size={25}
                    style={{borderColor: "white", borderWidth: 1, borderRadius: 25,}}
                    onPress={() =>
                      functionval
                    }
                  />
                </View>
            </View>
        </View>
        </Card.Content>
        </LinearGradient>
        <Card.Content style={styles.innerCard}>
        <ScrollView horizontal={true}>
        {Dimensions.get("window").height >= 896 &&
          <View 
            width={100} 
            flexDirection="row" 
            style={{
              // borderColor: "black", 
              // borderWidth: 3,
              marginVertical:5,
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
              marginVertical:5,
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
  </View>);
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
})