import { instance } from "./configs/axiosConfig";

export const getDesafiosJoinByUserId = async (userId) => {
    const datos = JSON.parse(localStorage.getItem('user'));
    const headers = `Bearer ${datos.token}`;
    try{
        const response = await instance.get(`/inscribirse/${userId}`,{
            headers: { Authorization: headers}
        });
        return response.data;
    }catch(error){
        return error;
    }
}
export const getDesafiosCreated = async (userId) => {
    const datos = JSON.parse(localStorage.getItem('user'));
    const headers = `Bearer ${datos.token}`;

    try{
        const response = await instance.get(`/created-desa/by-user-created/${userId}`,{
            headers: { Authorization: headers}
        });
        console.log("dataaaaaaaaa",response);
        return response.data;
    }catch(error){
        console.log(error)
        return error;
    }
}
export const getDesafioCreatedById = async (id) => {
    const datos = JSON.parse(localStorage.getItem('user'));
    const headers = `Bearer ${datos.token}`;
    try{
        const response = await instance.get(`/created-desa/by-id/${id}`,{
            headers: { Authorization: headers}
        });
        return response.data;
    }catch(error){
        return error;
    }
}
export const getCards = async (desafioId) => {
    const datos = JSON.parse(localStorage.getItem('user'));
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
export const getDesafioComplete = async (desafioId) => {
    const datos = JSON.parse(localStorage.getItem('user'));
    const headers = `Bearer ${datos.token}`;
    try{
        const response = await instance.get(`/created-desa/by-id/${desafioId}/complete`,{
            headers: { Authorization: headers}
        });
        return response.data;
    }catch(error){
        return error;
    }
}
export const createDesafio = async (desafio) => {
    const datos = JSON.parse(localStorage.getItem('user'));
    const headers = `Bearer ${datos.token}`;
    console.log("headers", headers)
    try{
        const response = await instance.post(`/created-desa`, desafio, {
            headers: { Authorization: headers}
        });
        console.log("res apiiiiiiiiiiiiii",response)
        return response;
    }catch(error){
        console.log("error",error)
        return error;
        
    }
}
export const editCreateDesafio = async (registerForm, id) => {
    const datos = JSON.parse(localStorage.getItem('user'));
    const headers = `Bearer ${datos.token}`;
    try{
        const response = await instance.put(`/created-desa/${id}`, registerForm,{
            headers: { Authorization: headers}
        });
        return response.data;
    }catch(error){
        return error;
    }
}
export const deleteCreateDesafio = async (id) => {
    const datos = JSON.parse(localStorage.getItem('user'));
    const headers = `Bearer ${datos.token}`;
    try{
        const response = await instance.delete(`/created-desa/${id}`,{
            headers: { Authorization: headers}
        });
        return response;
    }catch(error){
        return error;
    }
}