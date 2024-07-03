import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import Toast from 'react-native-toast-message';
import { useFocusEffect } from '@react-navigation/native';

const UserFavorite = ({navigation}) => {
  useFocusEffect(
  useCallback(() => {
    Toast.show({
      type: 'custom',
      text1: 'Coming Soon',
    });
    navigation.goBack();
  }, [])
)
  return (
    <View>
      <Text>UserFavorite</Text>
    </View>
  );
};

export default UserFavorite;

const styles = StyleSheet.create({});
