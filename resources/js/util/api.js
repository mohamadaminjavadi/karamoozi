import axios from 'axios'
// import {logOut} from './auth'

export default function api() {
    const api = axios.create({
        baseURL: 'http://ssl.qom.ac.ir/grade_announcer/Kevin/public',
        withCredentials: true
    })

    api.interceptors.response.use(response => response, error => {
        if (error.response.status === 401) {
            // logOut()
            console.log('logout()');

            return Promise.reject()
        }

        return Promise.reject(error)
    })

    return api
}