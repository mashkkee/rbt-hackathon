import React, { useEffect, useState } from 'react';
import { MapPin, Star, Clock, ArrowRight } from 'lucide-react';
import { API_CONFIG, apiRequest } from '../config/api';
import { getImageForCity } from '../api/image';
import { Link } from 'react-router-dom';

const FeaturedDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await apiRequest(API_CONFIG.ENDPOINTS.TRAVEL_PACKAGES);

        const destinationsWithImages = await Promise.all(
          data.packages.map(async (pkg) => {
            const city = pkg.title || pkg.destinations?.[0] || "travel";
            const imageUrl = await getImageForCity(city);
            if (!pkg.title) return null
            return {
              id: pkg.id,
              title: pkg.title || 'Nepoznata destinacija',
              country: pkg.destinations?.[0] || 'Nepoznata zemlja',
              image: imageUrl || 'https://via.placeholder.com/600x400?text=Destinacija',
              rating: 4.8,
              duration: `${pkg.duration_days || 0} dana`,
              price: pkg.dates?.[0]?.price_regular ? `${pkg.dates[0].price_regular}€` : 'Cena na upit',
              description: pkg.description || '',
              features: pkg.highlights || []
            };
          })
        );

        setDestinations(destinationsWithImages);
      } catch (error) {
        console.error("Greška pri učitavanju destinacija:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  if (loading) return <div className="text-center py-20">Učitavanje destinacija...</div>;

  return (
    <section id="destinations" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-800 mb-6">
            Istaknute destinacije
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Otkrijte najlepše destinacije sveta koje smo pažljivo odabrali za vas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => {
            if (destination == null) {
              return <></>
            }
            return <div
              key={destination.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
            >
              <div className="relative overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-semibold">{destination.rating}</span>
                </div>
                {
                  destination.price == "Cena na upit" ? "" : <div className="absolute bottom-4 left-4 bg-gradient-to-r from-tourism-primary to-tourism-secondary text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {destination.price}
                  </div>
                }
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-tourism-primary" />
                    <span className="text-sm text-gray-600">{destination.country}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{destination.duration}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-3">{destination.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{destination.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {destination.features.map((feature, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <Link key={destination.id} to={`/chat/${destination.title.replaceAll(' ', '-')}`} className="w-full bg-gradient-to-r from-tourism-primary to-tourism-secondary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 group">
                  <span>Saznajte više</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          })}
        </div>

        <div className="text-center mt-12">
          <button className="bg-white border-2 border-tourism-primary text-tourism-primary px-8 py-3 rounded-full font-semibold hover:bg-tourism-primary hover:text-white transition-colors">
            Pogledajte sve destinacije
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
