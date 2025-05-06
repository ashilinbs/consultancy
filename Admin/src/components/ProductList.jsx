import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);

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

  const handleBuyNow = async (product) => {
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
    const userPhone = localStorage.getItem("Phone");
    const userName = localStorage.getItem("name");

    if (!userEmail) {
      alert("Please log in first.");
      return;
    }

    const method = window.prompt(
      "Choose payment method: Type 'cod' for Cash on Delivery or 'razorpay' for Razorpay"
    );

    if (!method || !["cod", "razorpay"].includes(method.toLowerCase())) {
      alert("Invalid payment method.");
      return;
    }

    const address = prompt("Enter your delivery address:");
    if (!address) {
      alert("Address is required to place the order.");
      return;
    }

    const paymentStatus = method.toLowerCase() === "cod" ? "No" : "Yes";

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
      quantity,
      order_date: now.toISOString().split("T")[0],
      order_time: now.toLocaleTimeString(),
      delivery_time: deliveryTime.toLocaleTimeString(),
      payment_method: method.toUpperCase(),
      payment_status: paymentStatus,
      delivery_status: "Pending",
      address: address,
    };

    try {
      await axios.post("http://localhost:5000/order", orderData);
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Order failed:", error);
      alert("Failed to place order.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl h-[500px] overflow-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white border rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-4 flex flex-col h-[450px]"
          >
            <img
              src={product.image_url}
              alt={product.product_name}
              className="w-full h-44 object-cover rounded-lg"
            />
            <div className="flex flex-col flex-grow mt-4">
              <h2 className="font-bold text-lg text-gray-800">
                {product.product_name}
              </h2>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {product.ingredients_text}
              </p>
              <p className="mt-3 text-md text-green-600 font-semibold">
                ₹{product.price}
              </p>
              <div className="flex justify-between items-center mt-auto pt-4">
                <button
                  onClick={() => handleBuyNow(product)}
                  className="bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 text-sm"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-yellow-500 text-white px-3 py-2 rounded-md hover:bg-yellow-600 text-sm"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
  