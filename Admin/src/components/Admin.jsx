import React, { useEffect, useState } from "react";
import axios from "axios"

const Admin = () =>{
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/products").then((res) => setProducts(res.data));
    axios.get("http://localhost:5000/orders").then((res) => setOrders(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-700">Grocery Store Admin Dashboard</h1>
      
      {/* Products Section */}
      <h2 className="text-xl font-semibold mt-4">Products</h2>
      <table className="w-full bg-white shadow-md rounded my-4">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Price</th>
            <th className="py-2 px-4">Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border-t">
              <td className="py-2 px-4">{product.name}</td>
              <td className="py-2 px-4">${product.price}</td>
              <td className="py-2 px-4">{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Orders Section */}
      <h2 className="text-xl font-semibold mt-4">Orders</h2>
      <table className="w-full bg-white shadow-md rounded my-4">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="py-2 px-4">Customer</th>
            <th className="py-2 px-4">Items</th>
            <th className="py-2 px-4">Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-t">
              <td className="py-2 px-4">{order.customerName}</td>
              <td className="py-2 px-4">
                {order.items.map((item) => (
                  <div key={item.product}>
                    {item.product} - {item.quantity}
                  </div>
                ))}
              </td>
              <td className="py-2 px-4">${order.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
