import React from 'react';
import { Dimensions,
    CameraRoll,
    StyleSheet,
    Text,
    TouchableOpacity,
    View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Icon } from 'react-native-elements'

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text>Waiting</Text>
  </View>
);

export default class AddBento extends React.Component {
  constructor(props){
    super(props)
    this.takePicture=this.takePicture.bind(this)
  }
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
        >
          {({ camera, status }) => {
            if (status !== 'READY') return <PendingView />;
            return (
              <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                <View style={styles.iconView}>
                  <Icon style={styles.capture}
                     raised
                     name='chevron-down'
                     type='font-awesome'
                     color='white'
                     containerStyle={{backgroundColor:'red'}}
                    onPress={() => this.props.navigation.goBack()}
                  />
                </View>
                <View style={styles.iconView}>
                  <Icon 
                     raised
                     name='camera'
                     type='font-awesome'
                     containerStyle={{backgroundColor:'green'}}
                     color='white'
                     onPress={() => this.takePicture(camera)}
                  />
                </View>
              </View>
            );
          }}
        </RNCamera>
      </View>
    );
  }

  takePicture = async function(camera) {
    const options = { quality: 0.5, base64: true,forceUpOrientation:true };
    const data = await camera.takePictureAsync(options);
    //  eslint-disable-next-line
    console.log(data.uri);
    CameraRoll.saveToCameraRoll(data.uri).then((res)=>{
      console.log(res)
      this.props.navigation.state.params.onGoBack(res);
      this.props.navigation.goBack()
    })
    
   
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  iconView: {
    width:'50%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom:10
  },
});