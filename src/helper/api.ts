import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";

const baseURL = "https://api.zionrealestates.com"; // production

// const baseURL = "http://localhost:3000"; // development

const defaultAxiosConfig: AxiosRequestConfig = {
  baseURL,
  timeout: 60000, // 60 seconds timeout
};

const axiosInstance = axios.create(defaultAxiosConfig);
interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface ResponseData {
  statusCode?: number;
  message?: string;
  data: { [key: string]: any };
}

const handleResponse = (response: AxiosResponse): ResponseData => {
  const errorResponse: ResponseData = {
    data: response.data.data,
  };
  errorResponse.statusCode = response.status;
  errorResponse.message = response.data.message;
  return errorResponse;
};

const handleError = (error: unknown): ResponseData => {
  const errorResponse: ResponseData = {
    data: {},
  };

  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiResponse<unknown>>;

    if (axiosError.response) {
      errorResponse.statusCode = axiosError.response.status;
      errorResponse.message = axiosError.response.data.message;
    } else if (axiosError.request) {
      console.error("Request error:", axiosError.request);
      errorResponse.statusCode = 500;
      errorResponse.message = "Request error";
    } else {
      errorResponse.message = axiosError.message;
    }
  }

  return errorResponse;
};

export const APIGET = async (url: string): Promise<ResponseData> => {
  try {
    const response = await axiosInstance.get(url);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

// Similarly, update APIPOST, APIPATCH, and APIREMOVE functions using axiosInstance
export const APIPOST = async (
  url: string,
  data: any
): Promise<ResponseData> => {
  try {
    const response = await axiosInstance.post(url, data);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const APIPATCH = async (
  url: string,
  data: any
): Promise<ResponseData> => {
  try {
    const response = await axiosInstance.patch(url, data);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const APIREMOVE = async (url: string): Promise<ResponseData> => {
  try {
    const response = await axiosInstance.delete(url);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const APICHECK = async (
  url: string,
  token: string
): Promise<boolean> => {
  try {
    const headers: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axiosInstance.post(url, {}, headers);

    if (response.status === 200) {
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
};

export const APIPOSTAUT = async (
  url: string,
  data: any,
  token: string
): Promise<ResponseData> => {
  try {
    const headers: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axiosInstance.post(url, data, headers);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
export const APIGETAUT = async (
  url: string,
  token: string
): Promise<ResponseData> => {
  try {
    const headers: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axiosInstance.get(url, headers);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
