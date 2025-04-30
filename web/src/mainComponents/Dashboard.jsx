import { useEffect, useState } from "react";
import { GrMoney } from "react-icons/gr";
import toast, { Toaster } from "react-hot-toast";
import { LuCrown } from "react-icons/lu";
import { FaChevronRight } from "react-icons/fa";
import { FaVanShuttle } from "react-icons/fa6";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
} from "recharts";
import Navbar from "./Navbar.jsx";
import Database from "../js/db.js";

const db = new Database();

function App() {
  const [vendorStats, setVendorStats] = useState({
    bestSellingProducts: [],
    currentMonthOrders: 0,
    deliveredOrders: 0,
    monthlyOrders: [],
    monthlyRevenue: [],
    pendingOrders: 0,
    percentageChange: "0.00",
    previousMonthOrders: 0,
    totalRevenue: 0,
  });
  const [token, setToken] = useState(
    JSON.parse(sessionStorage.getItem("token"))
  );
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let barData = Array.from({ length: 12 }, () => 0);
  vendorStats.monthlyRevenue.length > 0 &&
    vendorStats.monthlyRevenue.forEach((item, index) => {
      barData[item._id - 1] = {
        name: months[item._id - 1],
        sales: item.totalRevenue,
      };
    });

  const bestSellersData = [];
  const colors = ["#498536", "#5ab334", "#63b32e", "#80cc28", "#a6d71c"];
  vendorStats.bestSellingProducts.length > 0 &&
    vendorStats.bestSellingProducts.forEach((item, index) => {
      bestSellersData[index] = {
        name: item.productName,
        population: item.totalSold,
        fill: colors[index],
      };
    });

  useEffect(() => {
    async function getData() {
      let response = await db.vendorStats(token);
      if (!response.status) {
        toast.error(response.message);
      }
      console.log(response.data);
      setVendorStats(response.data);
    }
    getData();
  }, []);

  return (
    <>
      <Navbar user={user} activePage={"dashboard"}>
        <div className="mx-4 lg:mx-10 mt-5 pb-10">
          <h1 className="text-xl font-extralight text-center lg:text-left dark:text-white">
            Your total revenue
          </h1>
          <h1 className="text-5xl font-extrabold mb-5 text-green-800 text-center lg:text-left dark:text-white">
            {vendorStats.totalRevenue}
          </h1>

          <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="pt-1 lg:shadow-xl ring-2 lg:ring-1 bg-gray-100 ring-gray-300 rounded-xl flex flex-col justify-between">
              <div className="flex items-start justify-between mx-6 mt-5">
                <div className="text-base lg:text-xl w-max rounded p-3 bg-green-900 text-white border-1 border-gray-300 flex items-center">
                  <GrMoney />
                </div>
                <div className="w-full flex flex-col justify-between items-end">
                  <p className="text-xs lg:text-sm font-semibold ml-3 text-gray-500">
                    Month Orders
                  </p>
                  <h1 className="text-xl lg:text-2xl font-bold">
                    {vendorStats.currentMonthOrders}
                  </h1>
                  <h1 className="text-xs mt-1 text-gray-500">
                    {vendorStats.percentageChange} % compared to last month
                  </h1>
                </div>
              </div>
              <div className="rounded bg-gray-300 w-full flex py-3 px-6 justify-between items-center mt-3">
                <div className="flex items-center">
                  <h1 className="text-xs ml-2 font-semibold">View more</h1>
                </div>
                <div className="flex items-center justify-center rounded-3xl p-1 bg-green-900 text-white text-xs cursor-pointer">
                  <FaChevronRight />
                </div>
              </div>
            </div>

            <div className="pt-1 lg:shadow-xl ring-2 lg:ring-1 bg-gray-100 ring-gray-300 rounded-xl flex flex-col justify-between">
              <div className="flex items-start justify-between mx-6 mt-5">
                <div className="text-base lg:text-xl w-max rounded p-3 bg-green-900 text-white border-1 border-gray-300 flex items-center">
                  <LuCrown />
                </div>
                <div className="w-full flex flex-col justify-between items-end">
                  <p className="text-xs lg:text-sm font-semibold ml-3 text-gray-500">
                    Best Seller
                  </p>
                  <h1 className="text-xl lg:text-2xl font-bold">
                    {vendorStats.bestSellingProducts.length > 0
                      ? vendorStats.bestSellingProducts[0].productName
                      : "-"}
                  </h1>
                  <h1 className="text-xs mt-2 text-gray-500">
                    {vendorStats.bestSellingProducts.length > 0
                      ? vendorStats.bestSellingProducts[0].totalSold
                      : 0}{" "}
                    items sold
                  </h1>
                </div>
              </div>
              <div className="rounded bg-gray-300 w-full flex py-3 px-6 justify-between items-center mt-3">
                <div className="flex items-center">
                  {/* <h1 className='text-xs text-green-800'>200%</h1> */}
                  <h1 className="text-xs ml-2 font-semibold">
                    {vendorStats.bestSellingProducts.length > 0
                      ? vendorStats.bestSellingProducts[0].totalSold
                      : 0}{" "}
                    items sold
                  </h1>
                </div>
                <div className="flex items-center justify-center rounded-3xl p-1 bg-green-900 text-white text-xs cursor-pointer">
                  <FaChevronRight />
                </div>
              </div>
            </div>

            <div className="pt-1 lg:shadow-xl ring-2 lg:ring-1 bg-gray-100 ring-gray-300 rounded-xl flex flex-col justify-between">
              <div className="flex items-start justify-between mx-6 mt-5">
                <div className="text-base lg:text-xl w-max rounded p-3 bg-green-900 text-white border-1 border-gray-300 flex items-center">
                  <FaVanShuttle />
                </div>
                <div className="w-full flex flex-col justify-between items-end">
                  <p className="text-xs lg:text-sm font-semibold ml-3 text-gray-500">
                    Delivered Orders
                  </p>
                  <h1 className="text-xl lg:text-2xl font-bold">
                    {vendorStats.deliveredOrders}
                  </h1>
                </div>
              </div>
              <div className="rounded bg-gray-300 w-full flex py-3 px-6 justify-between items-center mt-5">
                <div className="flex items-center">
                  <h1 className="text-xs ml-2 font-semibold">View more</h1>
                </div>
                <div className="flex items-center justify-center rounded-3xl p-1 bg-green-900 text-white text-xs cursor-pointer">
                  <FaChevronRight />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse lg:flex-row items-start justify-between w-full mt-5 lg:mt-10">
            <div className="mt-5 lg:mt-0 shadow-xl ring-2 lg:ring-1 ring-gray-300 rounded-xl w-full lg:w-4/6 bg-gray-100">
              <h1 className="text-base font-semibold mt-0 mb-0 border-b-2 border-gray-300 lg:border-gray-200 px-5 pt-3 pb-3">
                Sales overview
              </h1>

              <div className="pt-5">
                <ResponsiveContainer width="100%" height={450}>
                  <ComposedChart
                    data={barData}
                    margin={{
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: 0,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e0e0e0"
                      vertical={false} // Hide vertical grid lines
                    />
                    <XAxis
                      dataKey="name"
                      tick={{
                        fontSize: 12,
                        // fontFamily: "Arial",
                        fill: "#555",
                      }}
                      axisLine={{ stroke: "#ccc", strokeWidth: 1 }}
                      tickMargin={10} // Space between ticks and axis line
                      padding={{ left: 20, right: 20 }} // Padding for first/last bars
                    />

                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontFamily: "Arial",
                      }}
                    />
                    <Legend
                      wrapperStyle={{
                        paddingTop: "20px",
                        paddingBottom: "20px",
                        fontSize: "13px",
                        // fontFamily: "Arial",
                      }}
                    />
                    <Bar
                      dataKey="sales"
                      barSize={70}
                      fill="#016630"
                      name="Total Sales"
                      radius={[4, 4, 0, 0]}
                      isAnimationActive={true}
                      animationDuration={1500}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="shadow-sm lg:shadow-xl ring-2 lg:ring-1 ring-gray-300 rounded-xl w-full lg:w-2/6 ml-0 lg:ml-4 bg-gray-100">
              <h1 className="text-base font-semibold mt-0 mb-0 border-b-2 border-gray-300 lg:border-gray-200 px-5 pt-3 pb-3">
                Best sellers
              </h1>
              <div className="pt-5">
                <ResponsiveContainer width="100%" height={450}>
                  <PieChart>
                    <Legend
                      wrapperStyle={{
                        paddingTop: "20px",
                        paddingBottom: "20px",
                        fontSize: "13px",
                        fontFamily: "Arial",
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontFamily: "Arial",
                        cursor: "pointer",
                      }}
                    />
                    <Pie
                      data={bestSellersData}
                      dataKey="population"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={180}
                      fill="#8884d8"
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </Navbar>
      <Toaster />
    </>
  );
}

export default App;
