import { customGet, customPost } from "../utils/axios";
import { endpoints } from "../utils/endpoints";
import toast from "react-hot-toast";

export const getCategory = async () => {
  try {
    const { data } = await customGet(endpoints.apiGetCategory);
    if (data.statusCode == 200) {
      return data;
    }
  } catch (error) {
    toast.dismiss();
    toast.error(error.response.data.message);
    return;
  }
};
