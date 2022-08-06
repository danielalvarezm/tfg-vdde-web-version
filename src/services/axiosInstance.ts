import axios from "axios";

const instance = axios.create({
    //baseURL: "http://localhost:3000/api/",
    baseURL: "https://vdde.me/api/",
    headers: {
        "Content-Type": "application/json"
    },
});

export {instance}
