import axios from "axios";

const instance = axios.create();

instance.defaults.baseURL = "http://localhost:8080/v1/";
instance.defaults.headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };
  
// instance.defaults.withCredentials = false;

export{
    instance
};