import React from "react";
import Input from "react-native-phone-number-input";
export const PhoneInput = ({ ...rest }) => (
  <Input
  
    defaultCode="US"
    layout="second"
    textInputStyle={{ fontFamily: "Kollektif", fontSize: 20 }}
    countryPickerButtonStyle={{
    //   borderRightColor: "black",
    //   borderRightWidth: 1,
    width: 70,
    }}
    textContainerStyle={{ borderTopRightRadius: 25, borderBottomRightRadius: 25, paddingVertical: 0}}
    codeTextStyle={{ fontFamily: "Kollektif", fontSize: 20 }}
    containerStyle={{
      borderColor: "black",
      borderWidth: 1,
    //   flex: 1,
      marginVertical: 10,
      borderRadius: 15,
      width: "100%",
      height: 50,
    }}
    placeholder="Enter number"
    {...rest}
  />
);
