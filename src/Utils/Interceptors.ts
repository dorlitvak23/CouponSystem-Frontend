import axios from 'axios';
import store from '../Redux/Store';

const tokenAxios = axios.create();

tokenAxios.interceptors.request.use(request => {
    request.headers.Authorization = store.getState().authReducer?.token
    return request;
});

export default tokenAxios;
