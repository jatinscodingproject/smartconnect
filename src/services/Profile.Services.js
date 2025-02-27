import { customGet, customPost } from "../utils/axios";
import { endpoints } from "../utils/endpoints";
import toast from "react-hot-toast";

export const getUserByUsername = async (username) => {
  try {
    const { data } = await customGet(
      endpoints.apiProfileusername + "/" + username
    );
    if (data.statusCode == 200) {
      return data;
    }
  } catch (error) {
    toast.dismiss();
    toast.error(error.response.data.message);
    return;
  }
};
