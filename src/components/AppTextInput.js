import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Text,
  TouchableOpacity,
  Image,
  I18nManager,
} from 'react-native';
import config from '../config';

const AppTextInput = ({
  inputTextLabel,
  showVerticalLine,
  viewStyle,
  textInputStyle,
  onChangeText,
  editable,
  value,
  textAlignVertical,
  autoCapitalize,
  rightIcon,
  rightIconStyle,
  rightIconPress,
  onRefs,
  leftIconStyle,
  leftIconViewStyle,
  secureTextEntry,
  placeholder,
  keyboardType,
  inputLabelmarginHorizontal,
  multiline,
  numberOfLines,
  leftIcon,
  labelStyle,
  maxLength,
  inputTextLabelVisible=false,
  onSubmitEditing,
  ...props
}) => {
  return (
    <View>
      {inputTextLabel && (
        <View style={styles.labelContiner}>
          <Text
            style={[
              {
                ...styles.labelText,
                textAlign: 'left',
                marginHorizontal:
                  inputLabelmarginHorizontal && inputLabelmarginHorizontal,
              },
              labelStyle,
            ]}>
            {inputTextLabel && inputTextLabel}
          </Text>
        </View>
      )}
      <View 
      style={[styles.contentView, viewStyle]}>
         {leftIcon && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={rightIconPress}
            style={[{
              width:'12%',
              borderLeftColor: '#D6D6D6',
              borderLeftWidth:
                showVerticalLine && showVerticalLine == true ? 1 : 0,
            }, leftIconViewStyle]}>
            <Image
              source={leftIcon && leftIcon}
              style={[styles.leftIconStyle, leftIconStyle]}
            />
          </TouchableOpacity>
        )}
        <TextInput
          {...props}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          style={[styles.textInput, textInputStyle]}
          ref={inputRef => {
            onRefs && onRefs(inputRef);
          }}
          autoCorrect={false}
          placeholderTextColor={config.colors.lightGrey2Color  }
          keyboardType={keyboardType}
          multiline={multiline ? multiline : false}
          numberOfLines={numberOfLines}
          onChangeText={onChangeText}
          autoCapitalize={'none'}
          textAlignVertical={textAlignVertical}
          editable={editable}
          value={value}
          caretHidden={false}
          maxLength={maxLength}
          onSubmitEditing={onSubmitEditing}
          returnKeyType={multiline ? 'next' : 'done'}
        />

        {rightIcon && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={rightIconPress}
            style={{
              borderLeftColor: '#D6D6D6',
              borderLeftWidth:
                showVerticalLine && showVerticalLine == true ? 1 : 0,
            }}>
            <Image
              source={rightIcon && rightIcon}
              style={[styles.rightIconImage, rightIconStyle]}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentView: {
    padding: 8, // Also used to make it look nicer
    zIndex: 0,
    flexDirection: 'row',
    height: 52,
    borderRadius: 4,
    alignItems: 'center',
    marginVertical: 5,
    borderColor: config.colors.lightGreyColor,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  textInput: {
    height: 52,
    width:'90%',
    fontSize: 14,
    color: config.colors.blackColor,
    fontFamily: config.fonts.LatoRegularFont,
  },
  eyeIcon: {
    height: 40,
    width: 40,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelContiner: {
    // marginBottom: 5,
    backgroundColor: "white", // Same color as background
        alignSelf: "flex-start", // Have View be same width as Text inside
        paddingHorizontal: 3, // Amount of spacing between border and first/last letter
        marginStart: 10, // How far right do you want the label to start
        zIndex: 1, // Label must overlap border
        elevation: 1, // Needed for android
        shadowColor: "white", // Same as background color because elevation: 1 creates a shadow that we don't want
        position: "absolute", // Needed to be able to precisely overlap label with border
        top: -5,
  },
  labelText: {
    fontFamily: config.fonts.SemiboldFont,
    color: config.colors.blackColor,
    fontSize: 13,
  },
  rightIconImage: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginHorizontal: 7,
  },
  leftIconStyle: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginHorizontal: 7,
  },
});

export default AppTextInput;
