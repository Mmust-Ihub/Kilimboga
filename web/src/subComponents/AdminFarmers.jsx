import DataTable from "react-data-table-component";
import { useState, useCallback, useMemo, useEffect } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import Database from "../js/db.js";

const db = new Database();

function AdminFarmers() {
  const [showTable, setShowTable] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    _id: "67dc5d07bb2d7175a2b4d65e",
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@gmail.com",
    phoneNumber: "0712345678",
    location: {
      type: "Point",
      coordinates: [34.75229, 0.28422],
      _id: "67dc5d07bb2d7175a2b4d65f",
    },
    role: "farmer",
    isVerified: true,
    isSpecial: false,
    isApproved: true,
    documents:
      "https://res.cloudinary.com/dqrw1zi7d/image/upload/v1742494984/kilimboga/iajwnt3lyvxro1vuprvg.pdf",
    imageUrl: null,
    joined: "2025-03-20T18:16:50.535Z",
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
      const res = await db.getAdminUsers(token, "farmer", approved);
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
          fontSize: "14px",
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
          fontSize: "14px",
        },
      },
    },
  };

  const handleFarmerEditForm = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    // TO DO: validate form data

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFarmer = async (action) => {
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
        <div className="lg:px-10 py-5 lg:py-3 bg-white">
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
      ) : null}

      {showForm ? (
        <>
          <button
            className="mt-3 ml-10 mb-3 rounded-full ring-1 ring-gray-300 cursor-pointer p-1"
            onClick={showTableFn}
          >
            <IoMdArrowRoundBack />
          </button>
          <div className="mt-3 mx-10 ring-1 ring-gray-300 p-5 rounded">
            {/* <h3 className='text-base font-semibold'>Documents</h3>
                    <ol className='mb-3'>
                        <li><a href={formData.documents} className='text-sm cursor-pointer text-blue-600'>KRA certificate</a></li>
                    </ol> */}

            <form className="w-full grid grid-cols-2 gap-4 text-sm" action="">
              <div className="flex flex-col">
                <label htmlFor="firstName">First Name</label>
                <input
                  value={formData.firstName}
                  onChange={handleFarmerEditForm}
                  className="rounded p-1 px-3 mt-2 border-1 border-gray-300 outline-0"
                  type="text"
                  id="firstName"
                  name="firstName"
                />
                <p className="error text-red-500 mt-2"></p>
              </div>

              <div className="flex flex-col">
                <label htmlFor="lastName">Last Name</label>
                <input
                  value={formData.lastName}
                  onChange={handleFarmerEditForm}
                  className="rounded p-1 px-3 mt-2 border-1 border-gray-300 outline-0"
                  type="text"
                  id="lastName"
                  name="lastName"
                />
                <p className="error text-red-500 mt-2"></p>
              </div>

              <div className="flex flex-col">
                <label htmlFor="email">Email</label>
                <input
                  value={formData.email}
                  onChange={handleFarmerEditForm}
                  className="rounded p-1 px-3 mt-2 border-1 border-gray-300 outline-0"
                  type="text"
                  id="email"
                  name="email"
                />
                <p className="error text-red-500 mt-2"></p>
              </div>

              <div className="flex flex-col">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  value={formData.phoneNumber}
                  onChange={handleFarmerEditForm}
                  className="rounded p-1 px-3 mt-2 border-1 border-gray-300 outline-0"
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                />
                <p className="error text-red-500 mt-2"></p>
              </div>

              <div className="flex flex-col">
                <label htmlFor="longitude">Longitude</label>
                <input
                  value={formData.location.coordinates[1]}
                  onChange={handleFarmerEditForm}
                  className="rounded p-1 px-3 mt-2 border-1 border-gray-300 outline-0"
                  type="text"
                  id="longitude"
                  name="longitude"
                />
                <p className="error text-red-500 mt-2"></p>
              </div>

              <div className="flex flex-col">
                <label htmlFor="latitude">Latitude</label>
                <input
                  value={formData.location.coordinates[0]}
                  onChange={handleFarmerEditForm}
                  className="rounded p-1 px-3 mt-2 border-1 border-gray-300 outline-0"
                  type="text"
                  id="latitude"
                  name="latitude"
                />
                <p className="error text-red-500 mt-2"></p>
              </div>

              <div
                className={
                  formData.role == "farmer"
                    ? "flex flex-col text-gray-500"
                    : "flex flex-col"
                }
              >
                <label htmlFor="documents">Supporting document</label>
                <input
                  className="rounded cursor-pointer p-1 px-3 mt-2 border-1 border-gray-300 outline-0"
                  type="file"
                  id="documents"
                  name="documents"
                  accept="jpg"
                  disabled={formData.role == "farmer" ? true : false}
                />
                <p className="error text-red-500 mt-2"></p>
              </div>

              <div className="flex flex-col">
                <label htmlFor="role">Role</label>
                <select
                  value={formData.role}
                  onChange={handleFarmerEditForm}
                  className="rounded p-1 px-3 mt-2 border-1 border-gray-300 outline-0"
                  name="role"
                  id="role"
                >
                  <option value="vendor">Vendor</option>
                  <option value="farmer">Farmer</option>
                  <option value="expert">Expert</option>
                </select>
                <p className="error text-red-500 mt-2"></p>
              </div>
            </form>
            <div className="flex justify-between items-center">
              <button
                onClick={() => {
                  handleFarmer("expert");
                }}
                className="mt-5 px-6 py-1 cursor-pointer bg-green-800 hover:bg-green-700 text-white text-sm rounded"
              >
                Make Expert
              </button>
              <div>
                <button
                  onClick={() => {
                    handleFarmer("suspend");
                  }}
                  className="mt-5 mr-5 px-6 py-1 cursor-pointer bg-red-800 hover:bg-red-700 text-white text-sm rounded"
                >
                  Suspend
                </button>
                <button
                  onClick={() => {
                    handleFarmer("approve");
                  }}
                  className="mt-5 px-6 py-1 cursor-pointer bg-green-800 hover:bg-green-700 text-white text-sm rounded"
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default AdminFarmers;
