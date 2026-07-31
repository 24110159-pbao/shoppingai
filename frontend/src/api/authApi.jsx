// src/api/authApi.jsx

import axiosClient from "./axiosClient";


const authApi = {


    login(data){

        return axiosClient.post(
            "/auth/login",
            data
        );

    },


    refresh(data){

        return axiosClient.post(
            "/auth/refresh",
            data
        );

    }


};


export default authApi;