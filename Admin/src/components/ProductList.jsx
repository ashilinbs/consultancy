import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [expandedProductId, setExpandedProductId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    quantity: "",
    address: "",
    payment_method: "cod",
  });
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleAddToCart = async (product) => {
    const qty = prompt("Enter quantity:");
    const quantity = Number(qty);

    if (!qty || isNaN(quantity) || quantity <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    if (quantity > product.stock) {
      alert(`Only ${product.stock} items in stock.`);
      return;
    }

    const userEmail = localStorage.getItem("email");
    if (!userEmail) {
      alert("Please log in first.");
      return;
    }

    const cartItem = {
      email: userEmail,
      product_id: product._id,
      quantity,
    };

    try {
      await axios.post("http://localhost:5000/cart", cartItem);
      alert("Product added to cart successfully.");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add product to cart.");
    }
  };

  const openBuyNowForm = (product) => {
    setSelectedProduct(product);
    setFormData({
      quantity: "",
      address: "",
      payment_method: "cod",
    });
    setShowForm(true);
  };

  const handleOrderSubmit = async () => {
    const { quantity, address, payment_method } = formData;
    const product = selectedProduct;
  
    if (!quantity || isNaN(quantity) || quantity <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }
  
    if (quantity > product.stock) {
      alert(`Only ${product.stock} items in stock.`);
      return;
    }
  
    if (!address.trim()) {
      alert("Please enter a delivery address.");
      return;
    }
  
    const userEmail = localStorage.getItem("email");
    const userPhone = localStorage.getItem("Phone");
    const userName = localStorage.getItem("name");
  
    if (!userEmail) {
      alert("Please log in first.");
      return;
    }
  
    const paymentStatus = payment_method === "cod" ? "No" : "Yes";
    const now = new Date();
    const deliveryTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      Math.floor(Math.random() * (20 - 9 + 1)) + 9,
      Math.floor(Math.random() * 60)
    );
  
    const orderData = {
      email: userEmail,
      name: userName || "Guest",
      phone: userPhone || "",
      product_id: product._id,
      product_name: product.product_name,
      quantity: Number(quantity),
      order_date: now.toISOString().split("T")[0],
      order_time: now.toLocaleTimeString(),
      delivery_time: deliveryTime.toLocaleTimeString(),
      payment_method: payment_method.toUpperCase(),
      payment_status: paymentStatus,
      delivery_status: "Pending",
      address,
    };
  
    if (payment_method === "razorpay") {
      try {
        // Create Razorpay order
        const res = await axios.post("http://localhost:5000/create-razorpay-order", {
          amount: product.price * quantity,
        });
  
        const { order_id, amount, currency } = res.data;
  
        // Open Razorpay payment gateway
        const options = {
          key: "your_razorpay_key_id", // Replace with your Razorpay Key ID
          amount: amount,
          currency: currency,
          name: "Grocery Store",
          description: "Order Payment",
          order_id: order_id,
          handler: async function (response) {
            // Payment successful
            alert("Payment successful!");
  
            // Save order to the database
            await axios.post("http://localhost:5000/order", {
              ...orderData,
              payment_status: "Yes",
            });
  
            alert("Order placed successfully!");
            setShowForm(false);
          },
          prefill: {
            name: userName || "Guest",
            email: userEmail,
            contact: userPhone || "",
          },
          theme: {
            color: "#3399cc",
          },
        };
  
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } catch (error) {
        console.error("Razorpay payment failed:", error);
        alert("Payment failed. Please try again.");
      }
    } else {
      // Handle Cash on Delivery
      try {
        await axios.post("http://localhost:5000/order", orderData);
        alert("Order placed successfully!");
        setShowForm(false);
      } catch (error) {
        console.error("Order failed:", error);
        alert("Failed to place order.");
      }
    }
  };
  return (
    <div className="p-6 bg-green-50 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          const isExpanded = expandedProductId === product._id;

          return (
            <div
              key={product._id}
              onClick={() =>
                setExpandedProductId(isExpanded ? null : product._id)
              }
              className={`border-2 border-green-300 p-4 rounded-lg bg-white transition-all duration-500 transform ${
                isExpanded ? "scale-105 shadow-2xl ring ring-green-300 z-10" : "shadow-md"
              } cursor-pointer`}
            >
              <img
                src={product.image_url}
                alt={product.product_name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <h2 className="text-lg font-bold text-green-700 mt-2 text-center">
                {product.product_name}
              </h2>

              {isExpanded && (
                <div className="mt-4 animate-fadeIn">
                  <p className="text-sm text-gray-600">{product.ingredients_text}</p>
                  <p className="text-md mt-2 text-green-600 font-semibold">₹{product.price}</p>
                  <div className="mt-4 flex justify-between gap-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openBuyNowForm(product);
                      }}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                      Buy Now
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-green-700">Place Your Order</h2>

            <label className="block mb-2 text-sm font-medium">Quantity</label>
            <input
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              className="w-full border px-3 py-2 mb-4 rounded"
              placeholder="Enter quantity"
            />

            <label className="block mb-2 text-sm font-medium">Address</label>
            <textarea
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full border px-3 py-2 mb-4 rounded"
              placeholder="Enter delivery address"
            />

            <label className="block mb-2 text-sm font-medium">Payment Method</label>
            <select
              value={formData.payment_method}
              onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
              className="w-full border px-3 py-2 mb-4 rounded"
            >
              <option value="cod">Cash on Delivery</option>
              <option value="razorpay">Razorpay</option>
            </select>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleOrderSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default ProductList;
