import {bentoList} from '../store/Store'
import config from '../config/config'


getBentoList=async()=>{
    await fetch(config.getBentoList.url)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log('here')
            bentoList.setBentoList(responseJson)
        })
        .catch((error) =>{
            console.error(error);
        });
}




export {getBentoList}