import React, { useEffect, useState } from "react";
import Api from "../common";
import moment from "moment";
import { toast } from "react-toastify";
import { MdModeEdit } from "react-icons/md";
import { FiEye } from "react-icons/fi";
import displayINRCurrency from '../helpers/displayCurrency';
import ChangeOrderState from "../components/ChangeOrderState";
import ProductOrder from "../components/ProductOrder";

function AllOrders() {
  const [allOrders, setAllOrders] = useState([]);
  const [openUpdateState, setOpenUpdateState] = useState(false);
  const [updateOrderState, setUpdateOrderState] = useState({
    state: "",
    _id: ""
  });
  const [openProductOrder, setOpenProductOrder] = useState(false);
  const [productsOrder, setProductsOrder] = useState({
    _id: ""
  });
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(12);

  const fetchAllOrders = async () => {
    const fetchData = await fetch(`${Api.allOrder.url}?page=${currentPage}&limit=${limit}`, {
      method: Api.allOrder.method,
      credentials: "include",
    });

    const dataResponse = await fetchData.json();

    if (dataResponse.success) {
      setAllOrders(dataResponse.data);
      setTotalPages(dataResponse.totalPages);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [currentPage]);

  return (
    <div className="p-4">
      <div className="bg-white py-2 px-4 flex justify-between items-center flex-wrap">
        <h2 className="font-bold text-lg">All Orders</h2>
      </div>

      {/* Responsive Layout */}
      <div className="hidden md:block bg-white pb-4 overflow-x-auto mt-5">
      <table className="w-full userTable min-w-[600px]">
          <thead>
            <tr className="bg-black text-white">
              <th>Index</th>
              <th>Order Number</th>
              <th>Name</th>
              <th>Email</th>
              <th>Total Qty</th>
              <th>Total Price</th>
              <th>State</th>
              <th>Created Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allOrders?.map((el, index) => (
              <tr key={index}>
                <td>{(currentPage - 1) * limit + (index + 1)}</td>
                <td>{el?.NumberOrder}</td>
                <td>{el?.userId?.name}</td>
                <td>{el?.userId?.email}</td>
                <td>{el?.totalQty}</td>
                <td>{displayINRCurrency(el?.totalPrice)}</td>
                <td>{el?.etat}</td>
                <td>{moment(el?.createdAt).format("LL")}</td>
                <td className="flex justify-evenly items-center">
                  <button className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white"
                    onClick={() => {
                      setUpdateOrderState(el);
                      setOpenUpdateState(true);
                    }}>
                    <MdModeEdit />
                  </button>
                  <button className="bg-blue-100 p-2 rounded-full cursor-pointer hover:bg-blue-500 hover:text-white"
                    onClick={() => {
                      setProductsOrder(el);
                      setOpenProductOrder(true);
                    }}>
                    <FiEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

   
      
        
        {/* Pagination Controls */}
       
      </div>


      <div className="block md:hidden mt-5">
             {allOrders?.map((el, index) => (
            <div key={index}
            className="border rounded-lg p-4 mb-4 shadow-md bg-gray-50">
              <div className="flex justify-between items-center">
                <h3 className="font-bold">Order Number: {el?.NumberOrder}</h3>
                <span>{moment(el?.createdAt).format("LL")}</span>
              </div>
              <p><strong>Name:</strong> {el?.userId?.name}</p>
              <p><strong>Email:</strong> {el?.userId?.email}</p>
              <p><strong>Total Qty:</strong> {el?.totalQty}</p>
              <p><strong>Total Price:</strong> {displayINRCurrency(el?.totalPrice)}</p>
              <p><strong>State:</strong> {el?.etat}</p>
              <div className="flex justify-between mt-2">
                <button className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white"
                  onClick={() => {
                    setUpdateOrderState(el);
                    setOpenUpdateState(true);
                  }}>
                  <MdModeEdit />
                </button>
                <button className="bg-blue-100 p-2 rounded-full cursor-pointer hover:bg-blue-500 hover:text-white"
                  onClick={() => {
                    setProductsOrder(el);
                    setOpenProductOrder(true);
                  }}>
                  <FiEye />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center py-4 p-5">
          <button
            className={`bg-blue-500 text-white py-2 px-4 rounded p-2 ${currentPage === 1 ? 'bg-gray-500 cursor-not-allowed' : ''}`}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            className={`bg-blue-500 text-white py-2 px-4 rounded p-2 ${currentPage === totalPages ? 'bg-gray-500 cursor-not-allowed' : ''}`}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>

        {openUpdateState && (
          <ChangeOrderState
            onClose={() => setOpenUpdateState(false)}
            state={updateOrderState.etat}
            orderId={updateOrderState._id}
            callFunc={fetchAllOrders}
          />
        )}



        {openProductOrder && (
          <ProductOrder
            onClose={() => setOpenProductOrder(false)}
            orderId={productsOrder._id}
            callFunc={fetchAllOrders}
          />
        )}
    </div>
  );
}

export default AllOrders;
