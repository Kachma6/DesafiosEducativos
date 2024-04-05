import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../Component/Header';
import { getCards } from '../apis/DesafiosApi';
import { CardRepaso } from '../Component/CardRepaso';
import { postRepaso } from '../apis/RepasoApi';
import Modal from '../Component/Modal';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import '../assets/RepasoDesafio.css';
import { colorsSet } from '../assets/colors';
import imagen from '../Images/5143494.jpg'
export const RepasoDesafio = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const { user_id, desafio_id, desa_id } = useParams();
  const [cards, setCards] = useState([]);
  const [cardActual, setCardActual] = useState(0);
  const [repaso, setRepaso] = useState({
    cardsCorrect: 0,
    cardsIncorrect: 0,
    desaJoin: {
      id: desa_id
    }
  })

  useEffect(() => {
    getCardFromDesafio();

    console.log("entra")
    console.log(cards)
  }, [])
  const getCardFromDesafio = async () => {
    const data = await getCards(desa_id);
    console.log("data:", data);
    setCards(data);

  }
  const enviarRespuesta = (cantidad) => {
    console.log(cantidad);
    if (cantidad == 1) {
      setRepaso({ ...repaso, cardsCorrect: repaso.cardsCorrect + 1 })
    } else {
      setRepaso({ ...repaso, cardsIncorrect: repaso.cardsIncorrect + 1 })
    }


    // setCardActual(cardActual + 1);
  }
  const onClickNext = () => {
    setCardActual(cardActual+1)
    let btn = document.getElementById('btn-next');
   
    if(btn.classList.contains('display')){
      btn.classList.remove('display')
    }else{
      btn.classList.add('display')
    }
    const elemento = document.getElementsByClassName('card-repaso');
    const elementoDetras = document.getElementsByClassName('card-repaso-detras');
    if(elemento[0].classList.contains('ocultar')){
      elemento[0].classList.remove('ocultar');
    }else{
      elemento[0].classList.add('ocultar');
    }
    if(elementoDetras[0].classList.contains('ocultar')){
      elementoDetras[0].classList.remove('ocultar');
    }else{
      elementoDetras[0].classList.add('ocultar');
    }
  
  }
  const enviarRepaso = async () => {
    const response = await postRepaso(repaso);

    console.log(response);

    navigate(-1);
  }
  const abandonarRepaso = () => {
    navigate(-1);
  }
  const randomNumberInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  console.log(repaso)
  return (
    <div className='ctn-home-pag'>
      <div className='ctn-header'>
        <Header user={user} />
      </div>
      <div className='ctn-repaso'>
        <div className='ctn-repaso-close'>
          <div className='resumen'>
            <div className='resumen-repaso'>
              <div className='correct'><CheckIcon /><span>{repaso.cardsCorrect}</span> </div>
              <div className='incorrect'><CloseIcon /><span> {repaso.cardsIncorrect}</span></div>
            </div>
          </div>
          <Modal  action={abandonarRepaso} icon={<CloseIcon />} />
        </div>


        <div className='resumen-repaso-body'>
          {cards.length > 0 && cardActual < cards.length ?
           <CardRepaso color={colorsSet[randomNumberInRange(0, 25)]} cardProp={cards[cardActual]} enviarRespuesta={enviarRespuesta} /> 
          : <div className='repaso-end'>
            <div className='repaso-end-ctn'>
            <div> Su repaso ha finalizado!</div>
            
            <button className='btn' onClick={enviarRepaso}>Volver</button>
           {/* {cardActual === cards.length &&  } */}
            </div>
         
         
          </div>
          }

            

        </div>

        <div className='btn display' id='btn-next' onClick={onClickNext}>
          Next
        </div>

      </div>




    </div>
  )
}
