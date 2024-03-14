import { instance } from "./configs/axiosConfig";

export const getDesafiosJoinByUserId = async (userId) => {
    try{
        const response = await instance.get(`/inscribirse/${userId}`);
        return response.data;
    }catch(error){
        return error;
    }
}
export const getDesafiosCreated = async (userId) => {
    try{
        const response = await instance.get(`/created-desa/by-user-created/${userId}`);
        return response.data;
    }catch(error){
        return error;
    }
}
export const getDesafioCreatedById = async (id) => {
    try{
        const response = await instance.get(`/created-desa/by-id/${id}`);
        return response.data;
    }catch(error){
        return error;
    }
}
export const getCards = async (desafioId) => {
    try{
        const response = await instance.get(`/cards/${desafioId}`);
        return response.data;
    }catch(error){
        return error;
    }
}
export const createDesafio = async (desafio) => {
    try{
        const response = await instance.post(`/created-desa`, desafio);
        return response.data;
    }catch(error){
        return error;
    }
}
export const editCreateDesafio = async (registerForm, id) => {
    try{
        const response = await instance.put(`/created-desa/${id}`, registerForm);
        return response.data;
    }catch(error){
        return error;
    }
}
export const deleteCreateDesafio = async (id) => {
    try{
        const response = await instance.delete(`/created-desa/${id}`);
        return response.data;
    }catch(error){
        return error;
    }
}