import  { useEffect, useState } from 'react'
import { getCards } from '../apis/RepasoApi'
export const useFetchRepDesa = (desa_id) => {
  const [cards, setCards] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const getListRepDesa = async () => {
    const newList = await getCards(desa_id);
    
    setCards(newList);
    
    setIsLoading(false);
  }
  useEffect(()=>{
     getListRepDesa();
    
  },[])
  return {
    cards,
    isLoading
  }
  
}
