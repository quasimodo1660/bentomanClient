import React,{PureComponent} from 'react';
import { StyleSheet,Dimensions,Image,ScrollView,ActivityIndicator,Button, View, Text } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';

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
        return (
           
         <ScrollView style={styles.container}>
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
  }
});