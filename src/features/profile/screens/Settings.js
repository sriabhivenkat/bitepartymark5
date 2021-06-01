import React, { useContext } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Switch,
  StatusBar,
} from "react-native";
import { AuthContext } from "navigation/AuthProvider";
import { Text } from "galio-framework";
import { Divider } from "react-native-elements";
import { InAppBrowser } from "react-native-inappbrowser-reborn";
import { TitleText } from "components";
import { SafeAreaView } from "react-native";
import { useFriends, useUser } from "lib";

const SettingsButton = ({ children, right, style, textStyle, ...rest }) => (
  <TouchableOpacity {...rest} style={[styles.button, style]}>
    <Text style={[styles.buttonText, textStyle]}>{children}</Text>
    {right}
  </TouchableOpacity>
);
const Settings = () => {
  const { logout } = useContext(AuthContext);
  const { user } = useUser();

  const openLink = async (url) => {
    try {
      await InAppBrowser.open(url);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <TitleText style={{ marginTop: 30, fontSize: 36 }}>Settings</TitleText>
        <Divider style={styles.divider} />
        {/* <SettingsButton right={<Switch />} style={{marginLeft: "-2%"}}>Push Notifications</SettingsButton> */}
        {/* <Divider style={styles.divider} /> */}
        <SettingsButton
          onPress={() =>
            openLink("https://www.kas-tech.com/privacy").catch((err) =>
              console.error(err)
            )
          }
          style={{ marginLeft: "-2%" }}
        >
          Privacy
        </SettingsButton>
        <SettingsButton
          onPress={() => openLink("https://www.kas-tech.com/terms")}
          style={{ marginLeft: "-2%" }}
        >
          Terms of Service
        </SettingsButton>
        <Text style={{ fontFamily: "Kollektif", fontSize: 22, paddingHorizontal: 7, paddingVertical: 10, color: "darkgray" }}>Bite Party! Version 1.3.A</Text>
        <Divider style={styles.divider} />
        <SettingsButton
          onPress={logout}
          style={{
            borderWidth: 1.5,
            borderRadius: 14,
            borderColor: "black",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          Log Out
        </SettingsButton>
        {/* <SettingsButton
          style={{
            borderWidth: 1.5,
            borderRadius: 14,
            borderColor: "red",
            justifyContent: "center",
            marginTop: 20,
          }}
          textStyle={{ color: "red" }}
        >
          Delete Account
        </SettingsButton> */}

        {/* <TouchableOpacity>
                <Text h5 style={{marginTop: "20%", fontFamily: "PingFangHK-Medium", textAlign: "center"}}>Privacy Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text h5 style={{marginTop: "2.5%", fontFamily: "PingFangHK-Medium", textAlign: "center"}}>Terms of Service</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress = {() => logout()}>
                <Text h5 style={{marginTop: "2.5%", fontFamily: "PingFangHK-Medium", textAlign: "center"}}>Log Out</Text>
            </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    // paddingVertical: 30,
  },
  button: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: 'red'
  },
  buttonText: {
    // marginTop: "2.5%",
    fontFamily: "Kollektif",
    textAlign: "left",
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontWeight: "300",
    fontSize: 22,
    // backgroundColor: 'blue'
  },
  divider: {
    borderWidth: 0.3,
    marginVertical: "1.5%",
  },
});
