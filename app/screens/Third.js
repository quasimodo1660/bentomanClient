import React,{PureComponent} from 'react';
import { StyleSheet,Dimensions,Image,ScrollView,ActivityIndicator,Button, View, Text } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import Tags from "react-native-tags";




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
          </ScrollView>
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
  },
  tag:{
    backgroundColor:'grey',
    borderRadius:25,
  }
});