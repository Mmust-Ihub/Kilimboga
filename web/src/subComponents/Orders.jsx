import Navbar from "../mainComponents/Navbar";
import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";
import Database from "../js/db.js";

const db = new Database();

function Orders() {
  const [token, setToken] = useState(
    JSON.parse(sessionStorage.getItem("token"))
  );
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    async function getData() {
      const response = await db.getOrders(token, status);
      if (!response.status) {
        toast.error(response.message);
      } else {
        console.log(response.data);
        // setProducts(response.data);
        if (response.data.length < 1) {
          toast("No orders found", { icon: "😢" });
        }
      }
    }
    getData();
  }, [status]);

  return (
    <>
      <Navbar user={user} activePage={"orders"}>
        <div style={{ minHeight: "100vh" }}>
          <div className="mx-5 lg:mx-10 flex justify-between items-center mt-1 lg:mt-5">
            <h1 className="font-semibold text-base lg:text-lg">Orders</h1>
          </div>
          <div className="mb-3 mt-3 ml-5 lg:ml-10">
            <button
              className="text-xs bg-gray-500 cursor-pointer text-white rounded-full px-4 py-2 mr-3"
              onClick={() => {
                setStatus("pending");
              }}
            >
              Pending
            </button>
            <button
              className="text-xs bg-gray-500 cursor-pointer text-white rounded-full px-4 py-2 mr-3"
              onClick={() => {
                setStatus("delivered");
              }}
            >
              Delivered
            </button>
          </div>
          <div className="mx-5 lg:mx-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-3 lg:mt-5">
            <div className="border-1 border-gray-300 rounded shadow-lg p-5 bg-gray-100">
              <p className="bg-green-500 w-max rounded-2xl px-3 py-1 text-white text-xs mb-3">
                Delivered
              </p>
              <div className="flex justify-between items-center border-b-1 border-gray-300 pb-3">
                <h1 className="text-gray-400 text-xs lg:text-sm">
                  ABd4567yZTY
                </h1>
                <h1 className="text-gray-400 text-xs lg:text-sm">20-04-2003</h1>
              </div>

              <p className="text-gray-400 text-xs lg:text-sm mt-2">Item</p>
              <p className="text-sm lg:text-base">Farm Up Fertiliser</p>

              <div className="flex justify-between">
                <div>
                  <p className="text-gray-400 text-xs lg:text-sm mt-2">
                    Quantity
                  </p>
                  <p className="text-sm lg:text-base">200</p>
                </div>

                <div>
                  <p className="text-gray-400 text-xs lg:text-sm mt-2">Price</p>
                  <p className="text-sm lg:text-base">2,000 KES</p>
                </div>
              </div>

              <p className="text-gray-400 text-sm mt-2">Address</p>
              <p className="text-sm lg:text-base">
                Kakamega, Lupe, Near Mahiakalo Primary
              </p>

              <p className="text-gray-400 text-sm mt-2">Phone</p>
              <p className="text-sm lg:text-base">0706518167</p>
            </div>

            <div className="border-1 border-gray-300 rounded shadow-lg p-5 bg-gray-100">
              <p className="bg-gray-500 w-max rounded-2xl px-3 py-1 text-white text-xs mb-3">
                Pending
              </p>
              <div className="flex justify-between items-center border-b-1 border-gray-300 pb-3">
                <h1 className="text-gray-400 text-xs lg:text-sm">
                  ABd4567yZTY
                </h1>
                <h1 className="text-gray-400 text-xs lg:text-sm">20-04-2003</h1>
              </div>

              <p className="text-gray-400 text-xs lg:text-sm mt-2">Item</p>
              <p className="text-sm lg:text-base">Farm Up Fertiliser</p>

              <div className="flex justify-between">
                <div>
                  <p className="text-gray-400 text-xs lg:text-sm mt-2">
                    Quantity
                  </p>
                  <p className="text-sm lg:text-base">200</p>
                </div>

                <div>
                  <p className="text-gray-400 text-xs lg:text-sm mt-2">Price</p>
                  <p className="text-sm lg:text-base">2,000 KES</p>
                </div>
              </div>

              <p className="text-gray-400 text-xs lg:text-sm mt-2">Address</p>
              <p className="text-sm lg:text-base">
                Kakamega, Lupe, Near Mahiakalo Primary
              </p>

              <p className="text-gray-400 text-xs lg:text-sm mt-2">Phone</p>
              <p className="text-sm lg:text-base">0706518167</p>
            </div>
          </div>
        </div>
        <Toaster />
      </Navbar>
    </>
  );
}

export default Orders;
