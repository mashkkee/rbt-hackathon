// AboutUs.jsx
import React, { useEffect } from "react";
import { Users, Star, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const AboutUs = () => {
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
            O{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse">
              Nama
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Golemov Put je vaš partner za nezaboravna putovanja, posvećen
            stvaranju jedinstvenih iskustava širom sveta.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Mission Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-500">
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">Naša Misija</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Inspirisati i omogućiti putnicima da otkriju svet kroz autentična
              i pažljivo osmišljena putovanja. Posvećeni smo pružanju vrhunske
              usluge i personalizovanih iskustava.
            </p>
          </div>

          {/* Team Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-500">
            <div className="flex items-center space-x-2 mb-4">
              <Users className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold text-white">Naš Tim</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Naš tim stručnjaka za putovanja, vodiča i planera radi zajedno
              kako bi osigurao da svako putovanje bude savršeno. Sa strašću
              prema avanturi, mi smo tu za vas.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 hover:bg-white/20">
            <div className="text-3xl font-bold text-white mb-1">50+</div>
            <div className="text-sm text-gray-400">Destinacija</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 hover:bg-white/20">
            <div className="text-3xl font-bold text-white mb-1">10k+</div>
            <div className="text-sm text-gray-400">Zadovoljnih klijenata</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 hover:bg-white/20">
            <div className="text-3xl font-bold text-white mb-1">4.9</div>
            <div className="text-sm text-gray-400 flex items-center justify-center">
              Prosečna ocena <Star className="w-4 h-4 ml-1 text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            to="/chat"
            className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
          >
            Započnite svoje putovanje
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
