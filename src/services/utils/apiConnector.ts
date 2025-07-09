// apiConnector.ts
import axios from "axios";
import type { Method, AxiosRequestHeaders, AxiosResponse } from "axios";

const token = import.meta.env.VITE_API_TOKEN;

export const axiosInstance = axios.create({
  baseURL: "https://gob-production-eebf.up.railway.app",
  timeout: 10000,
  headers: {
    // ✅ Keep safe headers only
    "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
    Authorization: `Bearer ${token}`,
  },
});

/**
 * Generic API connector
 */
export const apiConnector = async <T>(
  method: Method,
  url: string,
  bodyData?: unknown,
  headers?: AxiosRequestHeaders,
  params?: Record<string, any>
): Promise<AxiosResponse<T>> => {
  return axiosInstance<T>({
    method,
    url,
    data: bodyData,
    headers, // Only pass if you need to override something (safe headers)
    params,
  });
};
