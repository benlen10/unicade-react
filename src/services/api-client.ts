import axios from "axios";

export default axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: {
        key: '5fb3e04e100c4107a54d65ced72a329c'
    }
})