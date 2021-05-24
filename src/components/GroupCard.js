import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Text } from "galio-framework";
import { Card, Avatar, Divider } from "react-native-paper";
import LinearGradient from "react-native-linear-gradient";
import { GradientButton } from "./";

export const GroupCard = ({group, groupDoc}) => (
    <View style={styles.container}>
    <Card style={[styles.card, { marginBottom: 20 }]} elevation={1}>
      <Card.Content style={styles.innerCard}>
        <LinearGradient
            start={{x: 0, y: 0}}
            end={{x:1, y:0}}
            colors= {["#E1387F", '#F18F64']}
        >
        <View>
            <View flexDirection="row" flex={1} alignItems="center">
                <View flex={1} flexDirection="column">
                    <Text
                    style={[styles.text, { fontSize: 24, color: "white" }]}
                    numberOfLines={1}
                    ellipsizeMode="tail" //new comment
                    >
                    {group?.name}
                    </Text>
                </View>
            </View>
        </View>
        </LinearGradient>
        <Divider style={{marginTop: 10, height: 1.5, width: "112%", right: 20}}/>
        <View alignItems="center" >
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
            <GradientButton
              onPress={() => {}}
              containerStyle={{ marginBottom: 5 }}
              style={{width: 160, marginRight: 10}}
            >
              ok
            </GradientButton>
            <GradientButton
              onPress={() => {}}
              outline
              containerStyle={{ marginTop: 5,}}
              style={{width: 160}}
              innerStyle={{borderColor: "transparent", backgroundColor: "#B6B6B6" }}
              textStyle={{color: "white"}}
            >
              bet
            </GradientButton>
            
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
            <GradientButton
              onPress={() => {}}
              containerStyle={{ marginBottom: 5 }}
              style={{width: 140, marginRight: 10}}
            >
              ok
            </GradientButton>
            <GradientButton
              onPress={() => {}}
              outline
              containerStyle={{ marginTop: 5,}}
              style={[{width: 140,}]}
              innerStyle={{borderColor: "transparent", backgroundColor: "#B6B6B6" }}
              textStyle={{color: "white"}}

            >
              bet
            </GradientButton>
          </View>
        }
        </View>
      </Card.Content>
    </Card>
  </View>
)

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