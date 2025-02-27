export const endpoints = {
  apiUserLogin: "/api/user/login",
  apiUserVerifyOtp: "/api/user/verify-otp",
  apiGetCategory: "/api/category",
  apiCardByCategory: "/api/card/by-category",
  apiGetCardByCardId: "/api/card/get-card-by-id",
  apiProfileusername: "/api/user/get-user/username",
  apiCreateOrder: "/api/order/create-order",
  apiUpdateOrderStatus: (id) => `/api/order/post-payment-url/${id}`,
  apiUpdateOrder: (id) => `/api/order/update-order/${id}`,
  apiGetAllCardsForUser: "/api/card/get-all-cards"
};
