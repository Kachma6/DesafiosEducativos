import React, { useEffect, useState } from 'react'
import { getImages } from '../apis/pixabay';
import '../assets/ChooseImages.css';
import TextField from '@mui/material/TextField';
export const ChooseImages = () => {
  const [ images , setImages] = useState([]);
  const [ wordKey , setwordKey] = useState("zapato");
//   useEffect(()=>{
//    getImagesSearch("zapato");
//   }, [])

  const getImagesSearch = async (word) => {
     const data = await getImages(word);
     setImages(data.hits);
     console.log(data.hits);
  }
  const onSubmit = (event) => {
    event.preventDefault();
    getImagesSearch(wordKey);
  }
  return (
    <div>
        <div>
        <form onSubmit={(event)=> onSubmit(event)}>
           
            <TextField
                required
                margin="normal"
                id="description"
                name="images"
                label="Buscar imagenes"
                type="text"
                fullWidth
                inputProps={{ maxLength: 200 }}
                variant="outlined"
                value={wordKey}
                onChange={(e)=>setwordKey(e.target.value)}
               
              />
        </form>
        </div>
       
        <div className='ctn-grid-images'>
            {
                images.length > 0 ?
                images.map((imagen)=>(
                    // <img src={imagen.previewURL}></img>
                    <div  key={imagen.id}>
                        <div className='grid-imagen'>
                        <img src={imagen.webformatURL} height={"100px"}></img>
                        </div>
                        
                    </div>
                    
                )):
                <div>no hay</div>
            }
        </div>
        
    </div>
  )
}
