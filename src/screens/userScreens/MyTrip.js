import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const MyTrip = ({navigation}) => {

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
      <Text>MyTrip</Text>
    </View>
  )
}

export default MyTrip

const styles = StyleSheet.create({})