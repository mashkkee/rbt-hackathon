// Contact.jsx
import React, { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Link } from "react-router-dom";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for form submission logic
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  useEffect(() => {
    if (window.particlesJS) {
      window.particlesJS("particles-js", {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: "#ffffff" },
          shape: { type: "circle" },
          opacity: {
            value: 0.1,
            random: true,
            anim: { enable: true, speed: 1, opacity_min: 0.05, sync: false },
          },
          size: {
            value: 3,
            random: true,
            anim: { enable: true, speed: 2, size_min: 0.1, sync: false },
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.05,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            out_mode: "out",
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
            resize: true,
          },
          modes: {
            repulse: { distance: 200, duration: 0.4 },
            push: { particles_nb: 4 },
          },
        },
        retina_detect: true,
      });
    }
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      <div id="particles-js" className="absolute inset-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Kontaktirajte{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse">
              Nas
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Imate pitanja ili želite da planirate svoje sledeće putovanje? Naš
            tim je tu da vam pomogne!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-500">
            <h2 className="text-2xl font-bold text-white mb-6">
              Pošaljite Poruku
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2" htmlFor="name">
                  Ime
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2" htmlFor="message">
                  Poruka
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  rows="5"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg transform hover:scale-105"
              >
                <Send className="w-5 h-5 mr-2" />
                Pošalji
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-500">
            <h2 className="text-2xl font-bold text-white mb-6">
              Naše Informacije
            </h2>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Mail className="w-6 h-6 text-blue-400" />
                <span className="text-gray-300">info@golemovput.com</span>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="w-6 h-6 text-purple-400" />
                <span className="text-gray-300">+381 123 456 789</span>
              </div>
              <div className="flex items-center space-x-4">
                <MapPin className="w-6 h-6 text-green-400" />
                <span className="text-gray-300">
                  Ulica Putovanja 123, Beograd, Srbija
                </span>
              </div>
            </div>
            <div className="mt-8">
              <Link
                to="/chat"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-400 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg transform hover:scale-105"
              >
                Zakažite konsultaciju
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
