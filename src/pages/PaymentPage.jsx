import React, { useState } from "react";
import { UserState } from "../context/UserContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { ToastError, ToastSuccess, ToastWarning } from "../utility/Toasts";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PaymentPage = () => {
  const [price, setPrice] = useState(10000);
  const [cardNumber, setCardNumber] = useState("");
  const [loading, Setloading] = useState(false);
  const [securityCode, SetsecurityCode] = useState("");
  const { whichF ,user} = UserState();

  const navigate=useNavigate();

  const handleSelectChange = (e) => {
    // Handle the selected option, you can use the selected value to determine the price
    const selectedOption = e.target.value;
    // You can use the selected option value to update the price accordingly
    // For simplicity, I'm using a placeholder variable here.

    switch (selectedOption) {
      case "oneMonth":
        setPrice(10000);
        break;
      case "threeMonths":
        setPrice(20000);
        break;
      case "sixMonths":
        setPrice(30000);
        break;
      default:
        setPrice(2000);
        break;
    }
  };

  const handlerSubscribe = async (e) => {
   if(whichF){
     e.preventDefault();
     console.log(price, cardNumber, securityCode);
     if (!price || !cardNumber || !securityCode) {
       return ToastWarning("please provide all information");
     }
     if (cardNumber.toString().length != 16) {
       return ToastWarning("invalid card number");
     }
     Setloading(true);
     try {
       const data = await updateDoc(doc(db, "farm", whichF.id), {
         userId: user.userId,
         duration:
           price === 10000 ? "4 month" : price === 20000 ? "8 month" : "1 year",
         amount: price,
         userName:user.name,
       });
       Setloading(false);
       ToastSuccess("subscription succee");
       navigate('/profile');
       
     } catch (error) {
       Setloading(false);
       ToastError(error.message);
     }
   }else{
    ToastError("please select the farm")
   }
  };

  return (
    <>
      <Header />
      <div className="relative mx-auto w-full bg-white mt-4">
        <div className="grid min-h-screen grid-cols-10">
          <div className="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
            <div className="mx-auto w-full max-w-lg">
              <h1 className="relative text-2xl font-medium text-gray-700 sm:text-3xl">
                Secure Checkout
                <span className="mt-2 block h-1 w-10 bg-teal-600 sm:w-20"></span>
              </h1>
              <form action="" className="mt-10 flex flex-col space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="text-xs font-semibold text-gray-500"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="john.capler@fang.com"
                    className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                    value={user.email}
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor="card-number"
                    className="text-xs font-semibold text-gray-500"
                  >
                    Card number
                  </label>
                  <input
                    type="text"
                    id="card-number"
                    name="card-number"
                    placeholder="1234-5678-XXXX-XXXX"
                    className="block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                    value={cardNumber}
                    onChange={(e) => {
                      setCardNumber(e.target.value);
                    }}
                  />
                  <img
                    src="/images/uQUFIfCYVYcLK0qVJF5Yw.png"
                    alt=""
                    className="absolute bottom-3 right-3 max-h-4"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500">
                    Expiration date
                  </p>
                  <div className="mr-6 flex flex-wrap">
                    <div className="my-1">
                      <label htmlFor="month" className="sr-only">
                        Select expiration month
                      </label>
                      <select
                        name="month"
                        id="month"
                        className="cursor-pointer rounded border-gray-300 bg-gray-50 py-3 px-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="">Month</option>
                      </select>
                    </div>
                    <div className="my-1 ml-3 mr-6">
                      <label htmlFor="year" className="sr-only">
                        Select expiration year
                      </label>
                      <select
                        name="year"
                        id="year"
                        className="cursor-pointer rounded border-gray-300 bg-gray-50 py-3 px-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="">Year</option>
                      </select>
                    </div>
                    <div className="relative my-1">
                      <label htmlFor="security-code" className="sr-only">
                        Security code
                      </label>
                      <input
                        type="text"
                        id="security-code"
                        name="security-code"
                        placeholder="Security code"
                        className="block w-36 rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                        value={securityCode}
                        onChange={(e) => {
                          SetsecurityCode(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="mr-6 my-1">
                  <p className="text-xs font-semibold text-gray-500">
                    Subscription Duration
                  </p>
                  <label htmlFor="subscription-duration" className="sr-only">
                    Select subscription duration
                  </label>
                  <select
                    name="subscription-duration"
                    id="subscription-duration"
                    onChange={handleSelectChange}
                    className="cursor-pointer rounded border-gray-300 bg-gray-50 py-3 px-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="oneMonth">Four Month</option>
                    <option value="threeMonths">Eight Months</option>
                    <option value="sixMonths"> one year</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="card-name" className="sr-only">
                    Card name
                  </label>
                  <input
                    type="text"
                    id="card-name"
                    name="card-name"
                    placeholder="Name on the card"
                    className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                    value={user.name}
                  />
                </div>
              </form>

              <button
                type="submit"
                className="mt-4 inline-flex w-full items-center justify-center rounded bg-teal-600 py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-teal-500 sm:text-lg"
                onClick={handlerSubscribe}
              >
                <span
                  class="spinner-border  spinner-grow-sm"
                  aria-hidden="true"
                  style={{ display: `${loading ? "flex" : "none"}` }}
                ></span>
                Place Order
              </button>
            </div>
          </div>
          <div className="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
            <h2 className="sr-only">Order summary</h2>
            <div>
              <img
                src="https://images.unsplash.com/photo-1581318694548-0fb6e47fe59b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-teal-800 to-teal-400 opacity-95"></div>
            </div>
            <div className="relative">
              <div className="space-y-2">
                <p className="flex justify-between text-lg font-bold text-white">
                  <span>Total price:</span>
                  <span>{price}</span>
                </p>
              </div>
            </div>
            <div className="relative mt-10 text-white">
              <h3 className="mb-2 text-lg font-bold">Support</h3>
              <p className="text-sm font-semibold">
                +01 653 235 211{" "}
                <span className="font-light">(International)</span>
              </p>
              <p className="mt-1 text-sm font-semibold">
                support@nanohair.com <span className="font-light">(Email)</span>
              </p>
              <p className="mt-2 text-xs font-medium">
                Call us now for payment-related issues
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-500 p-6">
        <Footer />
      </div>
    </>
  );
};

export default PaymentPage;
