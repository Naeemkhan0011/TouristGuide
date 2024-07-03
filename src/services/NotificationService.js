import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
// import NavigationService from '../Navigation/NavigationService';
// import notifee, { AndroidImportance } from '@notifee/react-native';

export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
        getFcmToken()
    }
}

const getFcmToken = async () => {

    let fcmtoken = await AsyncStorage.getItem("fcmtoken")
    if (!fcmtoken) {
        try {

            const token = await messaging().getToken()
            if (fcmtoken) {
                AsyncStorage.setItem("fcmtoken", fcmtoken)
            }
            console.log("fcm token:", token)
        } catch (error) {
            console.log("error in creating token")
        }
    }

}



export const notificationListeners = () => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

   

    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage.notification,
        );
    });

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        console.log('Message handled in the background!', remoteMessage);
       
    });

    // Check whether an initial notification is available
    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage.notification,
                );
            }
        });


    messaging().onMessage((remotemessage) => {
        console.log('handle froground messgae', remotemessage);
        const { notification, messageId } = remotemessage
        Toast.show({
            type: 'custom',
            position:'top',
            text1:  notification?.body,
            text2: notification?.title
        })
        


        // if (Platform.OS == 'ios') {
        //     PushControllerIos.addNotificationRequest({
        //         id: messageId,
        //         body: notification?.body,
        //         title: notification?.title,
        //         sound: 'default'
        //     });
        // } else {
        //     PushNotification.localNotification({
        //         channelId: "your-channel-id",
        //         id: messageId,
        //         body: notification?.body,
        //         title: notification?.title,
        //         soundName: 'default',
        //         vibrate: true,
        //         playSound: true
        //     })
        // }
    })
}

// export async function notificationListeners() {
//     const unsubscribe = messaging().onMessage(async remoteMessage => {
//         console.log('A new FCM message arrived!', remoteMessage);
//         onDisplayNotification(remoteMessage)
//     });


//     messaging().onNotificationOpenedApp(remoteMessage => {
//         console.log(
//             'Notification caused app to open from background state:',
//             remoteMessage,
//         );

//         // if (!!remoteMessage?.data && remoteMessage?.data?.redirect_to == "ProductDetail") {
//         //     setTimeout(() => {
//         //         NavigationService.navigate("ProductDetail", { data: remoteMessage?.data })
//         //     }, 1200);
//         // }

//         // if (!!remoteMessage?.data && remoteMessage?.data?.redirect_to == "Profile") {
//         //     setTimeout(() => {
//         //         NavigationService.navigate("Profile", { data: remoteMessage?.data })
//         //     }, 1200);
//         // }
//     });

//     // Check whether an initial notification is available
//     messaging()
//         .getInitialNotification()
//         .then(remoteMessage => {
//             if (remoteMessage) {
//                 console.log(
//                     'Notification caused app to open from quit state:',
//                     remoteMessage.notification,
//                 );

//             }
//         });

//     return unsubscribe;
// }