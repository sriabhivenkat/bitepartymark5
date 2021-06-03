import React from "react";

const PhoneInput = ({ ...rest }) => (
  <PhoneInput
  
    defaultCode="US"
    layout="second"
    textInputStyle={{ fontFamily: "Kollektif", fontSize: 20 }}
    countryPickerButtonStyle={{
      borderRightColor: "black",
      borderRightWidth: 1,
    }}
    codeTextStyle={{ fontFamily: "Kollektif", fontSize: 20 }}
    containerStyle={{
      borderColor: "black",
      borderWidth: 1,
      marginVertical: 10,
      borderRadius: 25,
      width: "90%",
      height: 60,
    }}
    placeholder="Enter number"
    {...rest}
  />
);
