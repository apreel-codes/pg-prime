import axios from "axios"

const apiClient = () =>{
    return axios.create({
        baseURL : process.env.REACT_APP_API_URL
    })
}

export default apiClient;