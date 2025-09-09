import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Linkedin, Twitter, Globe, Plus, Edit3, Trash2, Eye, Lock, Unlock, Save, X } from 'lucide-react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const [contacts, setContacts] = useState([]);
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedContact, setSelectedContact] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    photo: '',
    website: '',
    linkedin: '',
    twitter: ''
  });

  // Charger les données depuis localStorage
  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    const savedAuth = localStorage.getItem('isAuthenticated');
    
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    } else {
      // Données de démonstration par défaut
      const demoContacts = [
        {
          id: 1,
          name: 'Marie Dubois',
          title: 'Développeuse Frontend',
          email: 'marie@example.com',
          phone: '+33 6 12 34 56 78',
          location: 'Paris, France',
          bio: 'Passionnée par React et l\'UX/UI. 3 ans d\'expérience dans le développement web moderne.',
          photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b1e5?w=300&h=300&fit=crop&crop=face',
          website: 'https://mariedubois.dev',
          linkedin: 'marie-dubois-dev',
          twitter: 'marie_codes',
          slug: 'marie-dubois'
        },
        {
          id: 2,
          name: 'Thomas Martin',
          title: 'Designer UX/UI',
          email: 'thomas@design.com',
          phone: '+33 7 98 76 54 32',
          location: 'Lyon, France',
          bio: 'Designer créatif spécialisé dans les interfaces mobiles et web. J\'adore créer des expériences utilisateur mémorables.',
          photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
          website: 'https://thomasdesign.fr',
          linkedin: 'thomas-martin-ux',
          twitter: 'thomas_design',
          slug: 'thomas-martin'
        }
      ];
      setContacts(demoContacts);
      localStorage.setItem('contacts', JSON.stringify(demoContacts));
    }
    
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Sauvegarder les contacts dans localStorage
  useEffect(() => {
    if (contacts.length > 0) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  // Sauvegarder l'état d'authentification
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
  }, [isAuthenticated]);

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      title: '',
      email: '',
      phone: '',
      location: '',
      bio: '',
      photo: '',
      website: '',
      linkedin: '',
      twitter: ''
    });
    setSelectedContact(null);
  };

  const handleLogin = () => {
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('Mot de passe incorrect !');
    }
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      alert('Le nom est obligatoire !');
      return;
    }

    const slug = generateSlug(formData.name);
    
    if (selectedContact) {
      // Modification
      setContacts(prev => prev.map(contact => 
        contact.id === selectedContact.id 
          ? { ...formData, id: selectedContact.id, slug }
          : contact
      ));
    } else {
      // Création
      const newContact = {
        ...formData,
        id: Date.now(),
        slug
      };
      setContacts(prev => [...prev, newContact]);
    }
    
    resetForm();
    setCurrentView('dashboard');
  };

  const handleEdit = (contact) => {
    setSelectedContact(contact);
    setFormData({ ...contact });
    setCurrentView('form');
  };

  const handleDelete = (id) => {
    if (window.confirm('Supprimer ce contact ?')) {
      setContacts(prev => prev.filter(contact => contact.id !== id));
    }
  };

  const viewProfile = (contact) => {
    // Redirection vers la page publique
    router.push(`/profile/${contact.slug}`);
  };

  // Page de connexion
  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>Connexion - Cartes de Visite</title>
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md border border-gray-100">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <User className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Cartes de Visite</h1>
              <p className="text-gray-600">Gérez vos contacts professionnels</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <input
                  type="password"
                  placeholder="Entrez votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 transition-colors text-lg"
                />
              </div>
              
              <button
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-xl hover:shadow-lg transition-all duration-200 font-semibold text-lg"
              >
                Se connecter
              </button>
              
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-sm text-gray-600 text-center">
                  🔑 <strong>Demo :</strong> admin123
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Formulaire
  if (currentView === 'form') {
    return (
      <>
        <Head>
          <title>{selectedContact ? 'Modifier' : 'Nouveau'} Contact - Cartes de Visite</title>
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                  {selectedContact ? 'Modifier le contact' : 'Nouveau contact'}
                </h2>
                <button
                  onClick={() => {
                    resetForm();
                    setCurrentView('dashboard');
                  }}
                  className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Nom et titre */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 transition-colors"
                      placeholder="Ex: Marie Dubois"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Titre / Profession
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 transition-colors"
                      placeholder="Ex: Développeuse Frontend"
                    />
                  </div>
                </div>

                {/* Contact */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 transition-colors"
                      placeholder="marie@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 transition-colors"
                      placeholder="+33 6 12 34 56 78"
                    />
                  </div>
                </div>

                {/* Localisation */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Localisation
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 transition-colors"
                    placeholder="Paris, France"
                  />
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio / Description
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    rows={4}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 transition-colors resize-none"
                    placeholder="Décrivez votre expertise, vos passions..."
                  />
                </div>

                {/* Photo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Photo (URL)
                  </label>
                  <input
                    type="url"
                    value={formData.photo}
                    onChange={(e) => setFormData({...formData, photo: e.target.value})}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 transition-colors"
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>

                {/* Réseaux sociaux */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Site web
                    </label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({...formData, website: e.target.value})}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 transition-colors"
                      placeholder="https://monsite.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      LinkedIn (nom d'utilisateur)
                    </label>
                    <input
                      type="text"
                      value={formData.linkedin}
                      onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 transition-colors"
                      placeholder="marie-dubois"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Twitter (nom d'utilisateur)
                    </label>
                    <input
                      type="text"
                      value={formData.twitter}
                      onChange={(e) => setFormData({...formData, twitter: e.target.value})}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 transition-colors"
                      placeholder="marie_dev"
                    />
                  </div>
                </div>

                {/* Boutons */}
                <div className="flex gap-4 pt-6">
                  <button
                    onClick={handleSave}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-xl hover:shadow-lg transition-all duration-200 font-semibold flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    {selectedContact ? 'Sauvegarder' : 'Créer le contact'}
                  </button>
                  <button
                    onClick={() => {
                      resetForm();
                      setCurrentView('dashboard');
                    }}
                    className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Dashboard principal
  return (
    <>
      <Head>
        <title>Dashboard - Cartes de Visite</title>
        <meta name="description" content="Gérez vos contacts et créez des cartes de visite élégantes" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Cartes de Visite</h1>
              <p className="text-xl text-gray-600">Gérez vos contacts et créez des profils élégants</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  resetForm();
                  setCurrentView('form');
                }}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center gap-2 font-semibold"
              >
                <Plus className="w-5 h-5" />
                Nouveau contact
              </button>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="bg-gray-600 text-white px-6 py-3 rounded-xl hover:bg-gray-700 transition-colors flex items-center gap-2 font-semibold"
              >
                <Lock className="w-5 h-5" />
                Déconnexion
              </button>
            </div>
          </div>

          {/* Liste des contacts */}
          {contacts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="w-12 h-12 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Aucun contact</h3>
              <p className="text-gray-600 mb-8 text-lg">Commencez par créer votre premier contact</p>
              <button
                onClick={() => setCurrentView('form')}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-200 font-semibold"
              >
                Créer un contact
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contacts.map((contact) => (
                <div key={contact.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden border border-gray-100">
                  <div className="p-6">
                    {/* Header avec photo */}
                    <div className="flex items-center mb-4">
                      <img
                        src={contact.photo || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'}
                        alt={contact.name}
                        className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-gray-200"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 text-lg truncate">{contact.name}</h3>
                        <p className="text-indigo-600 font-medium truncate">{contact.title}</p>
                      </div>
                    </div>
                    
                    {/* Infos de contact */}
                    <div className="space-y-2 mb-6">
                      {contact.email && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="truncate">{contact.email}</span>
                        </div>
                      )}
                      {contact.phone && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="w-4 h-4 mr-2 text-gray-400" />
                          <span>{contact.phone}</span>
                        </div>
                      )}
                      {contact.location && (
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="truncate">{contact.location}</span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => viewProfile(contact)}
                        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors font-medium"
                      >
                        <Eye className="w-4 h-4" />
                        Voir profil
                      </button>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(contact)}
                          className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(contact.id)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
