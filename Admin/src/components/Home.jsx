import React from "react";
import Navbar from "./Navbar";
import { Carousel } from "react-responsive-carousel";
import { motion } from "framer-motion";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import consultan1 from '../assets/consultan1.jpg'
import consult3 from '../assets/consult3.webp'
import conslutimg from '../assets/conslutimg.avif'
const Home = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen">
      <Navbar />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-blue-800 text-white text-center py-8 shadow-xl rounded-b-3xl"
      >
        <h1 className="text-5xl font-extrabold tracking-wider uppercase">Christal Supermarket</h1>
        <p className="text-lg mt-3 font-medium text-blue-100">Your one-stop destination for quality and value</p>
      </motion.header>

      {/* Carousel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="mt-10 max-w-3xl mx-auto rounded-3xl overflow-hidden shadow-2xl"
      >
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          interval={1000}
        >
          <div>
            <img src={consultan1} alt="Supermarket 1" className="h-64 object-cover w-full" />
          </div>
          <div>
            <img src={consult3} alt="Supermarket 2" className="h-64 object-cover w-full" />
          </div>
          <div>
            <img src={conslutimg} alt="Supermarket 2" className="h-64 object-cover w-full" />
          </div>
        </Carousel>
      </motion.div>

      {/* About Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-14 px-8 text-center"
      >
        <h2 className="text-4xl font-bold text-blue-700 mb-6">Welcome to Christal Supermarket</h2>
        <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
          We pride ourselves on delivering the best quality products at unbeatable prices. From fresh groceries and trendy fashion to electronics and home essentials — everything you need is under one roof.
        </p>
        <p className="mt-5 text-gray-500 font-medium">
          To enjoy a personalized shopping experience, please{" "}
          <span className="text-blue-600 font-bold">Login</span> first.
        </p>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
        }}
        className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-6"
      >
        {[
          {
            title: "Wide Product Range",
            desc: "Explore a massive collection of groceries, clothing, gadgets, and more.",
          },
          {
            title: "Fast Delivery",
            desc: "Experience lightning-fast delivery right to your doorstep.",
          },
          {
            title: "Quality Guaranteed",
            desc: "Only the best products, thoroughly checked and trusted by thousands.",
          },
        ].map((feature, idx) => (
          <motion.div
            key={idx}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="bg-white/60 backdrop-blur-lg p-8 rounded-3xl shadow-lg border border-blue-100 text-center"
          >
            <h3 className="text-2xl font-semibold text-blue-800 mb-3">{feature.title}</h3>
            <p className="text-gray-600">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.section>
    </div>
  );
};

export default Home;
