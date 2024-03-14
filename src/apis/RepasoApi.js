import { instance }  from "../apis/configs/axiosConfig";

export const postRepaso = async (repaso) =>{
    try{
        const response = await instance.post(`/rep-desa`, repaso)
        return response.data
    }catch(error){
        return error
    }
}
