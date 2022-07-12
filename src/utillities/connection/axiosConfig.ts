import { AxiosRequestConfig } from "axios";

const ambiente = {
    baseUrl: "https://rickandmortyapi.com/api/"
}

export const config: AxiosRequestConfig = {
    baseURL: ambiente.baseUrl,
    headers: {
        'content-type': 'application/json',
        'X-Requested-With': "XMLHttpRequest",
        'Authorization': ""
    }
}