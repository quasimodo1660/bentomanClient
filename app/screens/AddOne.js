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
import {jsuser,tagList} from '../store/Store'
import ResponsiveImage from 'react-native-responsive-image';
import { TagSelect } from 'react-native-tag-select';




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
        file:'',
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
    //console.log(JSON.stringify(this.tag.itemsSelected))
    const formData= new FormData();
        formData.append('user',jsuser.getUser().user_id)
        formData.append('title',this.state.title)
        formData.append('photo',{
            uri:this.state.file,
            type:'file',
            name:this.state.title
        })
        formData.append('des',this.state.description)
        formData.append('lng',this.state.lng)
        formData.append('lat',this.state.lat)
        formData.append('loc',this.state.address)
        formData.append('offertime',this.state.offertime)
        formData.append('tags',JSON.stringify(this.tag.itemsSelected))
    try{
        axios.post(config.uploadBento.url,formData,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            }
            }).then(function (response) {
            console.log(response);
            })
      }catch(error) {
        console.log(error);
        };
  }



  render() {
    if(this.state.file){
        uploadImage=(
            <ResponsiveImage 
                source={{uri:this.state.file}}
                //style={styles.canvas}
                initWidth="250" 
                initHeight="444"
            />
        )
    }
    else{
        uploadImage=(
            <Icon 
            name='camera'
            type='font-awesome'
            color='#FE8050'
            size={100}
         />
        )
    }
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
         <View style={styles.imageHolder}>
            {uploadImage}
        </View>
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
                onGoBack:(data)=> this.setState({file:data})
            })}
            buttonStyle={{backgroundColor:'#FE8050'}}
            title='Upload Images'
            titleStyle={{alignSelf:'flex-start'}}
        />
        <View style={styles.tagcontainer}>
       <Text style={styles.labelText}>Ingredient:</Text>
        <TagSelect
          data={tagList.getTagList()}
          ref={(tag) => {
            this.tag = tag;
          }}
          itemStyle={styles.item}
          itemLabelStyle={styles.label}
          itemStyleSelected={styles.itemSelected}
          itemLabelStyleSelected={styles.labelSelected}
        />
        </View>

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
    flexGrow:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flexDirection: 'row',
    //position: 'relative',
    paddingTop:25,
    paddingLeft:15,
    paddingRight:15,
    paddingBottom:25
  },
  canvas: {
    //position: 'absolute',
    resizeMode:'contain',
    height:250,
    flexDirection:'row',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  tagcontainer: {
    flex: 1,
    backgroundColor: '#FFF',
    marginTop: 50,
    marginLeft: 15,
  },
  buttonContainer: {
    padding: 15,
  },
  buttonInner: {
    marginBottom: 15,
  },
  labelText: {
    color: '#333',
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 15,
  },
  item: {
    borderWidth: 1,
    borderColor: '#FE8050',    
    backgroundColor: '#FFF',
  },
  label: {
    color: '#333'
  },
  itemSelected: {
    backgroundColor: '#FE8050',
  },
  labelSelected: {
    color: 'white',
  },
})