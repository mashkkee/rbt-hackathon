import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-200/50' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-tourism-primary to-tourism-secondary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <span className={`text-2xl font-display font-bold transition-colors ${
              isScrolled ? 'text-gray-800' : 'text-white'
            }`}>
              Golemov Put
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#destinations" 
              className={`font-medium transition-colors hover:text-tourism-secondary ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Destinacije
            </a>
            <a 
              href="#packages" 
              className={`font-medium transition-colors hover:text-tourism-secondary ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Paketi
            </a>
            <a 
              href="#about" 
              className={`font-medium transition-colors hover:text-tourism-secondary ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              O nama
            </a>
            <a 
              href="#contact" 
              className={`font-medium transition-colors hover:text-tourism-secondary ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Kontakt
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/chat"
              className="flex items-center space-x-2 bg-tourism-primary hover:bg-tourism-primary-dark text-white px-4 py-2 rounded-full transition-colors font-medium"
            >
              <MessageCircle className="w-4 h-4" />
              <span>AI Asistent</span>
            </Link>
            <Link 
              to="/agency"
              className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-2 rounded-full transition-colors font-medium border border-white/30"
            >
              <Building2 className="w-4 h-4" />
              <span>Agencija</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'
            }`}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-200/50 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              <a href="#destinations" className="block text-gray-700 font-medium hover:text-tourism-secondary transition-colors">
                Destinacije
              </a>
              <a href="#packages" className="block text-gray-700 font-medium hover:text-tourism-secondary transition-colors">
                Paketi
              </a>
              <a href="#about" className="block text-gray-700 font-medium hover:text-tourism-secondary transition-colors">
                O nama
              </a>
              <a href="#contact" className="block text-gray-700 font-medium hover:text-tourism-secondary transition-colors">
                Kontakt
              </a>
              <div className="pt-4 space-y-3">
                <Link 
                  to="/chat"
                  className="flex items-center space-x-2 bg-tourism-primary text-white px-4 py-3 rounded-lg font-medium w-full justify-center"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>AI Asistent</span>
                </Link>
                <Link 
                  to="/agency"
                  className="flex items-center space-x-2 border border-tourism-primary text-tourism-primary px-4 py-3 rounded-lg font-medium w-full justify-center"
                >
                  <Building2 className="w-4 h-4" />
                  <span>Agencija</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;