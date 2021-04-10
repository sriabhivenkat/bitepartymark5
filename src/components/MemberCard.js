import React from "react";
import { View, StyleSheet, Dimensions, Animated } from "react-native";
import { Text } from "galio-framework";
import { Card, Avatar, Chip } from "react-native-paper";

const MemberCard = ({ onPress, data, selected, status }) => {
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
  };

  return (
    <AnimatedCard
      style={[
        styles.card,
        { maxHeight: 250, marginBottom: 15 },
        selected && {
          backgroundColor: "#00000010",
        },
      ]}
      elevation={1}
      onPress={onPress}
    >
      <Card.Content style={styles.innerCard}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar.Image size={35} source={{ uri: data.imageUrlPath }} />

          <View style={styles.nameContainer}>
            <Text
              ellipsizeMode="tail"
              // adjustsFontSizeToFit
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
                  // minWidth: 100,
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
    </AnimatedCard>
  );
};

export default MemberCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    shadowRadius: 2,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 0,
    width: Dimensions.get("window").width - 20 * 2,
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
    fontFamily: "PingFangHK-Semibold",
    color: "#f76f6d",
    // marginBottom: "7%",
  },
  text: {
    fontFamily: "PingFangHK-Light",
    // marginTop: "5%",
    fontSize: 17,
    fontWeight: "300",
  },
  handle: {},
  name: {
    fontWeight: "600",
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
