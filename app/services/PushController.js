import PushNotification from 'react-native-push-notification';
import { PushNotificationIOS } from 'react-native'

const configure = () =>{
    PushNotification.configure({

        onRegister: function(token) {
          //process token
        },
     
        onNotification: function(notification) {
          console.log( 'NOTIFICATION:', notification );
          // process the notification
          // required on iOS only
          notification.finish(PushNotificationIOS.FetchResult.NoData);
          // if(notification.foreground){
          //   // PushNotification.localNotification({
          //   //   title:notification.title,
          //   //   message:notification.message
          //   PushNotificationIOS.presentLocalNotification({
          //     alertBody:notification.message,
          //   })
          PushNotification.localNotificationSchedule({
            title: 'Hello',
            message: notification.message,
            date: new Date(Date.now() + (2 * 1000)), // in 10 secs
            foreground: true,
          }) 
          // }
          
          
        },
     
        permissions: {
          alert: true,
          badge: false,
          sound: true
        },
     
        popInitialNotification: true,
        requestPermissions: true,
     
      });
};

const localNotification = (t,m) => {
  PushNotification.localNotification({
    title: t,
    message: m,
    playSound: true,
    soundName: 'default',
    actions: '["Accept", "Reject"]',
    // foreground:true,
  });
 };



export {
    configure,
    localNotification,
}