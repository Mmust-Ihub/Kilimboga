import AdminFarmers from "../subComponents/AdminFarmers";
import AdminVendors from "../subComponents/AdminVendors";
import AdminExperts from "../subComponents/AdminExperts";
import { GrMoney, GrCart } from "react-icons/gr";
import { FaArrowTrendUp, FaShop } from "react-icons/fa6";
import { PiFarmFill } from "react-icons/pi";
import { IoStatsChart } from "react-icons/io5";
import { FaChevronRight } from "react-icons/fa";
import { RiMenuFoldFill } from "react-icons/ri";
import { RiMenuFold4Fill } from "react-icons/ri";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PieChart,
  Pie,
} from "recharts";
import { LuCrown } from "react-icons/lu";
import { useState } from "react";
import { useEffect } from "react";
import Database from "../js/db.js";
import toast, { Toaster } from "react-hot-toast";

const db = new Database();

function Admin() {
  const [showDashboard, setShowDashboard] = useState(true);
  const [showFarmers, setShowFarmers] = useState(false);
  const [showVendors, setShowVendors] = useState(false);
  const [showExperts, setShowExperts] = useState(false);
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const [token, setToken] = useState(
    JSON.parse(sessionStorage.getItem("token"))
  );
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
  const [adminStats, setAdminStats] = useState({
    totalUsers: [{ count: 0 }],
    verifiedUsers: [{ count: 0 }],
    pendingApprovals: [{ count: 0 }],
    approvedUsers: [{ count: 0 }],
    specialUsers: [{ count: 0 }],
    roleDistribution: [
      { _id: "admin", count: 0 },
      { _id: "farmer", count: 0 },
      { _id: "vendor", count: 0 },
    ],
    recentUsers: [{ count: 0 }],
    userGrowth: [],
    salesData: [],
  });
  const [data, setData] = useState([
    { name: "Jan", sales: 0, userGrowth: 0 },
    { name: "Feb", sales: 0, userGrowth: 0 },
    { name: "Mar", sales: 0, userGrowth: 0 },
    { name: "Apr", sales: 0, userGrowth: 0 },
    { name: "May", sales: 0, userGrowth: 0 },
    { name: "Jun", sales: 0, userGrowth: 0 },
    { name: "Jul", sales: 0, userGrowth: 0 },
    { name: "Aug", sales: 0, userGrowth: 0 },
    { name: "Sept", sales: 0, userGrowth: 0 },
    { name: "Oct", sales: 0, userGrowth: 0 },
    { name: "Nov", sales: 0, userGrowth: 0 },
    { name: "Dec", sales: 0, userGrowth: 0 },
  ]);
  const [usersComposition, setUsersComposition] = useState([
    { name: "farmer", population: 0, fill: "#8884d8" },
    { name: "vendor", population: 0, fill: "#82ca9d" },
    { name: "admin", population: 0, fill: "#82ca9d" },
    { name: "experts", population: 0, fill: "#ffc658" },
  ]);
  const [hidden, setHidden] = useState(true);

  function nav(destination) {
    switch (destination) {
      case "dashboard":
        setShowDashboard(true);
        setShowFarmers(false);
        setShowVendors(false);
        setShowExperts(false);
        setCurrentPage("Dashboard");
        setHidden(true);
        break;
      case "farmers":
        setShowDashboard(false);
        setShowFarmers(true);
        setShowVendors(false);
        setShowExperts(false);
        setCurrentPage("Farmers");
        setHidden(true);
        break;
      case "vendors":
        setShowDashboard(false);
        setShowFarmers(false);
        setShowVendors(true);
        setShowExperts(false);
        setCurrentPage("Vendors");
        setHidden(true);
        break;
      case "experts":
        setShowDashboard(false);
        setShowFarmers(false);
        setShowVendors(false);
        setShowExperts(true);
        setCurrentPage("Experts");
        setHidden(true);
        break;
      default:
        setShowDashboard(true);
        setShowFarmers(false);
        setShowVendors(false);
        setShowExperts(false);
        setCurrentPage("Dashboard");
        setHidden(true);
        break;
    }
  }

  useEffect(() => {
    async function fetchData() {
      const res = await db.getAdminStats(token);
      console.log(res);
      if (res.status) {
        setAdminStats({
          ...res.data.userData[0],
          salesData: res.data.salesData,
        });
      } else {
        toast.error("Failed to fetch admin stats");
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    printData();
  }, [adminStats]);

  function printData() {
    const updatedData = [...data];
    const updatedUsersComposition = [...usersComposition];

    adminStats.userGrowth.length > 0 &&
      adminStats.userGrowth.forEach((item) => {
        updatedData[item._id].userGrowth = item.count;
      });

    adminStats.salesData.length > 0 &&
      adminStats.salesData.forEach((item) => {
        updatedData[item._id].sales = item.totalSales;
      });

    adminStats.roleDistribution.length > 0 &&
      adminStats.roleDistribution.forEach((item) => {
        const user = updatedUsersComposition.find(
          (x) => x.name.toLowerCase() === item._id
        );
        if (user) {
          user.population = item.count;
        }
      });

    setData(updatedData);
    setUsersComposition(updatedUsersComposition);
  }

  function logout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    window.location.href = "/";
  }

  return (
    <div className=" bg-gray-100 flex" style={{ height: "100vh" }}>
      <div
        className={`bg-green-900 h-screen w-12/12 lg:w-2/12 fixed top-0 z-50 left-0 transform transition-all duration-300 ease-in-out ${
          hidden ? "-translate-x-full lg:translate-x-0" : "translate-x-0 "
        }`}
      >
        <div className="flex justify-between items-center border-b-1 border-green-800">
          <h1 className="py-6 px-5 font-bold text-lg text-white text-left  w-full">
            Kilimboga
          </h1>
          <button
            className="lg:hidden mr-6 my-6 text-lg text-white ring-1 ring-green-800 rounded p-1 cursor-pointer"
            onClick={() => {
              hidden ? setHidden(false) : setHidden(true);
            }}
          >
            <RiMenuFoldFill />
          </button>
        </div>

        <h1 className="px-5 mt-4 text-white text-xs">NAVIGATION</h1>
        <div
          className={`
            px-3 mx-5 mt-4 py-2
            rounded 
            text-sm 
            flex items-center justify-between 
            cursor-pointer 
            ${
              currentPage == "Dashboard"
                ? "bg-white text-green-900"
                : "text-white hover:bg-white hover:text-green-900"
            }`}
          onClick={() => {
            nav("dashboard");
          }}
        >
          <div className="flex items-center">
            <IoStatsChart />
            <h1 className="ml-2">View Stats</h1>
          </div>
          <FaChevronRight />
        </div>
        <div
          className={`
            px-3 mx-5 mt-2 py-2
            rounded 
            text-sm 
            flex items-center justify-between 
            cursor-pointer 
            ${
              currentPage == "Vendors"
                ? "bg-white text-green-900"
                : "text-white hover:bg-white hover:text-green-900"
            }`}
          onClick={() => {
            nav("vendors");
          }}
        >
          <div className="flex items-center">
            <FaShop />
            <h1 className="ml-2">Manage Vendors</h1>
          </div>
          <FaChevronRight />
        </div>
        <div
          className={`
            px-3 mx-5 mt-2 py-2
            rounded 
            text-sm 
            flex items-center justify-between 
            cursor-pointer 
            ${
              currentPage == "Farmers"
                ? "bg-white text-green-900"
                : "text-white hover:bg-white hover:text-green-900"
            }`}
          onClick={() => {
            nav("farmers");
          }}
        >
          <div className="flex items-center">
            <PiFarmFill />
            <h1 className="ml-2">Manage Farmers</h1>
          </div>
          <FaChevronRight />
        </div>
        <div
          className={`
            px-3 mx-5 mt-2 py-2
            rounded 
            text-sm 
            flex items-center justify-between 
            cursor-pointer 
            ${
              currentPage == "Experts"
                ? "bg-white text-green-900"
                : "text-white hover:bg-white hover:text-green-900"
            }`}
          onClick={() => {
            nav("experts");
          }}
        >
          <div className="flex items-center">
            <PiFarmFill />
            <h1 className="ml-2">Manage Experts</h1>
          </div>
          <FaChevronRight />
        </div>
      </div>

      <div className="w-12/12 lg:w-10/12 h-max lg:ml-auto bg-gray-200">
        <div className="bg-white pt-4 pb-3 px-5 lg:py-6 lg:px-10 lg:mt-0 border-b-1 border-gray-200 w-full flex items-center justify-between">
          <button
            className="lg:hidden text-green-800 text-lg ring-1 ring-gray-300 rounded p-1 cursor-pointer"
            onClick={() => {
              hidden ? setHidden(false) : setHidden(true);
            }}
          >
            <RiMenuFold4Fill />
          </button>
          <h1 className="font-bold text-lg text-left">
            Hello, {user.firstName}!
          </h1>
          <div className="hidden lg:visible">
            <button
              className="ring-1 ring-gray-300 rounded px-5 py-0.5 text-sm cursor-pointer"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
        <div className="py-3 px-5 lg:px-10 border-b-1 text-xs border-gray-200 w-full flex items-center justify-start">
          <h1 className="font-semibold text-sm text-black text-left">
            Admin Dashboard
          </h1>
          <h1 className="font-semibold text-xs text-gray-500 text-left mx-1">
            |
          </h1>
          <h1 className="font-semibold text-xs text-gray-500 text-left">
            {currentPage}
          </h1>
        </div>

        {showDashboard ? (
          <div className="mx-5 lg:mx-10 mt-3 lg:mt-3">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <div className="pt-1 ring-1 bg-gray-100 ring-gray-300 lg:ring-gray-200 rounded flex flex-col justify-between">
                <div className="flex items-start justify-between mx-6 mt-5">
                  <div className="text-base lg:text-xl w-max rounded p-3 bg-green-900 text-white border-1 border-gray-300 flex items-center">
                    <LuCrown />
                  </div>
                  <div className="w-full flex flex-col justify-between items-end">
                    <p className="text-xs lg:text-sm font-semibold ml-3 text-gray-500">
                      Total Users
                    </p>
                    <h1 className="text-2xl font-bold">
                      {adminStats.totalUsers[0].count ?? 0}
                    </h1>
                  </div>
                </div>
                <div className="rounded bg-gray-300 w-full flex py-3 px-6 justify-between items-center mt-5">
                  <div className="flex items-center">
                    <h1 className="text-xs">View users</h1>
                  </div>
                  <div className="flex items-center justify-center rounded-3xl p-1 bg-green-900 text-white text-xs cursor-pointer">
                    <FaChevronRight />
                  </div>
                </div>
              </div>

              <div className="pt-1 ring-1 bg-gray-100 ring-gray-300 lg:ring-gray-200 rounded flex flex-col justify-between">
                <div className="flex items-start justify-between mx-6 mt-5">
                  <div className="text-base lg:text-xl w-max rounded p-3 bg-green-900 text-white border-1 border-gray-300 flex items-center">
                    <LuCrown />
                  </div>
                  <div className="w-full flex flex-col justify-between items-end">
                    <p className="text-xs lg:text-sm font-semibold ml-3 text-gray-500">
                      Verified Users
                    </p>
                    <h1 className="text-2xl font-bold">
                      {adminStats.verifiedUsers[0].count}
                    </h1>
                  </div>
                </div>
                <div className="rounded bg-gray-300 w-full flex py-3 px-6 justify-between items-center mt-5">
                  <div className="flex items-center">
                    <h1 className="text-xs">View users</h1>
                  </div>
                  <div className="flex items-center justify-center rounded-3xl p-1 bg-green-900 text-white text-xs cursor-pointer">
                    <FaChevronRight />
                  </div>
                </div>
              </div>

              {/* <div className="pt-1 ring-1 bg-gray-100 ring-gray-300 lg:ring-gray-200 rounded flex flex-col justify-between">
                            <div className='flex items-start justify-between mx-6 mt-5'>
                                <div className='text-base lg:text-xl w-max rounded p-3 bg-green-900 text-white border-1 border-gray-300 flex items-center'>
                                    <LuCrown />
                                </div>
                                <div className='w-full flex flex-col justify-between items-end'>
                                    <p className='text-xs lg:text-sm font-semibold ml-3 text-gray-500'>Pending Approvals</p>
                                    <h1 className='text-2xl font-bold'>{}</h1>
                                </div>
                            </div>
                            <div className='rounded bg-gray-300 w-full flex py-3 px-6 justify-between items-center mt-5'>
                                <div className='flex items-center'>
                                    <h1 className='text-xs text-green-800'>200%</h1>
                                    <h1 className='text-xs ml-2 font-semibold'>Last Month</h1>
                                </div>
                                <div className='flex items-center justify-center rounded-3xl p-1 bg-green-900 text-white text-xs cursor-pointer'>
                                    <FaChevronRight />
                                </div>
                            </div>
                        </div> */}

              <div className="pt-1 ring-1 bg-gray-100 ring-gray-300 lg:ring-gray-200 rounded flex flex-col justify-between">
                <div className="flex items-start justify-between mx-6 mt-5">
                  <div className="text-base lg:text-xl w-max rounded p-3 bg-green-900 text-white border-1 border-gray-300 flex items-center">
                    <LuCrown />
                  </div>
                  <div className="w-full flex flex-col justify-between items-end">
                    <p className="text-xs lg:text-sm font-semibold ml-3 text-gray-500">
                      Recent Users
                    </p>
                    <h1 className="text-2xl font-bold">
                      {adminStats.recentUsers[0].count}
                    </h1>
                  </div>
                </div>
                <div className="rounded bg-gray-300 w-full flex py-3 px-6 justify-between items-center mt-5">
                  <div className="flex items-center">
                    <h1 className="text-xs">Over the last month</h1>
                  </div>
                  <div className="flex items-center justify-center rounded-3xl p-1 bg-green-900 text-white text-xs cursor-pointer">
                    <FaChevronRight />
                  </div>
                </div>
              </div>

              <div className="pt-1 ring-1 bg-gray-100 ring-gray-300 lg:ring-gray-200 rounded flex flex-col justify-between">
                <div className="flex items-start justify-between mx-6 mt-5">
                  <div className="text-base lg:text-xl w-max rounded p-3 bg-green-900 text-white border-1 border-gray-300 flex items-center">
                    <LuCrown />
                  </div>
                  <div className="w-full flex flex-col justify-between items-end">
                    <p className="text-xs lg:text-sm font-semibold ml-3 text-gray-500">
                      Special Users
                    </p>
                    <h1 className="text-2xl font-bold">
                      {adminStats.specialUsers[0].count}
                    </h1>
                  </div>
                </div>
                <div className="rounded bg-gray-300 w-full flex py-3 px-6 justify-between items-center mt-5">
                  <div className="flex items-center">
                    <h1 className="text-xs">Special user categories</h1>
                  </div>
                  <div className="flex items-center justify-center rounded-3xl p-1 bg-green-900 text-white text-xs cursor-pointer">
                    <FaChevronRight />
                  </div>
                </div>
              </div>
            </div>

            <div className="h-max flex flex-col-reverse lg:flex-row items-start justify-between mt-10 pb-10">
              <div className="shadow-xl ring-1 ring-gray-300 lg:ring-gray-200 rounded w-full lg:w-4/6 bg-gray-100">
                <h1 className="text-base font-semibold mt-0 mb-0 border-b-1 border-gray-300 lg:border-gray-200 px-5 pt-3 pb-3">
                  Sales overview
                </h1>

                <div className="pt-5 w-full lg:w-full h-[450px] overflow-x-auto scrollbar-hide">
                  <ResponsiveContainer width={"100%"} height={"100%"}>
                    <ComposedChart
                      data={data}
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
                          fontFamily: "Arial",
                          fill: "#555",
                        }}
                        axisLine={{ stroke: "#ccc", strokeWidth: 1 }}
                        tickMargin={10} // Space between ticks and axis line
                        padding={{ left: 20, right: 20 }} // Padding for first/last bars
                      />
                      <YAxis
                        // yAxisId="left"
                        tick={{
                          fontSize: 11,
                          fontFamily: "Arial",
                          fill: "#666",
                        }}
                        axisLine={{ stroke: "#ccc", strokeWidth: 1 }}
                        tickMargin={10}
                      />

                      {/* <YAxis
                        yAxisId="right"
                        orientation="right"
                        tick={{
                          fontSize: 11,
                          fontFamily: "Arial",
                          fill: "#666",
                        }}
                        axisLine={{ stroke: "#ccc", strokeWidth: 1 }}
                        tickMargin={10}
                      /> */}
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
                          fontFamily: "Arial",
                        }}
                      />
                      <Bar
                        // yAxisId="left"
                        dataKey="sales"
                        barSize={70}
                        fill="#413ea0"
                        name="Total Sales"
                        radius={[4, 4, 0, 0]}
                        isAnimationActive={true}
                        animationDuration={1500}
                      />
                      <Line
                        // yAxisId="right"
                        type="monotone"
                        dataKey="userGrowth"
                        stroke="#ff7300"
                        strokeWidth={2}
                        name="User Growth"
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="h-full shadow-lg lg:shadow-xl ring-1 ring-gray-300 lg:ring-gray-200 rounded w-full lg:w-2/6 ml-0 lg:ml-4 mb-5 lg:mb-0 bg-gray-100">
                <h1 className="text-base font-semibold mt-0 mb-0 border-b-1 border-gray-300 lg:border-gray-200 px-5 pt-3 pb-3">
                  User Composition
                </h1>
                <div className="pt-5 w-full h-[450px]">
                  <ResponsiveContainer width="100%" height={"100%"}>
                    <PieChart>
                      <Legend
                        wrapperStyle={{
                          paddingTop: "20px",
                          paddingBottom: "20px",
                          paddingLeft: "20px",
                          paddingRight: "20px",
                          fontSize: "13px",
                          fontFamily: "Arial",
                          textTransform: "capitalize",
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
                        data={usersComposition}
                        dataKey="population"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={"100%"}
                        fill="#8884d8"
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {showVendors ? (
          <div className="">
            <AdminVendors />
          </div>
        ) : null}

        {showFarmers ? (
          <div className="">
            <AdminFarmers />
          </div>
        ) : null}

        {showExperts ? (
          <div className="">
            <AdminExperts />
          </div>
        ) : null}
      </div>
      <Toaster />
    </div>
  );
}

export default Admin;
