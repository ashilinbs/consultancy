import React from "react";
import Navbar from "./Navbar";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <header className="bg-blue-800 text-white text-center py-6 shadow-md">
        <h1 className="text-4xl font-extrabold tracking-wide uppercase">Christal Supermarket</h1>
        <p className="text-lg mt-2 font-medium">Your one-stop destination for quality and value</p>
      </header>

      {/* Carousel Section */}
      <div className="mt-6 max-w-4xl mx-auto">
        <Carousel 
          autoPlay 
          infiniteLoop 
          showThumbs={false} 
          showStatus={false} 
          interval={3000}
          className="rounded-2xl shadow-lg"
        >
          <div>
            <img src="https://th.bing.com/th/id/R.ebfad280d02ac338ac67866dc6efbad6?rik=XH7%2fFsFtkWjvwQ&riu=http%3a%2f%2fshivangtrading.com%2fimg%2ffood_provision.jpg&ehk=yN5rGwPg%2fMHJOs1vyGzbH5qQlhh8syIQFX1PIPMKn%2fk%3d&risl=&pid=ImgRaw&r=0" alt="Supermarket 1" />
          </div>
          <div>
            <img src="https://th.bing.com/th/id/R.595c025b9602ede4f88d804b4701e107?rik=x7GCVsUwLGiBkA&riu=http%3a%2f%2fbristolfoodpantry.org%2fimages%2fimages_1.jpg&ehk=bIM6P%2baCfoKhbYZUdATPijn1WZpuWcx2wwnwKE8vVfE%3d&risl=&pid=ImgRaw&r=0" alt="Grocery" />
          </div>
          <div>
            <img src="https://th.bing.com/th/id/R.595c025b9602ede4f88d804b4701e107?rik=x7GCVsUwLGiBkA&riu=http%3a%2f%2fbristolfoodpantry.org%2fimages%2fimages_1.jpg&ehk=bIM6P%2baCfoKhbYZUdATPijn1WZpuWcx2wwnwKE8vVfE%3d&risl=&pid=ImgRaw&r=0" alt="Clothing" />
          </div>
          <div>
            <img src="https://th.bing.com/th/id/R.595c025b9602ede4f88d804b4701e107?rik=x7GCVsUwLGiBkA&riu=http%3a%2f%2fbristolfoodpantry.org%2fimages%2fimages_1.jpg&ehk=bIM6P%2baCfoKhbYZUdATPijn1WZpuWcx2wwnwKE8vVfE%3d&risl=&pid=ImgRaw&r=0" alt="Electronics" />
          </div>
        </Carousel>
      </div>

      {/* About Section */}
      <section className="bg-gray-100 py-10 px-6 text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">Welcome to Christal Supermarket</h2>
        <p className="text-gray-700 text-lg max-w-3xl mx-auto">
          At Christal Supermarket, we pride ourselves on delivering the best quality products 
          at unbeatable prices. From fresh groceries and trendy fashion to electronics and home essentials —
          everything you need is under one roof.
        </p>
        <p className="mt-4 text-gray-500">
          To enjoy a personalized shopping experience, please <span className="text-blue-600 font-bold">Login</span> first.
        </p>
      </section>

      {/* Features Section */}
      <section className="py-10 bg-white grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        <div className="bg-blue-50 p-6 rounded-2xl shadow-md text-center">
          <h3 className="text-xl font-semibold text-blue-800 mb-2">Wide Product Range</h3>
          <p className="text-gray-600">Explore a massive collection of groceries, clothing, gadgets, and more.</p>
        </div>
        <div className="bg-blue-50 p-6 rounded-2xl shadow-md text-center">
          <h3 className="text-xl font-semibold text-blue-800 mb-2">Fast Delivery</h3>
          <p className="text-gray-600">Experience lightning-fast delivery right to your doorstep.</p>
        </div>
        <div className="bg-blue-50 p-6 rounded-2xl shadow-md text-center">
          <h3 className="text-xl font-semibold text-blue-800 mb-2">Quality Guaranteed</h3>
          <p className="text-gray-600">Only the best products, thoroughly checked and trusted by thousands.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
