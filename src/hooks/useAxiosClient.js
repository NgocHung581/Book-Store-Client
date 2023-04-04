import axios from "axios";
import { useMemo } from "react";

function useAxiosClient() {
    const axiosClient = useMemo(() => {
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

        return axiosInstance;
    }, []);

    return axiosClient;
}

export default useAxiosClient;
