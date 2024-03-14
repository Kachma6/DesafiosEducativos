import { instance }  from "../apis/configs/axiosConfig";

export function getUser(){
    return instance.get("/users");
}
export const fetchUsers = async () => {
    try{
        const response = await getUser();
        return response.data;
    }catch(error){
        return error;
    }
}
export const autenticate = async (username, password) => {
    try{
        const response = await instance.get(`/users/${username}/${password}`);
        return response.data;
    }catch(error){
        return error;
    }
}
export const createNewUser = async (newUser) => {
    try{
        const response = await instance.post(`/users`,newUser);
        return response.data;
    }catch(error){
        return error;
    }
}

export const suscribeDesafio = async (codigo) =>{
    try{
        const response = await instance.post(`/inscribirse`, codigo)
        return response.data
    }catch(error){
        return error
    }
}