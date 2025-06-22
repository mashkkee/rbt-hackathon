// src/components/Recenzije.jsx
import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { apiRequest, API_CONFIG } from "../config/api";
import { getImageForCity } from "../api/image";

const Recenzije = () => {
  const [reviews, setReviews] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const particlesRef = useRef(null);

  const randomColor = () =>
    ["#2563eb", "#dc2626", "#059669", "#7c3aed", "#f59e0b"][
      Math.floor(Math.random() * 5)
    ];

  const randomRating = () => (Math.random() * (5 - 4) + 4).toFixed(1);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await apiRequest(API_CONFIG.ENDPOINTS.TRAVEL_PACKAGES);
        const shuffled = data.packages
          .sort(() => 0.5 - Math.random())
          .slice(0, 5);

        const withImages = await Promise.all(
          shuffled.map(async (pkg) => {
            const image = await getImageForCity(
              pkg.destinations?.[0] || pkg.title || "travel"
            );
            return {
              id: pkg.id,
              destination: pkg.title,
              reviewText: pkg.description, // Koristimo description kao tekst recenzije
              country: pkg.destinations?.join(", ") || "Nepoznato",
              rating: randomRating(), // Generišemo ocenu jer API možda nema ovo polje
              image:
                image || "https://via.placeholder.com/1920x1080?text=Recenzija",
              color: randomColor(),
            };
          })
        );

        setReviews(withImages);
        setIsLoaded(true);
      } catch (err) {
        console.error("Greška pri učitavanju recenzija:", err);
      }
    };

    loadReviews();
  }, []);

  useEffect(() => {
    if (!isLoaded || reviews.length === 0) return;

    if (window.particlesJS) {
      window.particlesJS("particles-js-reviews", {
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

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isLoaded, reviews]);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % reviews.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + reviews.length) % reviews.length);

  if (!isLoaded || reviews.length === 0) {
    return (
      <div className="text-white text-center py-20">
        Učitavanje recenzija...
      </div>
    );
  }

  const currentReview = reviews[currentSlide];

  return (
    <section className="relative min-h-[60vh] overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      <div id="particles-js-reviews" className="absolute inset-0"></div>

      <div className="absolute inset-0">
        {reviews.map((review, index) => (
          <div
            key={review.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
          >
            <img
              src={review.image}
              alt={review.destination}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30"></div>
          </div>
        ))}
      </div>

      <div className="relative z-10 flex items-center min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
            Šta Kažu Naši{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse">
              Putnici
            </span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="transform transition-all duration-1000 translate-x-0 opacity-100">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center space-x-2 mb-4">
                  <MapPin
                    className="w-5 h-5"
                    style={{ color: currentReview.color }}
                  />
                  <span className="text-gray-300 font-medium">
                    {currentReview.country}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {currentReview.destination}
                </h3>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(currentReview.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-400"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-gray-300">
                    {currentReview.rating}/5
                  </span>
                </div>
                <p className="text-gray-300 italic mb-6">
                  "{currentReview.reviewText}"
                </p>
                <Link
                  to={`/chat/${currentReview.destination}`}
                  className="px-6 py-3 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg transform hover:scale-105"
                  style={{ backgroundColor: currentReview.color }}
                >
                  Rezerviši slično putovanje
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <img
                src={currentReview.image}
                alt={currentReview.destination}
                className="rounded-3xl w-full h-64 object-cover shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full border border-white/20 hover:border-white/40 transition-all duration-300 flex items-center justify-center group"
      >
        <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full border border-white/20 hover:border-white/40 transition-all duration-300 flex items-center justify-center group"
      >
        <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? "w-8 h-3 bg-white"
                : "w-3 h-3 bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / reviews.length) * 100}%` }}
        />
      </div>
    </section>
  );
};

export default Recenzije;
