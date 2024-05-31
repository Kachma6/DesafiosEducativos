import * as React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { suscribeDesafio } from '../apis/UserApi'
import { AlertStatus } from './AlertStatus';
import '../assets/Suscribe.css';
import '../assets/ChooseImages.css';
import { getImages } from '../apis/pixabay';
import { Image } from '../Component/Image';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import InputBase from '@mui/material/InputBase';



import SearchIcon from '@mui/icons-material/Search';
export const SearchImage = ({ getImagenChoose }) => {
    const [openModal, setOpenModal] = useState(false);
    const [images, setImages] = useState([]);
    const [wordKey, setwordKey] = useState("");
    const [maxWidth, setMaxWidth] = useState('sm');



    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };
    const getImagesSearch = async (word) => {
        const data = await getImages(word);
        setImages(data.hits);
        console.log(data.hits);
    }
    const onSubmit = () => {
        //    event.preventDefault();
        getImagesSearch(wordKey);
    }
    const chooseImagen = (imagen) => {
        console.log(imagen);
        getImagenChoose({ id: imagen.id, url: imagen.webformatURL })
        setOpenModal(false);
    }
    return (
        <React.Fragment>



            <div  onClick={() => setOpenModal(true)}>
                <AddPhotoAlternateIcon />
            </div>



            <Dialog
                open={openModal}
                fullWidth={true}
                maxWidth={maxWidth}
                onClose={() => setOpenModal(false)}
            >
                <DialogTitle>Buscar imagen</DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={() => setOpenModal(false)}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent>
                    <DialogContentText  sx={{
                        marginBottom:"30px"
                    }}>
                        Busca una imagen que describa tu definición
                    </DialogContentText>
                    
                   <div style={{ display: "flex" }}>
                   <TextField
                        required
                        margin="none"
                        id="description"
                        name="images"
                        label="Palabra clave"
                        type="text"
                        fullWidth
                        inputProps={{ maxLength: 200 }}
                        variant="outlined"
                        value={wordKey}
                        onChange={(e) => setwordKey(e.target.value)}

                    />
                    <button className='btn' type="submit" onClick={() => onSubmit()}><SearchIcon /></button>
                   </div>

                    
                </DialogContent>

                <DialogActions>


                </DialogActions>
                <div className='ctn-grid-images'>
                    {
                        images.length > 0 ?
                            images.map((imagen) => (
                                // <img src={imagen.previewURL}></img>
                                <Image imagen={imagen} key={imagen.id} imagenClick={() => chooseImagen(imagen)} />

                            )) :
                            <div></div>
                    }
                </div>
            </Dialog>
        </React.Fragment>
    );
}