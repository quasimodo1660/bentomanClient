import React from 'react';
import { TextField } from 'react-native-material-textfield';
import { DatePickerIOS,TouchableOpacity,StyleSheet,Text,ScrollView,View,Image } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Divider,Button } from 'react-native-elements'
import { Icon } from 'react-native-elements'
import Moment from 'moment';
import config from '../config/config'
import axios from 'axios'
import {jsuser} from '../store/Store'




export default class AddBento extends React.Component {
  constructor(props){
    super(props)
    this.state = { 
        isDateTimePickerVisible: false,
        title:'',
        description:'',
        address:'',
        lng:'',
        lat:'',
        offertime:'',
        file:null,
        tags:[],
        displayTime:''
    };
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
    this.setState({offertime:Moment(date).format('YYYY-MM-DD')})
    this.setState({displayTime:'Pick up @'+Moment(date).format('ddd,MMM DD YYYY')})
    this._hideDateTimePicker();
  };

  _postDataToServer = async() => {
    try{
        axios.post(config.uploadBento.url,{
            user:jsuser.getUser().user_id,
            title:this.state.title,
            des:this.state.description,
            loc:this.state.address,
            offertime:this.state.offertime,
            lng:this.state.lng,
            lat:this.state.lat,
            foo:'bar'
            }).then(function (response) {
            console.log(response);
            })
      }catch(error) {
        console.log(error);
        };
  }



  render() {
    // let {title} = this.state.title
    // let {des}= this.state.description
    return (
      <ScrollView>
        <View style={styles.container}>
        <TextField
        label='Title'
        tintColor='#FE8050'
        onChangeText={(title)=>this.setState({title:title})}
        />
        <TextField
        label='Description'
        tintColor='#FE8050'
        multiline={true}
        onChangeText={(des)=>this.setState({description:des})}
        />
        </View>
      
    
        <GooglePlacesAutocomplete
            placeholder='Where is the bento ready for pickup?'
            minLength={2}
            autoFocus={false}
            returnKeyType={'default'}
            fetchDetails={true}
            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                console.log(data, details);
                this.setState({address:data.description})
                this.setState({lng:details.geometry.location.lng})
                this.setState({lat:details.geometry.location.lat})
            }}
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
        <Text style={{color:'#5d5d5d',paddingTop:10,fontSize: 16,paddingBottom:5}}>{this.state.displayTime}</Text>
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
         <Button
            icon={
            <Icon
                name='heartbeat'
                type='font-awesome'
                //size={15}
                color='white'
            />
            }
            containerViewStyle={{width: '100%', marginLeft: 0,paddingTop:8}}
            onPress={()=>this.props.navigation.navigate('MyModal',{
                onGoBack:(data)=> console.log(data)
            })}
            buttonStyle={{backgroundColor:'#FE8050'}}
            title='Upload Images'
            titleStyle={{alignSelf:'flex-start'}}
        />
        <Image 
            source={{uri:'assets-library://asset/asset.JPG?id=042FCE86-3250-4233-ACA8-FB76B3366C87&ext=JPG'}}
            style={{width:100,height:300}}/>
        <Button
            containerViewStyle={{width: '100%', marginLeft: 0,paddingTop:8}}
            onPress={this._postDataToServer}
            title='check this state'
            titleStyle={{alignSelf:'flex-start'}}
        />
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