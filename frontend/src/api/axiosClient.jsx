import axios from "axios";


const axiosClient = axios.create({

    baseURL: "http://localhost:8080/shoppingai",

    headers: {
        "Content-Type": "application/json"
    }

});



// ======================================
// Tự động gắn Access Token vào request
// ======================================

axiosClient.interceptors.request.use(

    (config) => {

        const token = localStorage.getItem("token");


        if(token){

            config.headers.Authorization =
                `Bearer ${token}`;

        }


        return config;

    },


    (error) => {

        return Promise.reject(error);

    }

);




// ======================================
// Tự refresh khi Access Token hết hạn
// ======================================

axiosClient.interceptors.response.use(


    (response)=>{

        return response;

    },


    async(error)=>{

        if(!error.config){
            return Promise.reject(error);
        }
        
        const originalRequest = error.config;



        // tránh gọi refresh vô hạn

        if(
            (error.response?.status === 401 ||
             error.response?.status === 403)
            &&
            !originalRequest._retry
        ){


            originalRequest._retry = true;


            try {


                const refreshToken =
                    localStorage.getItem("refreshToken");



                if(!refreshToken){

                    throw new Error(
                        "Không có refresh token"
                    );

                }



                // gọi đúng API như Postman

                const response = await axios.post(

                    "http://localhost:8080/shoppingai/auth/refresh",

                    {
                        refreshToken: refreshToken
                    }

                );



                const newAccessToken =
                    response.data.accessToken;



                const newRefreshToken =
                    response.data.refreshToken;



                // lưu token mới

                localStorage.setItem(
                    "token",
                    newAccessToken
                );


                localStorage.setItem(
                    "refreshToken",
                    newRefreshToken
                );



                // cập nhật request cũ

                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;



                // gửi lại request ban đầu

                return axiosClient(originalRequest);



            }
            catch(err){


                console.log(
                    "Refresh token thất bại",
                    err
                );


                localStorage.removeItem("token");

                localStorage.removeItem("refreshToken");


                window.location.href="/login";


                return Promise.reject(err);

            }

        }



        return Promise.reject(error);

    }

);



export default axiosClient;