import axios from "axios";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";

import { updateUser } from "redux/slices/userSlice";
import useAxiosClient from "./useAxiosClient";
import userApiURL from "api/userApiURL";
import { useMemo } from "react";

function useAxiosAuth() {
    const axiosClient = useAxiosClient();
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const axiosAuth = useMemo(() => {
        const axiosInstance = axios.create({
            baseURL: process.env.REACT_APP_API_BASE_URL,
            headers: {
                "Content-Type": "application/json",
            },
        });

        axiosInstance.interceptors.response.use((response) => {
            if (response && response.data) {
                return response.data;
            }

            return response;
        });

        axiosInstance.interceptors.request.use(
            async (config) => {
                let currentDate = new Date();
                const decodedToken = jwt_decode(user.accessToken);
                if (decodedToken.exp * 1000 < currentDate.getTime()) {
                    const url = userApiURL.refreshToken();
                    const {
                        data: { newAccessToken, newRefreshToken },
                    } = await axiosClient.post(url, {
                        refreshToken: user?.refreshToken,
                    });
                    config.headers[
                        "authorization"
                    ] = `Bearer ${newAccessToken}`;
                    dispatch(
                        updateUser({
                            accessToken: newAccessToken,
                            refreshToken: newRefreshToken,
                        })
                    );
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        return axiosInstance;
    }, [dispatch, user.accessToken, user?.refreshToken, axiosClient]);

    return axiosAuth;
}

export default useAxiosAuth;
