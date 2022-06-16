import { instance } from "./axiosInstance";

async function getPopulation() {
    const response = await instance.get("poblacion");
    return response.data;
}

// function getMalePopulation() {
// }

// function getFemalePopulation() {
// }

export {getPopulation};
