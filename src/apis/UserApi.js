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
        const response = await instance.post(`/auth/login`, {username:username,password:password});
        console.log("entra aqui request")
        return response;
    }catch(error){
        console.log("entra aqui request")

        return error;
    }
}
export const createNewUser = async (newUser) => {
    try{
        const response = await instance.post(`/auth/register`,newUser);
        return response.data;
    }catch(error){
        return error;
    }
}

export const suscribeDesafio = async (codigo) =>{
    const datos = JSON.parse(localStorage.getItem('user'));
    const headers = `Bearer ${datos.token}`;
    try{
        const response = await instance.post(`/inscribirse`, codigo,{
            headers: { Authorization: headers}
        })
        return response
    }catch(error){
        return error
    }
}

export const desuscribeDesafio = async (id) =>{
    const datos = JSON.parse(localStorage.getItem('user'));
    const headers = `Bearer ${datos.token}`;
    try{
        const response = await instance.delete(`/inscribirse/desescribirse/${id}`,{
            headers: { Authorization: headers}
        })
        return response
    }catch(error){
        return error
    }
}