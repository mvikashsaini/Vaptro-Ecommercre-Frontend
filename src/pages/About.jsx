import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-20">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-8">

        <h1 className="text-4xl font-bold text-center">About Vaptro</h1>

        <p className="text-gray-700 text-lg">
          Welcome to <span className="font-semibold text-red-600">Vaptro</span> – your next-generation online shopping platform.  
          We deliver a seamless e-commerce experience with carefully selected products, secure checkout, and fast delivery – all designed to make online shopping easier and smarter.
        </p>

        {/* Mission */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-red-600">Our Mission</h2>
          <p className="text-gray-700 text-base text-lg">
            Vaptro’s mission is to provide a **trusted marketplace for quality products** with transparent pricing and smooth customer experience.  
            We aim to serve all types of shoppers – from everyday buyers to trend-focused customers – by offering variety, speed, and reliability.
          </p>
        </div>

        {/* Why choose */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-red-600">Why Shop with Vaptro?</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 text-lg">
            <li>Huge collection of products across multiple categories</li>
            <li>Verified sellers and **genuine quality assurance**</li>
            <li>Fast and secure delivery network</li>
            <li>Safe payments including UPI, Cards, Wallets, and COD</li>
            <li>24/7 responsive customer support</li>
            <li>Simple returns, easy refunds, and buyer-focused policies</li>
          </ul>
        </div>

        {/* Vision */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-red-600">Our Vision</h2>
          <p className="text-gray-700 text-base text-lg">
            We envision Vaptro as a platform where shopping becomes **personal, fast, and hassle-free**.  
            A store powered by innovation, built for people, focused on trust – delivering value with every purchase.
          </p>
        </div>

        {/* Community */}
        <div className="text-center mt-10">
          <h3 className="text-xl font-semibold text-red-600 mb-2">Be a Part of Vaptro</h3>
          <p className="text-gray-700 mb-4 text-lg">
            Shopping is not just buying – it's discovering what fits your life.  
            Vaptro is here to make every product search, every comparison, and every checkout feel effortless and rewarding.
          </p>

          <Link to="/products">
            <button className="bg-red-600 text-white px-6 py-2 rounded-xl hover:bg-red-700 transition duration-300 cursor-pointer text-lg font-medium">
              Explore Store
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default About;
