import React from 'react';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from 'react-native'

export default class Dasb extends React.Component {
    componentDidMount(){
        PushNotification.configure(
            {
                onNotification: function(notification) {
                    console.log( 'NOTIFICATION:', notification );
                    // notification.finish(PushNotificationIOS.FetchResult.NoData);
                },
            
            }
        )
    }
    
    
    render(){
        return null
    }
}