'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ShoppingCart, BookOpen, LogOut } from 'lucide-react';

interface Document {
  id: string;
  title: string;
  author: string;
  faculty: string;
  category: string;
  price: number;
  likes: number;
  downloads: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isAdmin: boolean;
}

const FACULTIES = ['Tous', 'Droit', 'Médecine', 'Polytechnique', 'Sciences', 'Lettres', 'Économie'];

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState('Tous');
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filteredDocs, setFilteredDocs] = useState<Document[]>([]);
  const [cart, setCart] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    let filtered = documents;

    if (selectedFaculty !== 'Tous') {
      filtered = filtered.filter((doc) => doc.faculty === selectedFaculty);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (doc) =>
          doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredDocs(filtered);
  }, [searchQuery, selectedFaculty, documents]);

  const handleAddToCart = (docId: string) => {
    if (!cart.includes(docId)) {
      setCart([...cart, docId]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  const handleAdminAccess = () => {
    if (user?.isAdmin) {
      router.push('/admin');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <p className="text-white">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 border-b border-blue-500/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-blue-400" />
            <h1 className="text-2xl font-bold text-white">EduLib RDC</h1>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-gray-300 text-sm">{user.name}</span>
                {user.isAdmin && (
                  <button
                    onClick={handleAdminAccess}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm font-medium"
                  >
                    Admin
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-blue-400 hover:text-blue-300 transition font-medium"
                >
                  Connexion
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  S'inscrire
                </Link>
              </>
            )}
            <Link href="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-blue-400 hover:text-blue-300 transition" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Réussir vos études, c'est notre mission</h2>
          <p className="text-blue-200 text-lg">
            Accédez aux meilleures ressources pédagogiques de la RDC. Syllabus, notes de cours, exercices corrigés.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 relative">
          <Search className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un document, un cours, un professeur..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-700 text-white rounded-lg border border-blue-500/30 focus:border-blue-500 focus:outline-none transition"
          />
        </div>

        {/* Faculty Filter */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {FACULTIES.map((faculty) => (
            <button
              key={faculty}
              onClick={() => setSelectedFaculty(faculty)}
              className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${
                selectedFaculty === faculty
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              {faculty}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          <div className="bg-slate-800/50 border border-blue-500/20 rounded-lg p-6 text-center">
            <BookOpen className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{documents.length}</p>
            <p className="text-gray-400 text-sm">Documents disponibles</p>
          </div>
          <div className="bg-slate-800/50 border border-blue-500/20 rounded-lg p-6 text-center">
            <p className="text-2xl font-bold text-white">5000+</p>
            <p className="text-gray-400 text-sm">Étudiants inscrits</p>
          </div>
          <div className="bg-slate-800/50 border border-blue-500/20 rounded-lg p-6 text-center">
            <p className="text-2xl font-bold text-white">100%</p>
            <p className="text-gray-400 text-sm">Gratuit et sécurisé</p>
          </div>
        </div>

        {/* Documents Section */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-6">Tous les documents</h3>

          {filteredDocs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">Aucun document trouvé</p>
              <p className="text-gray-500 text-sm mt-2">Essayez de modifier vos critères de recherche</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-slate-800/50 border border-blue-500/20 rounded-lg overflow-hidden hover:border-blue-500/50 transition"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">{doc.category}</span>
                      <span className="text-lg font-bold text-blue-400">${doc.price}</span>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">{doc.title}</h4>
                    <p className="text-sm text-gray-400 mb-4">Par {doc.author}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                      <span>👍 {doc.likes}</span>
                      <span>⬇️ {doc.downloads}</span>
                    </div>
                    <button
                      onClick={() => handleAddToCart(doc.id)}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
                    >
                      Ajouter au panier
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800/50 border-t border-blue-500/20 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-400">
          <p>© 2025 EduLib RDC. Tous droits réservés.</p>
          <p className="text-sm mt-2">Plateforme de ressources pédagogiques pour la République Démocratique du Congo</p>
        </div>
      </footer>
    </div>
  );
}
