"use client";
import axios from "axios";

export const baseURL = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const customPost = (url, data, token) => {
  return instance.post(url, data, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
};

export const customGet = (url, token) => {
  return instance.get(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
};

export const customDelete = (url, token) => {
  return instance.delete(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
};

export const customPut = (url, data, token) => {
  return instance.put(url, data, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
};

export const customFilePost = (url, data, token) => {
  return instance.post(url, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};

export default instance;
