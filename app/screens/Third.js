import React,{PureComponent} from 'react';
import { StyleSheet,Dimensions,Image,ScrollView,ActivityIndicator,Button, View, Text } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';

export const { width, height } = Dimensions.get('window');


export default class Third extends React.Component {
    constructor(props){
        super(props)
        this.isLoading=true
        this.itemUrl=this.props.navigation.getParam('itemUrl');
        this.data={}
    }
   


    static navigationOptions = ({navigation}) => {
        return{
          title: navigation.getParam('itemTitle','shaxixi'),
        };     
      };  

    componentWillMount() {
        return fetch(this.itemUrl)
            .then((response) => response.json())
            .then((responseJson) => {
                this.data=responseJson;
                this.isLoading=false
            })
            .catch((error) =>{
                console.error(error);
            });
  }
    
   

    render(){
        if(this.isLoading){
            return(
              <View style={{flex: 1, padding: 20}}>
                <ActivityIndicator/>
              </View>
            )
          }
        return (
           
         <View style={styles.container}>
            <Text>sb</Text>   
          </View>
        );
    }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  child: {
    height: height * 0.5,
    width,
    justifyContent: 'center'
  },
  text: {
    fontSize: width * 0.5,
    textAlign: 'center'
  }
});