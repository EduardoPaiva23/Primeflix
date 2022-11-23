import axios from "axios";

// Base Url: https://api.themoviedb.org/3
// movie/550?api_key=915035f356ca8a8a45f1cb8e8fd2ff75

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
});

export default api;