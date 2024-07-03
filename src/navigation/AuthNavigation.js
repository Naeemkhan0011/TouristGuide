import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';


const Stack = createNativeStackNavigator();

const AuthNavigation = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
  
  </Stack.Navigator>
);

export default AuthNavigation;
