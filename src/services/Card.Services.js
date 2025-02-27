import { customGet, customPost } from "../utils/axios";
import { endpoints } from "../utils/endpoints";
import toast from "react-hot-toast";
import { getItem } from "../utils/getItem";

export const getAllCardsByCategory = async (categoryId, token) => {
  try {
    if (!categoryId) {
      toast.dismiss();
      toast.error("Category Id is required");
      return;
    }
    const { data } = await customGet(
      endpoints.apiCardByCategory + "/" + categoryId,
      token
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

export const getCardByCardId = async (cardId) => {
  try {
    if (!cardId) {
      toast.dismiss();
      toast.error("Card Id is required");
      return;
    }

    const token = getItem("token");
    const { data } = await customGet(
      endpoints.apiGetCardByCardId + "/" + cardId
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

export const getAllCardsForUser = async () => {
  try {
    const { data } = await customGet(endpoints.apiGetAllCardsForUser);
    console.log("✌️data.data --->", data.data);
    if (data.statusCode == 200) {
      return data.data;
    }
  } catch (error) {
    toast.dismiss();
    toast.error(error.response.data.message);
    return;
  }
};
