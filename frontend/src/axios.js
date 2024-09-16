import axios from "axios";
const apiUrl = import.meta.env.VITE_BACKEND;
console.log(apiUrl);


const instance = axios.create(
    {

        
        baseURL:`${apiUrl}/api`,

    }
)

export default instance;