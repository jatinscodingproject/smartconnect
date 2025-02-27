import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { getItem } from "../utils/getItem";
import { baseURL } from "../utils/axios";
import toast, { Toaster } from "react-hot-toast";

function Checkout() {
  const [quantity, setQuantity] = useState(1); // State for quantity
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    billingSameAsShipping: false,
  });
  const [billingAddress, setBillingAddress] = useState({
    firstName: "",
    lastName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
  });
  const [mainCardPrice, setMainCardPrice] = useState();
  const [productTitle, setProductTitle] = useState("");
  const [shippingCharges, setShippingCharges] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("currentCard")) {
      console.log(
        '✌️JSON.parse(localStorage.getItem("currentCard")) --->',
        JSON.parse(localStorage.getItem("currentCard"))
      );
      setMainCardPrice(
        JSON.parse(localStorage.getItem("currentCard")).card.price
      );
      setShippingCharges(
        JSON.parse(localStorage.getItem("currentCard")).shippingCharges
      );
      setProductTitle(
        JSON.parse(localStorage.getItem("currentCard")).card.productTitle
      );
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "billingSameAsShipping" && checked) {
      setBillingAddress({
        firstName: address.firstName,
        lastName: address.lastName,
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2,
        city: address.city,
        state: address.state,
        country: address.country,
        zipCode: address.zipCode,
      });
    }
  };

  const handleQuantityChange = (type) => {
    setQuantity((prevQuantity) => {
      if (type === "increment") {
        return prevQuantity + 1;
      } else if (type === "decrement" && prevQuantity > 1) {
        return prevQuantity - 1;
      }
      return prevQuantity;
    });
  };

  const handleBillingInputChange = (e) => {
    const { name, value } = e.target;
    setBillingAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async () => {
    if (
      !address.firstName ||
      !address.lastName ||
      !address.addressLine1 ||
      !address.city ||
      !address.state ||
      !address.country ||
      !address.zipCode
    ) {
      toast.error(
        `Please fill in all required address fields before placing the order.`
      );
      return;
    }
    const stripe = await loadStripe(
      import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
    );

    const fullAddress = `${address.firstName} ${address.lastName}, ${address.addressLine1}, ${address.addressLine2}, ${address.city}, ${address.state}, ${address.country}, ${address.zipCode}`;

    const body = {
      orderId: localStorage.getItem("orderId"),
      address: fullAddress,
      quantity: quantity,
      shipping: {
        name: `${address.firstName} ${address.lastName}`,
        address: {
          line1: address.addressLine1,
          line2: address.addressLine2,
          city: address.city,
          state: address.state,
          country: address.country,
          postal_code: address.zipCode,
        },
      },
      billingAddress: address.billingSameAsShipping
        ? {
            name: `${address.firstName} ${address.lastName}`,
            address: {
              line1: address.addressLine1,
              line2: address.addressLine2,
              city: address.city,
              state: address.state,
              country: address.country,
              postal_code: address.zipCode,
            },
          }
        : {
            name: `${billingAddress.firstName} ${billingAddress.lastName}`,
            address: {
              line1: billingAddress.addressLine1,
              line2: billingAddress.addressLine2,
              city: billingAddress.city,
              state: billingAddress.state,
              country: billingAddress.country,
              postal_code: billingAddress.zipCode,
            },
          },
    };

    const headers = {
      Authorization: `Bearer ${getItem("token")}`,
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(
        `${baseURL}/api/order/create-checkout-session`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();

      const { sessionId } = data;
      console.log("✌️sessionId --->", sessionId);

      const result = await stripe.redirectToCheckout({ sessionId });
      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error("Error in handlePlaceOrder:", error);
    }
  };

  return (
    <div className="px-4 py-10 md:px-16 font-dmSans">
      <div className="w-full grid lg:grid-cols-2">
        <div className="w-full border-b-2 lg:border-b-0 lg:mb-0 pb-10 mb-10 lg:border-r border-[#4364f1] lg:pr-10">
          <h4 className="text-[#4364f1] text-xl font-semibold">
            Shipping Address
          </h4>
          <div className="mt-6 flex flex-col gap-4">
            <div className="flex gap-3">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="border border-[#4364f1] rounded-md w-full px-3 py-2 text-base"
                value={address.firstName}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="border border-[#4364f1] rounded-md w-full px-3 py-2 text-base"
                value={address.lastName}
                onChange={handleInputChange}
              />
            </div>
            <input
              type="text"
              name="addressLine1"
              placeholder="Address Line 1"
              className="border border-[#4364f1] rounded-md w-full px-3 py-2 text-base"
              value={address.addressLine1}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="addressLine2"
              placeholder="Address Line 2"
              className="border border-[#4364f1] rounded-md w-full px-3 py-2 text-base"
              value={address.addressLine2}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              className="border border-[#4364f1] rounded-md w-full px-3 py-2 text-base"
              value={address.city}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              className="border border-[#4364f1] rounded-md w-full px-3 py-2 text-base"
              value={address.state}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              className="border border-[#4364f1] rounded-md w-full px-3 py-2 text-base"
              value={address.country}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="zipCode"
              placeholder="Zip Code"
              className="border border-[#4364f1] rounded-md w-full px-3 py-2 text-base"
              value={address.zipCode}
              onChange={handleInputChange}
            />
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                name="billingSameAsShipping"
                className="w-4 h-4 text-[#4364f1]"
                checked={address.billingSameAsShipping}
                onChange={handleInputChange}
              />
              <p className="text-sm">
                Billing address same as Shipping address?
              </p>
            </div>
          </div>
          {!address.billingSameAsShipping && (
            <div className="w-full mt-4">
              <h4 className="text-[#4364f1] text-xl font-semibold">
                Billing Address
              </h4>
              <div className="mt-6 flex flex-col gap-4">
                <div className="flex gap-3">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className="border border-[#4364f1] rounded-md w-full px-3 py-2 text-base"
                    value={billingAddress.firstName}
                    onChange={handleBillingInputChange}
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    className="border border-[#4364f1] rounded-md w-full px-3 py-2 text-base"
                    value={billingAddress.lastName}
                    onChange={handleBillingInputChange}
                  />
                </div>
                <input
                  type="text"
                  name="addressLine1"
                  placeholder="Address Line 1"
                  className="border border-[#4364f1] rounded-md w-full px-3 py-2 text-base"
                  value={billingAddress.addressLine1}
                  onChange={handleBillingInputChange}
                />
                <input
                  type="text"
                  name="addressLine2"
                  placeholder="Address Line 2"
                  className="border border-[#4364f1] rounded-md w-full px-3 py-2 text-base"
                  value={billingAddress.addressLine2}
                  onChange={handleBillingInputChange}
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  className="border border-[#4364f1] rounded-md w-full px-3 py-2 text-base"
                  value={billingAddress.city}
                  onChange={handleBillingInputChange}
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  className="border border-[#4364f1] rounded-md w-full px-3 py-2 text-base"
                  value={billingAddress.state}
                  onChange={handleBillingInputChange}
                />
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  className="border border-[#4364f1] rounded-md w-full px-3 py-2 text-base"
                  value={billingAddress.country}
                  onChange={handleBillingInputChange}
                />
                <input
                  type="text"
                  name="zipCode"
                  placeholder="Zip Code"
                  className="border border-[#4364f1] rounded-md w-full px-3 py-2 text-base"
                  value={billingAddress.zipCode}
                  onChange={handleBillingInputChange}
                />
              </div>
            </div>
          )}
        </div>

        <div className="w-full lg:pl-10">
          <h4 className="text-[#4364f1] text-xl font-semibold">Cart</h4>
          <div className="mt-6 flex flex-col gap-4 text-base">
            <div className="grid grid-cols-4 font-medium">
              <div className="col-span-3">
                <p>{productTitle}</p>
              </div>
              <div className="flex justify-center w-2/3">
                <p className="font-bold">₹{mainCardPrice}</p>
              </div>
            </div>
            <div className="grid grid-cols-4 font-medium">
              <div className="col-span-3 flex items-center">
                <p className="text-zinc-500">PVC</p>
              </div>
              <div>
                <div className="grid grid-cols-4 text-white bg-[#4364f1] px-2 py-1 w-2/3 rounded-lg">
                  <div
                    className="flex items-center justify-center cursor-pointer"
                    onClick={() => handleQuantityChange("decrement")}
                  >
                    <Minus size={12} strokeWidth={4} />
                  </div>
                  <div className="col-span-2 flex justify-center">
                    {quantity}
                  </div>
                  <div
                    className="flex items-center justify-center cursor-pointer"
                    onClick={() => handleQuantityChange("increment")}
                  >
                    <Plus size={12} strokeWidth={4} />
                  </div>
                </div>
              </div>
            </div>
            <hr className="border-t-2 border-[#4364f1]" />
            <div className="grid grid-cols-4 font-medium">
              <div className="col-span-3">
                <p>Subtotal</p>
              </div>
              <div className="flex justify-center w-2/3">
                <p className="font-bold">₹{mainCardPrice * quantity}</p>
              </div>
            </div>
            <div className="grid grid-cols-4 font-medium">
              <div className="col-span-3">
                <p>Shipping</p>
              </div>
              <div className="flex justify-center w-2/3">
                <p className="font-bold">
                  ₹{shippingCharges ? shippingCharges : 0}
                </p>
              </div>
            </div>
            <hr className="border-t-2 border-[#4364f1]" />
            <div className="grid grid-cols-4 font-medium">
              <div className="col-span-3">
                <p>Total</p>
              </div>
              <div className="flex justify-center w-2/3">
                <p className="font-bold">
                  ₹{mainCardPrice * quantity + (Number(shippingCharges) || 0)}
                </p>
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <button
                className="bg-[#4364f1] text-white font-semibold w-2/3 rounded-md px-3 py-2"
                onClick={handlePlaceOrder}
              >
                Continue To Payment
              </button>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Checkout;
