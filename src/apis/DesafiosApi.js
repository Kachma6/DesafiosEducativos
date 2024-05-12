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
        const response = await instance.get(`/created-desa/user/${userId}`,{
            headers: { Authorization: headers}
        });
        return response.data;
    }catch(error){
        return error;
    }
}
export const getDesafioCreatedById = async (id) => {
    const datos = JSON.parse(localStorage.getItem('user'));
    const headers = `Bearer ${datos.token}`;
    try{
        const response = await instance.get(`/created-desa/${id}`,{
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
        const response = await instance.get(`/created-desa/${desafioId}/complete`,{
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
    try{
        const response = await instance.post(`/created-desa`, desafio, {
            headers: { Authorization: headers}
        });
        return response;
    }catch(error){
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
        return response;
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