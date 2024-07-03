import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import config from '../config';

const AppHeader = ({
  title,
  navigation,
  rightimg,
  leftImageEnabled = true,
  onRightPress,
  onPress,
  tintColor,
  color,
  rightText =true,
  onRightTextPress,
  imgstyle,
  backgroundColor
}) => {

  return (
    <View style={[styles.container, {
      backgroundColor: backgroundColor ? backgroundColor : config.colors.white
    }]}>
      {leftImageEnabled &&
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => (onPress ? onPress() : navigation.goBack())}>
          <Image
            source={config.images.RIGHT_ARROW}
            style={[
              styles.backimgStyle,
              { tintColor: tintColor && tintColor },
            ]}
          />
        </TouchableOpacity>}

      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Text style={[styles.textStyle, { color: color ? color : config.colors.white }]}>
          {title}
        </Text>
      </View>

      {rightText && (
         <Text
         onPress={onRightTextPress}
         style={[styles.textStyle, { color: color ? color : config.colors.white }]}>
         {rightText}
       </Text>
      )}

      {rightimg && (
        <TouchableOpacity activeOpacity={0.8} onPress={onRightPress}>
          <Image source={rightimg} style={[styles.rightimgStyle, imgstyle]} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 60,
    alignItems: 'center',
    paddingHorizontal: 20,

  },
  textStyle: {
    fontFamily: config.fonts.SemiboldFont,
    color: config.colors.blackColor,
    fontSize: 16,
    lineHeight: 24,
    marginRight:10
  },
  backimgStyle: {
    width: 24,
    height: 24,
    tintColor: config.colors.white,
    transform:[{rotate: '180deg'}],
    resizeMode: 'contain',
  },
  rightimgStyle: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    // right: 10,
  },
});
