import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

// BaseToast styles
const HEIGHT = 60;
const WIDTH = "100%";
const BORDER_RADIUS = 5;

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    height: HEIGHT,
    width: WIDTH,
    borderRadius: BORDER_RADIUS,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: BORDER_RADIUS,
    elevation: 2,
    backgroundColor: "#FFF",
  },
  leadingBorder: {
    borderLeftWidth: 5,
    borderLeftColor: "#D8D8D8",
  },
  contentContainer: {
    paddingHorizontal: 25,
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  text1: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 2,
    color: "#000",
    width: "100%",
  },
  text2: {
    fontSize: 10,
    color: "#979797",
    flexShrink: 1,
  },
});

const CustomBaseToast = ({ text1, text2, onPress }) => {
  return (
    <Pressable onPress={onPress} style={[styles.base, styles.leadingBorder]}>
      <View style={styles.contentContainer}>
        <Text style={styles.text1}>{text1}</Text>
        <Text style={styles.text2}>{text2}</Text>
      </View>
    </Pressable>
  );
};

export const toastConfig = {
  error: (props) => <CustomBaseToast {...props} />,
};
