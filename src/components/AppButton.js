import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import config from "../config";

const AppButton = ({
  buttonStyle,
  textStyle,
  text,
  onPress,
  disabled,
  
}) => {
  return (
    <TouchableOpacity
        activeOpacity={0.8}
        disabled={disabled}
        onPress={onPress}
        style={[styles.button, buttonStyle]}
      >
        <Text style={[styles.text,textStyle]}>{text}</Text>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    // marginHorizontal: 20,
  },
  button: {
    borderRadius: 12,
    height: 44,
    backgroundColor:config.colors.yellowColor,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5
  },
  text: {
    color: config.colors.white,
    fontSize: config.constants.PrimaryFontSize,
    textAlign: "center",
    fontFamily: config.fonts.HeadingFont,
    lineHeight:20
  },
});

export default AppButton;
