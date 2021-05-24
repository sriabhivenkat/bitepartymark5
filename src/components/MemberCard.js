import React from "react";
import { View, StyleSheet, Dimensions, Animated } from "react-native";
import { Text } from "galio-framework";
import { Card, Avatar, Chip } from "react-native-paper";

export const MemberCard = ({
  onPress,
  data,
  selected,
  disabled,
  status,
  ...rest
}) => {
  const AnimatedCard = Animated.createAnimatedComponent(Card);

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
            <Avatar.Image size={35} source={{ uri: data.imageUrl }} />

            <View style={styles.nameContainer}>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={[styles.text, styles.name]}
              >
                {`${data.firstName} ${data.lastName}`}
              </Text>
              <Text
                // adjustsFontSizeToFit
                numberOfLines={1}
                style={[styles.text, styles.handle]}
              >
                @{data.handle}
              </Text>
            </View>
            {data.status && (
              <View style={styles.chipContainer}>
                <Chip
                  style={{
                    backgroundColor: statusMap[data.status].color,
                    justifyContent: "center",
                  }}
                  textStyle={{
                    fontWeight: "600",
                    color: statusMap[data.status].textColor,
                  }}
                >
                  {statusMap[data.status].text}
                </Chip>
              </View>
            )}
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

export default MemberCard;

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
});
