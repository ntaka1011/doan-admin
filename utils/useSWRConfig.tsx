import axios from "axios";
import useSWR from "swr";

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 3000000, // thời gian chờ tối đa của 1 request là 5p
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE",
  },
});
console.log(process.env.NEXT_PUBLIC_API_URL);

instance.interceptors.request.use(
  async (config) => {
    const token =
      typeof localStorage !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;

    if (token) {
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${token}`,
      } as any;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;

    if (error.response && error.response.status === 501 && !config._retry) {
      config._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
        {
          refreshToken: refreshToken,
        }
      );

      if (res?.data.status === 200) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res?.data.accessToken}`;

        localStorage.setItem("accessToken", res?.data.accessToken);

        return await instance(config);
      }
    }

    return Promise.reject(error);
  }
);
export const fetcher = async ({
  url,
  params,
}: {
  url: string;
  params?: any;
}) => {
  try {
    const res = await instance.get(url, { params });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const FindAll = (url: string, params = {}, options = {}) => {
  options = {
    ...options,
    keepPreviousData: true,
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  };

  return useSWR({ url, params }, async () => fetcher({ url, params }), options);
};

export const FindOne = (url: string, options = {}) => {
  options = {
    ...options,
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  };

  return useSWR(url, async () => fetcher({ url }), options);
};
export const Create = async (url: string, params = {}) => {
  try {
    const res = await instance.post(url, params);

    return res?.data;
  } catch (error) {
    console.log(error);
  }
};
export const Update = async (url: string, params = {}) => {
  try {
    const res = await instance.put(url, params);

    return res;
  } catch (error) {
    console.log(error);
  }
};
export const Delete = async (url: string) => {
  try {
    const res = await instance.delete(url);

    return res;
  } catch (error) {
    console.log(error);
  }
};
