import { useEffect, useState } from 'react'
import { getDesafioComplete } from '../apis/DesafiosApi';
export const useFetchDesafios = (desafio_id) => {
    const [desafio, setDesafio] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const getDesafios = async () => {
        const newDesafios = await getDesafioComplete(desafio_id);
        setDesafio(newDesafios);
        setIsLoading(false);
    }
    useEffect(()=>{
        getDesafios();
    },[])
  return {
     desafioComplete: desafio,
     isLoading,
     update: getDesafios
    }
}
