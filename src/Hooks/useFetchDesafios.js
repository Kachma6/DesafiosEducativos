import { useEffect, useState } from 'react'
import { getDesafiosCreated } from '../apis/DesafiosApi';
export const useFetchDesafios = (user_id) => {
    const [desafios, setDesafios] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const getDesafios = async () => {
        const newDesafios = await getDesafiosCreated(user_id);
        setDesafios(newDesafios);
        setIsLoading(false);
    }
    useEffect(()=>{
        getDesafios();
    },[])
  return {
     listDesafiosCreated: desafios,
     isLoading
    }
}
