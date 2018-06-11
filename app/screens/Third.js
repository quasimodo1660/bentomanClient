import React,{PureComponent} from 'react';
import { StyleSheet,Dimensions,Image,ScrollView,ActivityIndicator,Button, View, Text } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import Tags from "react-native-tags";
import Mapbox from '@mapbox/react-native-mapbox-gl';

Mapbox.setAccessToken('pk.eyJ1IjoicXVhc2ltb2RvMTY2MCIsImEiOiJjamc0NDl3cjUxM3BrMnF4ZmtxOXE3YWg3In0.kVwbt6_30MvCJq12iNchOQ');

export const { width, height } = Dimensions.get('window');


export default class Third extends React.Component {
    constructor(props){
        super(props)
        this.state={isLoading:true}
        this.itemUrl=this.props.navigation.getParam('itemUrl');
        
    }
   


    static navigationOptions = ({navigation}) => {
        return{
          title: navigation.getParam('itemTitle','shaxixi'),
        };     
    };  

    componentWillMount() {
      // console.log(this.itemUrl)
        return fetch(this.itemUrl)
            .then((response) => response.json())
            .then((responseJson) => {
              // console.log(responseJson)
                this.setState({
                  isLoading:false,
                  dataSource:responseJson,
                });
                // console.log(this.state.dataSource)
            })
            .catch((error) =>{
                console.error(error);
            });
    } 

    renderAnnotations () {
      return (
        <Mapbox.PointAnnotation
          key='pointAnnotation'
          id='pointAnnotation'
          coordinate={[this.state.dataSource.lon, this.state.dataSource.lat]}>
  
          <View style={styles.annotationContainer}>
            <View style={styles.annotationFill} />
          </View>
          <Mapbox.Callout title={this.state.dataSource.title} />
        </Mapbox.PointAnnotation>
      )
    }

    
   

    render(){
        if(this.state.isLoading){
            return(
              <View style={{flex: 1, padding: 20}}>
                <ActivityIndicator/>
              </View>
            )
          }
        if(this.state.dataSource.images.length<2){
          showimg=(<Image style={styles.child} source={{uri:this.state.dataSource.images[0].image }}/>)
        }
        else{
          showimg=(
            <SwiperFlatList
              autoplay
              autoplayDelay={2}
              autoplayLoop
              index={0}
              showPagination
            >
              {this.state.dataSource.images.map((image,index)=>(
              
                  <Image 
                    key={'img'+index}
                    style={styles.child}
                    source={{uri:image.image}}
                  />
              
              ))}         
            </SwiperFlatList>
          )
        }
        return (
           
         <ScrollView style={styles.container}>
            {showimg}
            
            <Card>   
            <CardTitle
              
              // avatarSource={{uri:'https://i.imgur.com/Keg7X6S.png'}}
              title = {this.state.dataSource.user}
            />
            
            <Tags
              initialTags={this.state.dataSource.tags}
              // containerStyle={{ justifyContent: "center" }}
              inputStyle={{ backgroundColor: "white" }}
            />           
              <CardTitle
                subtitle='Description'
              />
              <CardContent text={this.state.dataSource.description} />     
            </Card>
            <Card>
              <CardTitle
                subtitle='Location'/>
              <Mapbox.MapView
                  styleURL={Mapbox.StyleURL.Dark}
                  zoomLevel={15}
                  centerCoordinate={[this.state.dataSource.lon, this.state.dataSource.lat]}
                  style={styles.map}>
                  {this.renderAnnotations()}
              </Mapbox.MapView>
            </Card>
          </ScrollView>
        );
    }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  map:{
   width:width*0.3,
    height:200,
    // marginRight:5
  },
  child: {  
    height: height * 0.5,
    width,
    justifyContent: 'center'
  },
  text: {
    fontSize: width * 0.5,
    textAlign: 'center'
  },
  tag:{
    backgroundColor:'grey',
    borderRadius:25,
  },
  annotationContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  annotationFill: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'orange',
    transform: [{ scale: 0.6 }],
  }
});