import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-shopping-490a8.firebaseio.com/'
});

export default instance;