
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin, Twitter, Globe, ArrowLeft, Share2 } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const { slug } = router.query;
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      // Charger les contacts depuis localStorage
      const savedContacts = localStorage.getItem('contacts');
      if (savedContacts) {
        const contacts = JSON.parse(savedContacts);
        const foundContact = contacts.find(c => c.slug === slug);
        setContact(foundContact);
      }
      setLoading(false);
    }
  }, [slug]);

  const handleShare = async () => {
    const url = window.location.href;
    const text = `Découvrez le profil de ${contact.name} - ${contact.title}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Profil de ${contact.name}`,
          text: text,
          url: url,
        });
      } catch (error) {
        // Fallback vers le clipboard
        copyToClipboard(url);
      }
    } else {
      copyToClipboard(url);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Lien copié dans le presse-papiers !');
    }).catch(() => {
      alert('Impossible de copier le lien');
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  if (!contact) {
    return (
      <>
        <Head>
          <title>Profil introuvable - Cartes de Visite</title>
          <meta name="description" content="Ce profil n'existe pas ou a été supprimé" />
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">😕</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Profil introuvable</h1>
            <p className="text-gray-600 mb-8">Ce profil n'existe pas ou a été supprimé</p>
            <Link 
              href="/"
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{contact.name} - {contact.title || 'Profil professionnel'}</title>
        <meta name="description" content={contact.bio || `Découvrez le profil professionnel de ${contact.name}`} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="profile" />
        <meta property="og:title" content={`${contact.name} - ${contact.title || 'Profil professionnel'}`} />
        <meta property="og:description" content={contact.bio || `Découvrez le profil professionnel de ${contact.name}`} />
        <meta property="og:image" content={contact.photo || '/default-avatar.jpg'} />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_BASE_URL || ''}/profile/${contact.slug}`} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${contact.name} - ${contact.title || 'Profil professionnel'}`} />
        <meta name="twitter:description" content={contact.bio || `Découvrez le profil professionnel de ${contact.name}`} />
        <meta name="twitter:image" content={contact.photo || '/default-avatar.jpg'} />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": contact.name,
              "jobTitle": contact.title,
              "email": contact.email,
              "telephone": contact.phone,
              "address": contact.location,
              "url": contact.website,
              "image": contact.photo,
              "description": contact.bio,
              "sameAs": [
                contact.linkedin && `https://linkedin.com/in/${contact.linkedin}`,
                contact.twitter && `https://twitter.com/${contact.twitter}`,
                contact.website
              ].filter(Boolean)
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Navigation */}
        <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link 
                href="/"
                className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors font-medium"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Link>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Partager
              </button>
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Header avec gradient */}
            <div className="h-40 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 relative">
              <div className="absolute inset-0 bg-black opacity-10"></div>
            </div>
            
            {/* Contenu principal */}
            <div className="px-8 pb-8 relative">
              {/* Photo de profil */}
              <div className="flex justify-center -mt-20 mb-6">
                <div className="relative">
                  <img
                    src={contact.photo || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face'}
                    alt={contact.name}
                    className="w-40 h-40 rounded-full border-6 border-white shadow-2xl object-cover"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face';
                    }}
                  />
                </div>
              </div>

              {/* Informations principales */}
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{contact.name}</h1>
                {contact.title && (
                  <p className="text-xl text-indigo-600 font-medium mb-3">{contact.title}</p>
                )}
                {contact.location && (
                  <p className="text-gray-600 flex items-center justify-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    {contact.location}
                  </p>
                )}
              </div>

              {/* Bio */}
              {contact.bio && (
                <div className="mb-8 max-w-3xl mx-auto">
                  <div className="bg-gray-50 p-6 rounded-2xl">
                    <p className="text-gray-700 leading-relaxed text-center text-lg">{contact.bio}</p>
                  </div>
                </div>
              )}

              {/* Contact et réseaux */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 border border-blue-100 group"
                  >
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <p className="text-blue-600 break-all">{contact.email}</p>
                    </div>
                  </a>
                )}
                
                {contact.phone && (
                  <a
                    href={`tel:${contact.phone}`}
                    className="flex items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl hover:from-green-100 hover:to-emerald-100 transition-all duration-200 border border-green-100 group"
                  >
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Téléphone</p>
                      <p className="text-green-600">{contact.phone}</p>
                    </div>
                  </a>
                )}
                
                {contact.website && (
                  <a
                    href={contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl hover:from-purple-100 hover:to-pink-100 transition-all duration-200 border border-purple-100 group"
                  >
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Site web</p>
                      <p className="text-purple-600">Visiter</p>
                    </div>
                  </a>
                )}
                
                {contact.linkedin && (
                  <a
                    href={`https://linkedin.com/in/${contact.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl hover:from-blue-100 hover:to-cyan-100 transition-all duration-200 border border-blue-100 group"
                  >
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                      <Linkedin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">LinkedIn</p>
                      <p className="text-blue-600">Se connecter</p>
                    </div>
                  </a>
                )}

                {contact.twitter && (
                  <a
                    href={`https://twitter.com/${contact.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 bg-gradient-to-r from-sky-50 to-blue-50 rounded-2xl hover:from-sky-100 hover:to-blue-100 transition-all duration-200 border border-sky-100 group"
                  >
                    <div className="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                      <Twitter className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Twitter</p>
                      <p className="text-sky-600">Suivre</p>
                    </div>
                  </a>
                )}
              </div>

              {/* Footer */}
              <div className="mt-8 text-center">
                <div className="inline-block bg-gray-100 px-4 py-2 rounded-lg">
                  <p className="text-sm text-gray-600">
                    Carte de visite numérique créée avec ❤️
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
