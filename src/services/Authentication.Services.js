import { customPost } from "../utils/axios";
import { endpoints } from "../utils/endpoints";
import toast from "react-hot-toast";

export const sendLoginOtpToEmail = async (email) => {
  try {
    if (!email) {
      throw new Error("Email is required");
    }
    const { data } = await customPost(endpoints.apiUserLogin, { email });
    return data;
  } catch (error) {
    console.log("Error in sendLoginOtpToEmail ", error);
    toast.dismiss();
    toast.error(error.response.data.message);
    return error;
  }
};

export const verifyOtp = async (email, otp) => {
  try {
    if (!email) {
      throw new Error("Email is required");
    }
    if (!otp) {
      throw new Error("OTP is required");
    }
    const { data } = await customPost(endpoints.apiUserVerifyOtp, {
      email,
      otp,
    });
    if (data.statusCode == 200 || data.statusCode == 201) {
      return data;
    }
  } catch (error) {
    console.log("Error in verifyOtp ", error);
    toast.dismiss();
    toast.error(error.response.data.message);
    return error;
  }
};
