import React, { useState, useEffect } from 'react';
import { Building2, Users, MessageSquare, Mail, Phone, MapPin, Send, Eye, CheckCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { apiRequest, API_CONFIG } from '../config/api';

const AgencyPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('requests');
  const [requests, setRequests] = useState([]);
  const [clients, setClients] = useState([]);
  const [communications, setCommunications] = useState([]);
  const [travelPackages, setTravelPackages] = useState([]);

  // Sample data - in real app this would come from API
  const sampleRequests = [
    {
      id: 1,
      client: 'Marko Petrović',
      email: 'marko@example.com',
      destination: 'Grčka - Santorini',
      budget: '1500€',
      date: '2024-07-15',
      status: 'pending',
      message: 'Zanima me paket za dvoje sa polupansionom'
    },
    {
      id: 2,
      client: 'Ana Jovanović',
      email: 'ana@example.com',
      destination: 'Španija - Barcelona',
      budget: '2000€',
      date: '2024-08-20',
      status: 'processed',
      message: 'Želim kulturu i gastronomiju, 7 dana'
    },
    {
      id: 3,
      client: 'Stefan Nikolić',
      email: 'stefan@example.com',
      destination: 'Tajland - Phuket',
      budget: '1200€',
      date: '2024-09-10',
      status: 'pending',
      message: 'Avanturistićko putovanje, potapanje'
    }
  ];

  const sampleClients = [
    { name: 'Marko Petrović', email: 'marko@example.com', lastRequest: '2024-01-15', status: 'Aktivan' },
    { name: 'Ana Jovanović', email: 'ana@example.com', lastRequest: '2024-01-12', status: 'Aktivan' },
    { name: 'Stefan Nikolić', email: 'stefan@example.com', lastRequest: '2024-01-10', status: 'Pending' }
  ];

  const sampleCommunications = [
    { client: 'Marko Petrović', subject: 'Potvrda rezervacije', date: '2024-01-15', type: 'Poslato' },
    { client: 'Ana Jovanović', subject: 'Dodatne informacije', date: '2024-01-14', type: 'Primljeno' }
  ];

  useEffect(() => {
    setRequests(sampleRequests);
    setClients(sampleClients);
    setCommunications(sampleCommunications);
    loadTravelPackages();
  }, []);

  const loadTravelPackages = async () => {
    try {
      const response = await apiRequest(API_CONFIG.ENDPOINTS.TRAVEL_PACKAGES);
      setTravelPackages(response.packages || []);
    } catch (error) {
      console.error('Failed to load travel packages:', error);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    // Simple validation - in real app this would be server-side
    if (email === 'admin@golemov-put.com' && password === 'admin123') {
      setCurrentUser({ email, name: 'Admin User' });
      setIsLoggedIn(true);
    } else {
      alert('Neispravni podaci za prijavu');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  const processRequest = (requestId) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status: 'processed' } : req
    ));
    alert('Zahtev je uspešno obrađen!');
  };

  const emailClient = (email) => {
    setActiveTab('communication');
    // Focus on email form and pre-fill recipient
    setTimeout(() => {
      const emailInput = document.getElementById('email-to');
      if (emailInput) {
        emailInput.value = email;
        emailInput.focus();
      }
    }, 100);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const to = formData.get('to');
    const subject = formData.get('subject');
    const message = formData.get('message');

    alert(`Email je poslat na ${to}`);

    // Add to communications list
    const newComm = {
      client: to,
      subject: subject,
      date: new Date().toISOString().split('T')[0],
      type: 'Poslato'
    };

    setCommunications(prev => [newComm, ...prev]);
    e.target.reset();
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/20">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-tourism-primary to-tourism-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Agencijski Portal</h1>
            <p className="text-gray-600">Prijavite se da pristupite dashboard-u</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tourism-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lozinka</label>
                <input
                  type="password"
                  name="password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tourism-primary focus:border-transparent"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-tourism-primary to-tourism-secondary text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Prijavite se
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/" className="text-tourism-primary hover:text-tourism-secondary transition-colors text-sm">
              ← Povratak na početnu stranu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-tourism-primary to-tourism-secondary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <h1 className="text-xl font-bold text-gray-800">Golemov Put - Agencijski Panel</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">{currentUser?.name}</span>
              <button
                onClick={handleLogout}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-white/50 backdrop-blur-sm rounded-lg p-1 mb-8">
          {[
            { id: 'requests', label: 'Pregled zahteva', icon: Eye },
            { id: 'clients', label: 'Lista klijenata', icon: Users },
            { id: 'communication', label: 'Komunikacija', icon: MessageSquare },
            { id: 'packages', label: 'Turistički paketi', icon: Building2 }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all flex items-center justify-center space-x-2 ${
                activeTab === tab.id
                  ? 'bg-white text-tourism-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20">
          {activeTab === 'requests' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Pregled zahteva</h2>
              <div className="space-y-4">
                {requests.map(request => (
                  <div key={request.id} className="bg-white/60 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{request.client}</h3>
                        <p className="text-sm text-gray-600">{request.email}</p>
                        <p className="text-sm text-gray-700 mt-2"><strong>Destinacija:</strong> {request.destination}</p>
                        <p className="text-sm text-gray-700"><strong>Budžet:</strong> {request.budget}</p>
                        <p className="text-sm text-gray-700"><strong>Datum:</strong> {request.date}</p>
                        <p className="text-sm text-gray-700 mt-2">{request.message}</p>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          request.status === 'pending' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {request.status === 'pending' ? 'Na čekanju' : 'Obrađen'}
                        </span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => processRequest(request.id)}
                            className="text-tourism-primary hover:text-tourism-secondary text-sm flex items-center space-x-1"
                          >
                            <CheckCircle className="w-4 h-4" />
                            <span>Obradi</span>
                          </button>
                          <button
                            onClick={() => emailClient(request.email)}
                            className="text-gray-500 hover:text-gray-700 text-sm flex items-center space-x-1"
                          >
                            <Mail className="w-4 h-4" />
                            <span>Email</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'clients' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Lista klijenata</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Ime</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Email</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Poslednji zahtev</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((client, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50/50">
                        <td className="py-3 px-4">{client.name}</td>
                        <td className="py-3 px-4">{client.email}</td>
                        <td className="py-3 px-4">{client.lastRequest}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            client.status === 'Aktivan' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {client.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'communication' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Komunikacija</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Pošaljite email</h3>
                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Prima</label>
                      <input
                        type="email"
                        name="to"
                        id="email-to"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tourism-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Naslov</label>
                      <input
                        type="text"
                        name="subject"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tourism-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Poruka</label>
                      <textarea
                        name="message"
                        rows="6"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tourism-primary focus:border-transparent"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-tourism-primary to-tourism-secondary text-white py-2 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Pošaljite email</span>
                    </button>
                  </form>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Poslednje komunikacije</h3>
                  <div className="space-y-3">
                    {communications.map((comm, index) => (
                      <div key={index} className="bg-white/60 rounded-lg p-3 border border-gray-200">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium text-gray-800">{comm.subject}</h4>
                            <p className="text-sm text-gray-600">{comm.client}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-500">{comm.date}</p>
                            <span className={`text-xs px-2 py-1 rounded ${
                              comm.type === 'Poslato' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {comm.type}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'packages' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Turistički paketi</h2>
              {travelPackages.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {travelPackages.map(pkg => (
                    <div key={pkg.id} className="bg-white/60 rounded-lg p-4 border border-gray-200">
                      <h3 className="font-semibold text-gray-800 mb-2">{pkg.title || 'Bez naslova'}</h3>
                      <p className="text-sm text-gray-600 mb-3">{pkg.description || 'Nema opisa'}</p>
                      {pkg.destinations && pkg.destinations.length > 0 && (
                        <div className="mb-2">
                          <span className="text-xs font-medium text-gray-500">Destinacije:</span>
                          <p className="text-sm text-gray-700">{pkg.destinations.join(', ')}</p>
                        </div>
                      )}
                      {pkg.duration_days && (
                        <div className="mb-2">
                          <span className="text-xs font-medium text-gray-500">Trajanje:</span>
                          <p className="text-sm text-gray-700">{pkg.duration_days} dana</p>
                        </div>
                      )}
                      <div className="text-xs text-gray-400">
                        Otpremljeno: {new Date(pkg.created_at).toLocaleDateString('sr-RS')}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Nema otpremljenih turističkih paketa</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AgencyPage;