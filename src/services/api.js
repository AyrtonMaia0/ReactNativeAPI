import axios from 'axios';

const api = axios.create({
    /* baseURL: 'https://viacep.com.br/ws/' */
    baseURL: 'https://parallelum.com.br/fipe/api/v1/'
});

export default api;