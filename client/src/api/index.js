import axios from 'axios';
import queryString from 'query-string';

const httpClient = axios.create({
    baseURL: 'http://localhost:3000'
})

export const getAllUsers = (options = {}) => {
    const defaultOptions = {
        page: 1,
        amount: 10
    };
    const resultOptions = {
        ...defaultOptions, ...options
    };

    const { page, amount } = resultOptions;
    if(page && amount){
        return httpClient.get(`/users?${queryString.stringify(resultOptions)}`)  
    }
}; 



