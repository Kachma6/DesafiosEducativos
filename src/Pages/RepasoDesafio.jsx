import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../Component/Header';
import { getCards } from '../apis/DesafiosApi';
import { CardRepaso } from '../Component/CardRepaso';
import { postRepaso } from '../apis/RepasoApi'; 
import '../assets/RepasoDesafio.css'
export const RepasoDesafio = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
    const { user_id , desafio_id} = useParams();
    const [ cards, setCards] = useState([]);
    const [ cardActual, setCardActual ] = useState(0);
    const [ repaso , setRepaso ] = useState({
      cardsCorrect:0,
      cardsIncorrect:0,
      desaJoin:{
        id: desafio_id
      }
    })
  
    useEffect(()=>{
      getCardFromDesafio();
      
      console.log("entra")
    },[])
    const getCardFromDesafio = async () => {
      const data = await getCards(desafio_id);
      console.log("data:", data);
      setCards(data);
      
    }
    const enviarRespuesta = (cantidad) => {
      console.log(cantidad);
      if(cantidad == 1){
        setRepaso({...repaso, cardsCorrect: repaso.cardsCorrect+1})
      }else{
        setRepaso({...repaso, cardsIncorrect: repaso.cardsIncorrect+1})
      }
     
      
      setCardActual(cardActual+1);
    }
    const enviarRepaso = async () => {
      const response = await postRepaso(repaso);
     
      console.log(response);
      
      navigate(-1);
    }
    
    return (
    <div className='ctn-home-pag'>
         <div className='ctn-header'>
        <Header userId = {user_id} name={user.username}/>
      </div>
      <div className='ctn-repaso'>
     
        <div className='resumen-repaso'>
          <div className='correct'>Respuestas correctas : {repaso.cardsCorrect} </div>
          <div className='incorrect'>Respuesta Incorrectas : {repaso.cardsIncorrect}</div>
        </div>
       
        { cards.length > 0 && cardActual < cards.length? <CardRepaso cardProp={cards[cardActual]} enviarRespuesta={enviarRespuesta}/>: <div className='repaso-end'>Su repaso ha finalizado!</div> }
        {cardActual === cards.length ?<button className='btn' onClick={enviarRepaso}>Volver</button> : <></>}
        
      </div>
       
      
      
      
    </div>
  )
}
