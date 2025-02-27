import { customGet, customPost, customPut } from "../utils/axios";
import { endpoints } from "../utils/endpoints";
import toast from "react-hot-toast";
import { getItem } from "../utils/getItem";

export const createOrder = async (body) => {
  try {
    const { data } = await customPost(
      endpoints.apiCreateOrder,
      body,
      getItem("token")
    );
    return data
  } catch (error) {
    toast.dismiss();
    toast.error(error.response.data.message);
    return;
  }
};

export const updateOrderStatus = async (id) => {
  try {
    const { data } = await customPut(
      endpoints.apiUpdateOrderStatus(id),
      {},
      getItem("token")
    );
    return data
  } catch (error) {
    toast.dismiss();
    toast.error(error.response.data.message);
    return;
  }
};

export const updateOrder = async (id, body) => {
  try {
    const { data } = await customPut(
      endpoints.apiUpdateOrder(id),
      body,
      getItem("token")
    );
    return data;
  } catch (error) {
    toast.dismiss();
    toast.error(error.response.data.message);
    return;
  }
};
