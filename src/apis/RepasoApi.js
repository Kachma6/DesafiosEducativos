import { instance }  from "../apis/configs/axiosConfig";

export const postRepaso = async (repaso) =>{
    const datos = JSON.parse(sessionStorage.getItem('user'));
    const headers = `Bearer ${datos.token}`;
    try{
        const response = await instance.post(`/rep-desa`, repaso,{
            headers: { Authorization: headers}
        })
        return response.data
    }catch(error){
        return error
    }
}
export const getCards = async (desafioId) => {
    const datos = JSON.parse(sessionStorage.getItem('user'));
    const headers = `Bearer ${datos.token}`;
    try{
        const response = await instance.get(`/cards/${desafioId}`,{
            headers: { Authorization: headers}
        });
        return response.data;
    }catch(error){
        return error;
    }
}
