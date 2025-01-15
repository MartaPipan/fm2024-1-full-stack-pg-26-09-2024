import axios from 'axios';

const httpClient = axios.create({
    baseURL: 'http://localhost:3000'
})

export const getAllUsers= (page, amount) => httpClient.get (`http://localhost:3000/users?page=${page}&amount=${amount}`); 

