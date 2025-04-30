import { FaShop } from "react-icons/fa6";
import { PiFarmFill } from "react-icons/pi";
import { IoStatsChart } from "react-icons/io5";
import { FaChevronRight } from "react-icons/fa";
import { RiMenuFoldFill } from "react-icons/ri";
import { RiMenuFold4Fill } from "react-icons/ri";
import { WiMoonAltThirdQuarter } from "react-icons/wi";
import { useState } from "react";

function Navbar({ children, user, activePage }) {
  const [active, setActive] = useState(activePage);
  const [hidden, setHidden] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.theme = "light";
    } else {
      html.classList.add("dark");
      localStorage.theme = "dark";
    }
  };

  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  function logout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    window.location.href = "/";
  }

  return (
    <>
      <div className=" bg-gray-100 flex w-full" style={{ minHeight: "100%" }}>
        {/* <Navbar user={'user'} /> */}
        <div
          className={`bg-green-900 dark:bg-gray-800 h-screen w-12/12 lg:w-2/12 fixed top-0 left-0 z-50 transform transition-all duration-300 ease-in-out ${
            hidden ? "-translate-x-full lg:translate-x-0" : "translate-x-0 "
          }`}
        >
          <div className="flex justify-between items-center border-b-1 border-green-800 dark:border-gray-600">
            <div className="flex items-center justify-start py-3 px-5">
              <img
                src="/kilimboga logo.jpg"
                alt="logo"
                className="h-6 w-6 rounded"
              />
              <h1 className="ml-2 font-bold text-lg text-white text-left  w-full">
                Kilimboga
              </h1>
            </div>
            <button
              className="lg:hidden mr-6 my-6 text-lg text-white ring-1 ring-green-800 dark:ring-gray-600 rounded p-1 cursor-pointer"
              onClick={() => {
                hidden ? setHidden(false) : setHidden(true);
              }}
            >
              <RiMenuFoldFill />
            </button>
          </div>

          <div className="flex flex-col justify-between h-[94%]">
            <div>
              <h1 className="px-5 mt-4 text-white text-xs">NAVIGATION</h1>
              <div
                className={
                  active == "dashboard"
                    ? "px-3 mx-5 rounded mt-2 text-sm flex items-center justify-between cursor-pointer bg-white text-green-900 dark:text-gray-800 py-2"
                    : "px-3 mx-5 rounded mt-2 text-white text-sm flex items-center justify-between cursor-pointer hover:bg-white hover:text-green-900 py-2"
                }
                onClick={() => {
                  window.location.href = "/dashboard";
                }}
              >
                <div className="flex items-center">
                  <div
                    className={
                      active == "dashboard"
                        ? "text-white bg-green-800 dark:bg-gray-800 rounded p-2"
                        : "text-green-900 bg-white rounded p-2"
                    }
                  >
                    <IoStatsChart />
                  </div>
                  <h1 className="ml-2">Dashboard</h1>
                </div>
                <FaChevronRight />
              </div>
              <div
                className={
                  active == "products"
                    ? "px-3 mx-5 rounded mt-2 text-sm flex items-center justify-between cursor-pointer bg-white text-green-900 dark:text-gray-800 py-2"
                    : "px-3 mx-5 rounded mt-2 text-white text-sm flex items-center justify-between cursor-pointer hover:bg-white hover:text-green-900 py-2"
                }
                onClick={() => {
                  window.location.href = "/products";
                }}
              >
                <div className="flex items-center">
                  <div
                    className={
                      active == "products"
                        ? "text-white bg-green-800 dark:bg-gray-800 rounded p-2"
                        : "text-green-900 dark:text-gray-800 bg-white rounded p-2"
                    }
                  >
                    <FaShop />
                  </div>
                  <h1 className="ml-2">Products</h1>
                </div>
                <FaChevronRight />
              </div>
              <div
                className={
                  active == "orders"
                    ? "px-3 mx-5 rounded mt-2 text-sm flex items-center justify-between cursor-pointer bg-white text-green-900 dark:text-gray-800 py-2"
                    : "px-3 mx-5 rounded mt-2 text-white text-sm flex items-center justify-between cursor-pointer hover:bg-white hover:text-green-900 py-2"
                }
                onClick={() => {
                  window.location.href = "/orders";
                }}
              >
                <div className="flex items-center">
                  <div
                    className={
                      active == "orders"
                        ? "text-white bg-green-800 dark:bg-gray-800 rounded p-2"
                        : "text-green-800 dark:text-gray-800 bg-white rounded p-2"
                    }
                  >
                    <PiFarmFill />
                  </div>
                  <h1 className="ml-2">Orders</h1>
                </div>
                <FaChevronRight />
              </div>

              <h1 className="px-5 mt-4 text-white text-xs">SYSTEM</h1>
              <div
                className="px-3 mx-5 rounded mt-2 text-white text-sm flex items-center justify-between cursor-pointer hover:bg-white hover:text-green-900 py-2"
                onClick={toggleDarkMode}
              >
                <div className="flex items-center">
                  <div
                    className={
                      "text-green-800 dark:text-gray-800 bg-white rounded p-2"
                    }
                  >
                    <WiMoonAltThirdQuarter />
                  </div>
                  <h1 className="ml-2">Toggle Dark Mode</h1>
                </div>
              </div>
            </div>

            <div className="mx-5 rounded mb-2 text-white text-sm flex flex-col items-start justify-start py-2 relative z-40">
              <div className="mb-5">
                <h1 className="font-bold text-lg">
                  {user.firstName} {user.lastName}
                </h1>
                <h1 className="text-gray-400">{user.role}</h1>
              </div>
              <button
                className="w-full font-semibold border-1 border-white text-sm rounded px-3 py-3 cursor-pointer hover:bg-white hover:text-green-900"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="w-12/12 lg:w-10/12 h-max lg:ml-auto bg-gray-200 dark:bg-gray-400 transition-all duration-300 ease-in-out">
          <div className="bg-white pt-4 pb-3 px-5 lg:py-3 lg:px-10 lg:mt-0 border-b-1 border-gray-200 w-full flex items-center justify-between">
            <button
              className="lg:hidden text-green-800 text-lg ring-1 ring-gray-300 rounded p-1 cursor-pointer"
              onClick={() => {
                hidden ? setHidden(false) : setHidden(true);
              }}
            >
              <RiMenuFold4Fill />
            </button>
            <h1 className="font-bold text-lg text-left text-green-800">
              Hello, {user.firstName}!
            </h1>
            <div className="hidden lg:block">
              <button
                className="ring-1 shadow-lg ring-gray-200 rounded px-5 py-1 text-sm cursor-pointer hover:text-white hover:bg-green-800 transition-all duration-300 ease-in-out"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-300 py-3 px-5 lg:px-10 border-b-1 text-xs border-gray-200 w-full flex items-center justify-start shadow-lg">
            <h1 className="font-semibold text-sm text-black text-left">
              Vendor Dashboard
            </h1>
          </div>

          {children}
        </div>
      </div>
    </>
  );
}

export default Navbar;
