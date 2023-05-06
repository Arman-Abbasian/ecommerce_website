import axios from "axios";

axios.defaults.baseURL="https://my-json-server.typicode.com/Arman-Abbasian/ecommerce_website_DB"
const http={
    get:axios.get,
    post:axios.post,
    delete:axios.delete,
    put:axios.put,
};
export default http;
