import React, { useContext } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from "react-native";
import { AuthContext } from "navigation/AuthProvider";
import { Text } from "galio-framework";
import { Divider } from "react-native-elements";
import { InAppBrowser } from "react-native-inappbrowser-reborn";
import { TitleText } from "components";
import { SafeAreaView } from "react-native";

const SettingsButton = ({ children, right, style, textStyle, ...rest }) => (
  <TouchableOpacity {...rest} style={[styles.button, style]}>
    <Text style={[styles.buttonText, textStyle]}>{children}</Text>
    {right}
  </TouchableOpacity>
);
const Settings = () => {
  const { logout } = useContext(AuthContext);

  const openLink = async (url) => {
    try {
      await InAppBrowser.open(url);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <TitleText style={{ marginTop: 30 }}>Settings</TitleText>

        <SettingsButton right={<Switch />}>Push Notifications</SettingsButton>
        <Divider style={styles.divider} />
        <SettingsButton
          onPress={() =>
            openLink("https://www.kas-tech.com/privacy").catch((err) =>
              console.error(err)
            )
          }
        >
          Privacy
        </SettingsButton>
        <SettingsButton
          onPress={() => openLink("https://www.kas-tech.com/terms")}
        >
          Terms of Service
        </SettingsButton>
        <Divider style={styles.divider} />
        <SettingsButton onPress={logout}>Log Out</SettingsButton>
        <SettingsButton
          style={{
            borderWidth: 1,
            borderRadius: 20,
            borderColor: "red",
            justifyContent: "center",
            marginTop: 20,
          }}
          textStyle={{ color: "red" }}
        >
          Delete Account
        </SettingsButton>

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
    paddingHorizontal: 20,
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
    fontFamily: "PingFangHK-Medium",
    textAlign: "left",
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontWeight: "300",
    fontSize: 22,
    // backgroundColor: 'blue'
  },
  divider: {
    borderWidth: 0.3,
    marginVertical: 15,
  },
});
