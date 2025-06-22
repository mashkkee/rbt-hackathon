import React from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-tourism-primary to-tourism-secondary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <span className="text-2xl font-display font-bold">Golemov Put</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Vaš pouzdani partner za nezaboravna putovanja. Otkrijte svet sa nama i stvorite uspomene koje će trajati ceo život.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Brze veze</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Početna</Link></li>
              <li><a href="#destinations" className="text-gray-300 hover:text-white transition-colors">Destinacije</a></li>
              <li><Link to="/chat" className="text-gray-300 hover:text-white transition-colors">AI Asistent</Link></li>
              <li><a href="#about" className="text-gray-300 hover:text-white transition-colors">O nama</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors">Kontakt</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Usluge</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Individualna putovanja</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Grupna putovanja</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Poslovni turizam</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Avanturistički turizam</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Kulturni turizam</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Wellness putovanja</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Kontakt</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-tourism-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-300">Sestovski Potok bb</p>
                  <p className="text-gray-300">36300 Novi Pazar, Srbija</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-tourism-primary" />
                <p className="text-gray-300">+381 60 4325324</p>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 Golemov Put. Sva prava zadržana.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;