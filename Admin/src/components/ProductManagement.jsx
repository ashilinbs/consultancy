import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", stock: "", image: null });

  // Fetch products and orders
  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchProducts = () => {
    axios.get("http://localhost:5000/products").then((res) => setProducts(res.data));
  };

  const fetchOrders = () => {
    axios.get("http://localhost:5000/orders").then((res) => setOrders(res.data));
  };

  // Handle Input Change for New Product
  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  // Handle Image Upload
  const handleImageChange = (e) => {
    setNewProduct({ ...newProduct, image: e.target.files[0] });
  };

  // Add New Product
  const addProduct = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);
    formData.append("stock", newProduct.stock);
    formData.append("image", newProduct.image);

    try {
      await axios.post("http://localhost:5000/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchProducts(); // Refresh product list
      setNewProduct({ name: "", price: "", stock: "", image: null }); // Clear form
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // Delete Product
  const deleteProduct = (id) => {
    axios.delete(`http://localhost:5000/products/${id}`).then(() => {
      fetchProducts(); // Refresh product list
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-700">Grocery Store Admin Dashboard</h1>

      {/* Product Management Section */}
      <div className="bg-white shadow-md p-4 rounded-md mt-6">
        <h2 className="text-xl font-semibold">Manage Products</h2>
        <form onSubmit={addProduct} className="mt-4 space-y-2" encType="multipart/form-data">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={handleInputChange}
            className="border p-2 w-full rounded"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleInputChange}
            className="border p-2 w-full rounded"
            required
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock Quantity"
            value={newProduct.stock}
            onChange={handleInputChange}
            className="border p-2 w-full rounded"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border p-2 w-full rounded"
            required
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add Product
          </button>
        </form>
      </div>

      {/* Product List */}
      <h2 className="text-xl font-semibold mt-6">Products</h2>
      <table className="w-full bg-white shadow-md rounded my-4">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="py-2 px-4">Image</th>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Price</th>
            <th className="py-2 px-4">Stock</th>
            <th className="py-2 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border-t">
              <td className="py-2 px-4">
                <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover rounded" />
              </td>
              <td className="py-2 px-4">{product.name}</td>
              <td className="py-2 px-4">${product.price}</td>
              <td className="py-2 px-4">{product.stock}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagement;
