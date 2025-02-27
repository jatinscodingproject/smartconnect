import { ArrowRight, CheckCheck } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { updateOrderStatus } from "../services/Order.Services";
import { clearCardItemsFromLocalStorage } from "../utils/clearCardItemsFromLocalStorage";
import toast, { Toaster } from "react-hot-toast";

function PaymentSucces() {
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get("orderId");
  const [countdown, setCountdown] = useState(4);

  useEffect(() => {
    clearCardItemsFromLocalStorage();
  }, [])


  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        const res = await updateOrderStatus(orderId);
        if (res && res.statusCode === 200) {
          const toastId = toast.success(`Payment successful! Redirecting to shop in ${countdown} seconds.`, { duration: 5000 });
          const interval = setInterval(() => {
            setCountdown((prev) => {
              if (prev === 1) {
                clearInterval(interval);
                toast.dismiss(toastId);
                navigate('/shop');
              } else {
                toast.success(`Payment successful! Redirecting to shop in ${prev - 1} seconds.`, {
                  id: toastId,
                  duration: 5000,
                });
              }
              return prev - 1;
            });
          }, 1000);
        }
      } catch (error) {
        console.error("Error updating order status:", error);
      }
    };

    if (orderId) {
      fetchOrderStatus();
    }
  }, [orderId, navigate]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     navigate('/');
  //   }, 2000); // Redirect after 3 seconds

  //   return () => clearTimeout(timer); // Cleanup the timer
  // }, []);

  return (
    <div className="flex justify-center items-center h-[70vh] flex-col gap-20 bg-gray-100">
      <div className="flex items-center gap-4 flex-col md:flex-row">
        <div className="px-4 py-2 text-white font-semibold tracking-widest bg-gradient-to-br to-[#8441f1] from-[#2744c8] text-4xl rounded-full h-20 w-20 flex justify-center items-center">
          <CheckCheck size={50} />
        </div>
        <p className="text-3xl md:text-5xl font-semibold">
          Payment <span className="custom-text">Successfull!!!</span>
        </p>
      </div>
      <div className="flex flex-col items-center gap-4">
        {/* <p className='text-xl font-semibold text-center'>Our team will contact you for delivery</p> */}
        <button
          className="px-4 py-2 text-white font-semibold tracking-widest bg-gradient-to-br to-[#8441f1] from-[#2744c8] text-lg rounded-md flex items-center gap-1"
          onClick={() => {
            navigate("/");
          }}
        >
          {" "}
          <span>Continue Shopping</span> <ArrowRight />
        </button>
      </div>
      <Toaster />
    </div>
  );
}

export default PaymentSucces;
