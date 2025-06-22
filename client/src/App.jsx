// App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import FeaturedDestinations from "./components/FeaturedDestinations";
import Footer from "./components/Footer";
import ChatPage from "./pages/ChatPage";
import AgencyPage from "./pages/AgencyPage";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import "./index.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate app loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-tourism flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl font-medium">Učitavanje...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Header /> {/* Moved Header outside Routes to render on all pages */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <FeaturedDestinations />
                <Footer />
              </>
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/chat/:title" element={<ChatPage />} />
          <Route path="/agency" element={<AgencyPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
