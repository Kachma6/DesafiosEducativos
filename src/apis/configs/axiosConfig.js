import axios from "axios";

const instance = axios.create();

instance.defaults.baseURL =import.meta.env.VITE_BASE_URL_API ;
console.log(import.meta.env.VITE_BASE_URL_API)
instance.defaults.headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };
  
// instance.defaults.withCredentials = false;

export{
    instance
};