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
  
    const userEmail = localStorage.getItem("email"); // or use props/state
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
      address: address // <-- Added address here
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
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product._id}
          className="border p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white"
        >
          <img
            src={product.image_url}
            alt={product.product_name}
            className="w-full h-48 object-cover rounded"
          />
          <h2 className="font-bold text-lg mt-2">{product.product_name}</h2>
          <p className="text-gray-600 text-sm mt-1">{product.ingredients_text}</p>
          
          <p className="text-md mt-1 text-green-600 font-semibold">Price: ₹{product.price}</p>

          <div className="mt-4 flex justify-between">
          <button onClick={() => handleBuyNow(product)} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700" >
                           Buy Now
</button>


            <button
              onClick={() => handleAddToCart(product)}
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
