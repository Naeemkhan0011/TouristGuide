import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const MyPackage = ({navigation}) => {
  useFocusEffect(
    useCallback(() => {
      Toast.show({
        type:'custom',
        text1:'Coming Soon'
      })
      navigation.goBack();
    }, []),
  );
  return (
    <SafeAreaView>
      <Text>MyPackage</Text>
    </SafeAreaView>
  );
};

export default MyPackage;

const styles = StyleSheet.create({});
