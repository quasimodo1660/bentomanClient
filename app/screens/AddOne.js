import React from 'react';
import { TextField } from 'react-native-material-textfield';
import { DatePickerIOS,TouchableOpacity,StyleSheet,Text,ScrollView,View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Divider,Button } from 'react-native-elements'
import { Icon } from 'react-native-elements'




export default class AddBento extends React.Component {
  constructor(props){
    super(props)
    this.state = { isDateTimePickerVisible: false,};
  }
  
  static navigationOptions = ({navigation}) => {
    return{
      title: 'Add a Bento',    
    }
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this._hideDateTimePicker();
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
        <TextField
        label='Title'
        tintColor='#FE8050'
        //placeholder='What is the name of the bento?'
        />
        <TextField
        label='Description'
        tintColor='#FE8050'
        multiline={true}
        //placeholder='Any description for the bento?'
        />
        </View>
      
    
        <GooglePlacesAutocomplete
            placeholder='Where is the bento ready for pickup?'
            minLength={2}
            autoFocus={false}
            returnKeyType={'default'}
            fetchDetails={true}
            styles={{
                textInputContainer: {          
                backgroundColor: 'rgba(0,0,0,0)',
                borderTopWidth: 0,
                borderBottomWidth:0,
                padding:0
                },
                textInput: {
                marginLeft: 4,
                marginRight: 0,
                height: 38,
                color: '#5d5d5d',
                fontSize: 16,
                },
                predefinedPlacesDescription: {
                color: '#1faadb'
                },
            }}
            currentLocation={false}
            query={{
                // available options: https://developers.google.com/places/web-service/autocomplete
                key: 'AIzaSyAD1BgNBjRye5nHsUPtz-EukHsXe4anQhc',
                language: 'en', // language of the results
                //types: '(cities)' // default: 'geocode'
            }}           
        />
        <View style={styles.container}>
         <Button
            containerViewStyle={{width: '100%', marginLeft: 0,paddingTop:8}}
            onPress={this._showDateTimePicker}
            buttonStyle={{backgroundColor:'#FE8050'}}
            title='When is the bento ready for pickup?'
            titleStyle={{alignSelf:'flex-start'}}
        />
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
        </View>
        <View style={styles.imageHolder}>
         <Icon
            raised
            name='heartbeat'
            type='font-awesome'
            color='#f50'
            onPress={() => console.log('hello')} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
    paddingTop:0,
    paddingLeft:15,
    paddingRight:15
    //backgroundColor: 'black',
  },
  imageHolder:{
    flex: 1,
    // flexDirection: 'row',
    paddingTop:5,
    paddingLeft:15,
    paddingRight:15,
    borderWidth: 1,
    borderColor: '#F44336',
    justifyContent: 'center',
    alignItems: 'center',
  }
})