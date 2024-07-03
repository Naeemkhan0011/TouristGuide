import { Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import messaging from '@react-native-firebase/messaging'
import PushControllerIos from '../components/PushControllerIos'
import PushNotification from 'react-native-push-notification'

const ForgroundHandler = () => {
    useEffect(() => {
        const unsubscribe = messaging().onMessage((remotemessage) => {
            console.log('handle froground messgae', remotemessage);
            const {notification, messageId} = remotemessage

            if(Platform.OS == 'ios'){
                PushControllerIos.addNotificationRequest({
                    id: messageId,
                    body: notification?.body,
                    title: notification?.title,
                    sound: 'default'
                });
            }else{
                PushNotification.localNotification({
                    channelId: "your-channel-id",
                    id: messageId,
                    body: notification?.body,
                    title: notification?.title,
                    soundName: 'default',
                    vibrate: true,
                    playSound: true
                })
            }
        })
        return unsubscribe
    },[])
  return null
}

export default ForgroundHandler

const styles = StyleSheet.create({})