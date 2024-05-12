import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Header, CardRepaso } from '../Component/';
import { postRepaso } from '../apis/RepasoApi';
import Modal from '../Component/Modal';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import '../assets/RepasoDesafio.css';
import { getColor } from '../assets/colors';
import { useFetchRepDesa } from '../Hooks/useFetchRepDesa';

import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import StyleIcon from '@mui/icons-material/Style';
export const RepasoDesafio = () => {
  const navigate = useNavigate();
  const { user_id, desafio_id, desa_id } = useParams();
  const { cards, isLoading } = useFetchRepDesa(desa_id);
  const [cardActual, setCardActual] = useState(0);
  const [repaso, setRepaso] = useState({
    cardsCorrect: 0,
    cardsIncorrect: 0,
    desaJoin: {
      id: desafio_id
    }
  })



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
    console.log("card actual ", cardActual);
    console.log("cards", cards.length)
    if (cardActual === cards.length - 1) {
      console.log("enviando repaso")
      enviarRepaso()
    }


    setCardActual(cardActual + 1)
    let btn = document.getElementById('btn-next');

    if (btn.classList.contains('display')) {
      btn.classList.remove('display')
    } else {
      btn.classList.add('display')
    }
    const elemento = document.getElementsByClassName('card-repaso');
    const elementoDetras = document.getElementsByClassName('card-repaso-detras');
    if (elemento[0].classList.contains('ocultar')) {
      elemento[0].classList.remove('ocultar');
    } else {
      elemento[0].classList.add('ocultar');
    }
    if (elementoDetras[0].classList.contains('ocultar')) {
      elementoDetras[0].classList.remove('ocultar');
    } else {
      elementoDetras[0].classList.add('ocultar');
    }

  }
  const enviarRepaso = async () => {
    const response = await postRepaso(repaso);

    console.log(response);

    // navigate(-1);
  }
  const abandonarRepaso = () => {
    navigate(-1);
  }

  console.log(isLoading)
  console.log(cards, cardActual)


  return (
    <div className='ctn-home-page'>
      <div className='ctn-header'>
        <Header />
      </div>

      <div className='ctn-repaso'>
        <div className='ctn-repaso-close'>
          {
            cards.length > 0 && cardActual < cards.length && <div className='title-repaso'><span>Repasando: </span>{cards[0].idDesaCreated.nameDesa}</div>
          }
          <Modal action={abandonarRepaso} icon={<CloseIcon />} />
        </div>

        {
          cards.length > 0 && cardActual < cards.length && <div className='resumen'>
            <div className='resumen-repaso'>
              <div className='correct'><CheckIcon /><span>{repaso.cardsCorrect}</span> Correctas</div>
              <div className='incorrect'><CloseIcon /><span> {repaso.cardsIncorrect}</span> Incorrectas</div>
              {/* <div>Total {cards.length}</div> */}
            </div>
          </div>
        }


        {
          cards.length > 0 && cardActual < cards.length ? <div className='resumen-repaso-body'> <CardRepaso color={getColor()} cardProp={cards[cardActual]} enviarRespuesta={enviarRespuesta} /></div>
            : <div>{isLoading && 'Cargando'}</div>
        }


        {
          cardActual === cards.length && <div className='repaso-end'>
            <div className='repaso-end-ctn' style={{ borderColor: getColor().back }}>
              <div className='repaso-resultados-title'><p className='icon uno'>R</p><p className='icon cuatro'>e</p><p className='icon dos'>p</p><p className='icon uno'>a</p><p className='icon tres'>s</p><p className='icon uno'>o</p><p className='icon uno'>_</p><p className='icon cuatro'>F</p><p className='icon uno'>i</p><p className='icon dos'>n</p><p className='icon tres'>a</p><p className='icon dos'>l</p><p className='icon uno'>i</p><p className='icon dos'>z</p><p className='icon tres'>a</p><p className='icon cuatro'>d</p><p className='icon tres'>o</p> <p className='icon uno'>!</p></div>
              <div>Repasando : </div>
              {
                cards.length > 0 && <div className='repaso-resultados-title-desafio'>{cards[0].idDesaCreated.nameDesa}</div>
              }

              <div className='repaso-resultados'>
                <div className='repaso-resultados-tab' style={{ background: getColor().back }}>
                  <SentimentSatisfiedAltIcon/>
                  <div className='repaso-resultados-tab-title'>Respuestas <br />Correctas </div>
                  <div className='repaso-resultados-tab-num'>{repaso.cardsCorrect} </div>
                </div>
                <div className='repaso-resultados-tab' style={{ background: getColor().back }}>
                  <SentimentVeryDissatisfiedIcon/>
                  <div className='repaso-resultados-tab-title'>Respuestas<br /> Incorrectas </div>
                  <div className='repaso-resultados-tab-num'>{repaso.cardsIncorrect} </div>
                </div>
                <div className='repaso-resultados-tab' style={{ background: getColor().back }}>
                  <StyleIcon/>
                  <div className='repaso-resultados-tab-title'>Total <br />Tarjetas </div>
                  <div className='repaso-resultados-tab-num'>{cards.length} </div>
                </div>
              </div>



              {/* <button className='btn' onClick={enviarRepaso}>Volver</button> */}

            </div>
          </div>
        }




        <div className='ctn-btn-next'>
          <div className='btn display' id='btn-next' onClick={onClickNext}>
            Siguiente
          </div>
        </div>

      </div>
    </div>
  )
}
