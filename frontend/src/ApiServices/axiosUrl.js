import axios from 'axios';

const instance = axios.create(
    {
        baseURL: "https://afternoon-meadow-59412.herokuapp.com/"
    }
);

export default instance;