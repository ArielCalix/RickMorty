import axios from 'axios';
import { isEmpty } from 'lodash';
import { IConnection } from "./IConnection";
import { config } from "./axiosConfig";

// creacion de conexion api
const api = axios.create(config);

api.interceptors.request.use(
    async config => {
        const TOKEN = localStorage.getItem("USER_TOKEN");
        if (config.headers)
            config.headers["Authorization"] = (TOKEN) ? `Bearer ${TOKEN}` : "undefined";
        return config;
    }, error => {
        Promise.reject(error);
    }
)

async function getData(props: IConnection) {
    try {
        const data = await api.get(props.url).then(result => {
            return result.data
        });
        return data
    } catch (err) {
        console.error(err);
    }
};

async function saveData(props: IConnection) {
    try {
        const { data } = props;
        return await api.post(props.url, data)
            .then(response => {
                return response.status;
            })
            .catch(error => { return { message: error } });
    } catch (error) {
        console.error(error)
    }
}

async function updateData(props: IConnection) {
    try {
        if (config.headers) config.headers['content-type'] = 'application/x-www-form-urlencoded'
        const { data } = props;
        return await api.put(props.url, data)
            .then(response => {
                return response.status;
            })
            .catch(error => {
                return { message: error }
            });
    } catch (error) {
        console.error(error)
    }
}

async function deleteData(props: IConnection) {
    try {
        return await api.delete(props.url)
            .then(response => {
                return response.status;
            })
            .catch(error => { return { message: error } });
    } catch (error) {
        console.error(error)
    }
}

async function LogIn(props: IConnection) {
    if (config.headers) config.headers['content-type'] = 'application/x-www-form-urlencoded'
    delete api.defaults.headers.common['Authorization'];
    try {
        const { data, url } = props;
        return await api.post(url, data)
            .then(response => {
                if (response['status'] !== undefined) {
                    localStorage.setItem('USER_TOKEN', response.data.token);
                    return { status: response.status, userName: response.data.userName, userId: response.data.userId };
                } else {
                    return { status: 401 };
                }
            })
            .catch(error => { return { message: error } });
    } catch (error) {
        console.error(error)
    }
}

async function LogOut() {
    localStorage.clear();
}

async function checkUser(props: IConnection) {
    if (config.headers) config.headers['content-type'] = 'application/x-www-form-urlencoded'
    try {
        return await api.get(props.url)
            .then(response => {
                if (response.status === 200) {
                    return { user: response.data, status: response.status }
                } else {
                    return { message: 'Error de autenticación' }
                }
            }).catch(error => { return { status: 401, error: error } })
    } catch (error) {
        console.error('catch', error)
    }
}

function getToken() {
    const tokenStored = localStorage.getItem('USER_TOKEN');
    if (!isEmpty(tokenStored)) {
        return true
    } else {
        return false
    }
}
export {
    getData,
    saveData,
    deleteData,
    updateData,
    LogIn,
    checkUser,
    getToken,
    LogOut
};