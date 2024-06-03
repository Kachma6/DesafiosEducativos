import axios from "axios";
const urlpixabay = "https://pixabay.com/api/";
const key = "43988013-d7795197ff421e02d5de6cc38";


export const getImages = async (word) =>{

    try{
        const response = await axios.get(`https://pixabay.com/api/?key=${key}&q=${word}&per_page=5&lang=es`)
       
        return response.data
    }catch(error){
        return error
    }
}
export const getImagesById = async (id) =>{

    try{
        const response = await axios.get(`https://pixabay.com/api/?key=${key}&id=${id}`)
     
        return response.data
    }catch(error){
        return error
    }
}