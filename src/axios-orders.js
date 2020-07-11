import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-app-739cb.firebaseio.com/'
});

export default instance;