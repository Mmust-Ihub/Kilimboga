import DataTable from "react-data-table-component";
import { useState, useCallback, useMemo, useEffect } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import Database from "../js/db.js";

const db = new Database();

function AdminVendors() {
  const [showTable, setShowTable] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    location: {
      type: "Point",
      coordinates: [0, 0],
      _id: "",
    },
    role: "vendor",
    isVerified: true,
    isSpecial: true,
    isApproved: true,
    documents: "",
    imageUrl: null,
    joined: "",
    __v: 0,
  });
  const [token, setToken] = useState(
    JSON.parse(sessionStorage.getItem("token"))
  );
  const [tdata, setTdata] = useState([]);
  const [columns, setColumns] = useState([
    {
      name: "First Name",
      selector: (row) => row.firstName,
    },
    {
      name: "Last Name",
      selector: (row) => row.lastName,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "id",
      selector: (row) => row.id,
      omit: true,
    },
    {
      name: "",
      cell: (row) => (
        <button
          className="bg-gray-500 cursor-pointer text-white rounded-full px-4 py-2 text-xs lg:text-sm"
          onClick={async () => {
            const res = await db.getAdminUser(token, row.id);
            setFormData(res.data);
            showFormFn();
          }}
        >
          Edit
        </button>
      ),
      selector: (row) => row.action,
    },
  ]);
  const [approved, setApproved] = useState(true);
  const [fontSize, setFontSize] = useState(12);

  function showTableFn() {
    setShowTable(true);
    setShowForm(false);
  }

  function showFormFn() {
    setShowTable(false);
    setShowForm(true);
  }

  useEffect(() => {
    async function getData() {
      const res = await db.getAdminUsers(token, "vendor", approved);
      console.log(res);
      setTdata(
        res.data.users.map((item) => {
          return {
            firstName: item.firstName,
            lastName: item.lastName,
            email: item.email,
            id: item._id,
          };
        })
      );
    }
    getData();
  }, [approved]);

  const customStyles = {
    header: {
      style: {
        minHeight: "56px",
        // fontSize: `${fontSize + 8}px`,
      },
    },
    headRow: {
      style: {
        borderTopStyle: "solid",
        borderTopWidth: "1px",
        borderTopColor: "#D1D5DB",
      },
    },
    headCells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: "#D1D5DB",
          //   fontSize: `${fontSize + 2}px`,
          paddingTop: "10px",
          paddingBottom: "10px",
        },
      },
    },
    cells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: "#D1D5DB",
          paddingTop: "15px",
          paddingBottom: "15px",
          //   fontSize: `${fontSize + 2}px`,
        },
      },
    },
  };

  const handleVendorEditForm = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    // TO DO: validate form data

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleVendor = async (action) => {
    switch (action) {
      case "approve":
        const resApprove = await db.manageUser(token, formData._id, "approve");
        if (resApprove.status == true) {
          toast.success("Vendor approved successfully");
        } else {
          toast.error("Vendor approval failed");
        }
        showTableFn();
        break;
      case "restore":
        const resRestore = await db.manageUser(token, formData._id, "restore");
        if (resRestore.status == true) {
          toast.success("Vendor restored successfully");
        } else {
          toast.error("Vendor restoration failed");
        }
        showTableFn();
        break;
      case "suspend":
        const resSuspend = await db.manageUser(token, formData._id, "suspend");
        console.log(resSuspend);
        if (resSuspend.status == true) {
          toast.success("Vendor suspended successfully");
        } else {
          toast.error("Vendor suspension failed");
        }
        showTableFn();
        break;
      default:
        showTableFn();
        break;
    }
  };

  return (
    <>
      {showTable ? (
        <div className="bg-gray-100 w-full">
          <div
            className="lg:px-10 px-5 py-5 bg-white"
            style={{ minHeight: "100vh" }}
          >
            <div className="mb-3">
              <button
                className="text-xs bg-gray-500 cursor-pointer text-white rounded-full px-4 py-2 mr-3"
                onClick={() => {
                  setApproved(true);
                }}
              >
                Approved
              </button>
              <button
                className="text-xs bg-gray-500 cursor-pointer text-white rounded-full px-4 py-2 mr-3"
                onClick={() => {
                  setApproved(false);
                }}
              >
                Not approved
              </button>
            </div>
            <DataTable
              className=""
              columns={columns}
              data={tdata}
              pagination
              customStyles={customStyles}
              dense
            />
          </div>
        </div>
      ) : null}

      {showForm ? (
        <>
          <button
            className="mt-0 lg:mt-3 lg:ml-10 ml-5 lg:mb-3 mb-0 rounded-full ring-1 ring-gray-300 cursor-pointer p-1"
            onClick={showTableFn}
          >
            <IoMdArrowRoundBack />
          </button>

          <div className="" style={{ minHeight: "100vh" }}>
            <div className="mt-3 lg:mx-10 mx-5 ring-1 ring-gray-300 p-5 rounded bg-gray-100">
              <h3 className="text-base font-semibold">Documents</h3>
              <ol className="mb-3">
                <li>
                  <a
                    href={formData.documents}
                    className="text-sm cursor-pointer text-blue-600"
                    target="_blank"
                  >
                    Supporting document
                  </a>
                </li>
              </ol>

              <form
                className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm"
                action=""
              >
                <div className="flex flex-col">
                  <label
                    className="text-gray-500 lg:text-black text-xs"
                    htmlFor="firstName"
                  >
                    First Name
                  </label>
                  <input
                    value={formData.firstName}
                    onChange={handleVendorEditForm}
                    className="rounded text-sm lg:text-base p-1 px-3 mt-2 border-1 border-gray-300 outline-0"
                    type="text"
                    id="firstName"
                    name="firstName"
                  />
                  <p className="error text-red-500 mt-2"></p>
                </div>

                <div className="flex flex-col">
                  <label
                    className="text-gray-500 lg:text-black text-xs"
                    htmlFor="lastName"
                  >
                    Last Name
                  </label>
                  <input
                    value={formData.lastName}
                    onChange={handleVendorEditForm}
                    className="rounded text-sm lg:text-base p-1 px-3 mt-2 border-1 border-gray-300 outline-0"
                    type="text"
                    id="lastName"
                    name="lastName"
                  />
                  <p className="error text-red-500 mt-2"></p>
                </div>

                <div className="flex flex-col">
                  <label
                    className="text-gray-500 lg:text-black text-xs"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    value={formData.email}
                    onChange={handleVendorEditForm}
                    className="rounded text-sm lg:text-base p-1 px-3 mt-2 border-1 border-gray-300 outline-0"
                    type="text"
                    id="email"
                    name="email"
                  />
                  <p className="error text-red-500 mt-2"></p>
                </div>

                <div className="flex flex-col">
                  <label
                    className="text-gray-500 lg:text-black text-xs"
                    htmlFor="phoneNumber"
                  >
                    Phone Number
                  </label>
                  <input
                    value={formData.phoneNumber}
                    onChange={handleVendorEditForm}
                    className="rounded text-sm lg:text-base p-1 px-3 mt-2 border-1 border-gray-300 outline-0"
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                  />
                  <p className="error text-red-500 mt-2"></p>
                </div>

                <div className="flex flex-col">
                  <label
                    className="text-gray-500 lg:text-black text-xs"
                    htmlFor="longitude"
                  >
                    Longitude
                  </label>
                  <input
                    value={formData.location.coordinates[0]}
                    onChange={handleVendorEditForm}
                    className="rounded text-sm lg:text-base p-1 px-3 mt-2 border-1 border-gray-300 outline-0"
                    type="text"
                    id="longitude"
                    name="longitude"
                  />
                  <p className="error text-red-500 mt-2"></p>
                </div>

                <div className="flex flex-col">
                  <label
                    className="text-gray-500 lg:text-black text-xs"
                    htmlFor="latitude"
                  >
                    Latitude
                  </label>
                  <input
                    value={formData.location.coordinates[1]}
                    onChange={handleVendorEditForm}
                    className="rounded text-sm lg:text-base p-1 px-3 mt-2 border-1 border-gray-300 outline-0"
                    type="text"
                    id="latitude"
                    name="latitude"
                  />
                  <p className="error text-red-500 mt-2"></p>
                </div>
              </form>

              <div className="flex lg:flex-row flex-col justify-between items-center">
                <div className="flex flex-col lg:flex-row w-full lg:w-max">
                  <button
                    onClick={() => {
                      handleVendor("restore");
                    }}
                    className="w-full lg:w-max mt-5 lg:mt-5 lg:mr-5 px-6 py-3 lg:py-1 cursor-pointer bg-green-800 hover:bg-green-700 text-white text-sm rounded"
                  >
                    Restore
                  </button>
                  <button
                    onClick={() => {
                      handleVendor("suspend");
                    }}
                    className="w-full lg:w-max mt-2 lg:mt-5 lg:mr-5 px-6 py-3 lg:py-1 cursor-pointer bg-red-800 hover:bg-red-700 text-white text-sm rounded"
                  >
                    Suspend
                  </button>
                </div>

                <button
                  onClick={() => {
                    handleVendor("approve");
                  }}
                  className="w-full lg:w-max mt-2 lg:mt-5 lg:mr-5 px-6 py-3 lg:py-1 cursor-pointer bg-green-800 hover:bg-green-700 text-white text-sm rounded"
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
      <Toaster />
    </>
  );
}

export default AdminVendors;
