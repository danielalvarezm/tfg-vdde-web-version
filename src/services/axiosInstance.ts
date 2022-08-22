import axios from "axios";

const instance = axios.create({
    // baseURL: "http://localhost:3000/",
    baseURL: "https://api.vdde.me",
    headers: {
        "Content-Type": "application/json"
    },
});

export {instance}
