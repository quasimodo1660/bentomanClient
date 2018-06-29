import {bentoList,tagList} from '../store/Store'
import config from '../config/config'


getBentoList=async()=>{
    await fetch(config.getBentoList.url)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log('here')
            bentoList.emptyList()
            bentoList.setBentoList(responseJson)
        })
        .catch((error) =>{
            console.error(error);
        });
}

getTagList=async()=>{
    await fetch(config.getTags.url)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log('tags')
            tagList.setTagList(responseJson.tags)
        })
        .catch((error) =>{
            console.error(error);
        });
}



export {getBentoList,getTagList}