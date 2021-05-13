"use strict";
import React, { Component } from "react";
import { FlatList } from "react-native";
import { StyleSheet, Dimensions } from "react-native";
("use strict");
import { PanResponder, Animated, View, Image, Text } from "react-native";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY(),
    };
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([
        null,
        { dx: this.state.pan.x, dy: this.state.pan.y },
      ]),
      onPanResponderRelease: (e, { vx, vy }) => {
        if (this.state.pan.x._value < -150) {
          this.props.onSwipe(this.props.index);
        } else if (this.state.pan.x._value > 150) {
          this.props.onSwipe(this.props.index);
        } else {
          Animated.spring(this.state.pan, {
            toValue: 0,
          }).start();
        }
      },
    });
  }

  componentWillUnmount() {
    this.state.pan.x.removeAllListeners();
    this.state.pan.y.removeAllListeners();
  }

  getMainCardStyle() {
    let { pan } = this.state;
    return [
      Styles.mainCard,
      { position: "absolute" },
      { left: -175 },
      { top: -250 },
      {
        transform: [
          { translateX: pan.x },
          { translateY: pan.y },
          {
            rotate: pan.x.interpolate({
              inputRange: [-150, 0, 150],
              outputRange: ["-20deg", "0deg", "20deg"],
            }),
          },
        ],
      },
      {
        opacity: pan.x.interpolate({
          inputRange: [-150, 0, 150],
          outputRange: [0.5, 1, 0.5],
        }),
      },
    ];
  }

  render() {
    let { picture, name, email } = this.props;
    return (
      <Animated.View
        style={this.getMainCardStyle()}
        {...this.panResponder.panHandlers}
      >
        <View style={Styles.card}>
          <Image source={{ uri: picture.large }} style={Styles.cardImage} />
          <View style={Styles.cardText}>
            <Text style={Styles.cardTextMain}>
              {name.first} {name.last}
            </Text>
            <Text style={Styles.cardTextSecondary}>{email}</Text>
          </View>
        </View>
      </Animated.View>
    );
  }
}

export default class CardStack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentWillMount() {
    for (let i = 0; i < 3; i++) {
      this.handleAdd();
    }
  }

  async handleAdd() {
    try {
      let response = await fetch("https://randomuser.me/api");
      let result = await response.json();
      this.setState({
        users: [result.results[0], ...this.state.users],
      });
    } catch (err) {
      alert(JSON.stringify(err));
    }
  }

  handleRemove = (index) => {
    let start = this.state.users.slice(0, index);
    let end = this.state.users.slice(index + 1);
    this.setState({
      users: start.concat(end),
    });
    this.handleAdd();
  };

  render() {
    return (
      <FlatList
        style={Styles.cardContainer}
        contentContainerStyle={Styles.cardStack}
        data={this.state.users}
        renderItem={({ item, index }) => (
          <Card {...item} index={index} onSwipe={this.handleRemove} />
        )}
        keyExtractor={(item) => item.login.username}
        scrollEnabled={false}
      />
    );
  }
}

const DIMENSIONS = Dimensions.get("window");

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  cardContainer: {
    flex: 1,
    width: DIMENSIONS.width,
  },
  cardStack: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    height: 500,
    width: 350,
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 8,
    justifyContent: "center",
    backgroundColor: "#FFF",
    overflow: "hidden",
  },
  cardImage: {
    flex: 1,
    backgroundColor: "#1E90FF",
  },
  cardText: {
    margin: 20,
  },
  cardTextMain: {
    textAlign: "left",
    fontSize: 20,
    backgroundColor: "transparent",
  },
  cardTextSecondary: {
    textAlign: "left",
    fontSize: 15,
    color: "grey",
    backgroundColor: "transparent",
  },
});
