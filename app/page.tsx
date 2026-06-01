'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, BookOpen, Users, Zap } from 'lucide-react';

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

const FACULTIES = ['Tous', 'Droit', 'Médecine', 'Polytechnique', 'Sciences', 'Lettres', 'Économie'];

const SAMPLE_DOCUMENTS: Document[] = [
  {
    id: '1',
    title: 'Droit Civil - Syllabus Complet',
    author: 'Prof. Jean Kasongo',
    faculty: 'Droit',
    category: 'Syllabus',
    price: 5,
    likes: 234,
    downloads: 1205,
  },
  {
    id: '2',
    title: 'Anatomie Humaine - Notes de Cours',
    author: 'Dr. Marie Mbuyi',
    faculty: 'Médecine',
    category: 'Notes',
    price: 8,
    likes: 456,
    downloads: 2341,
  },
  {
    id: '3',
    title: 'Mathématiques Avancées - Exercices',
    author: 'Prof. Pierre Tshimanga',
    faculty: 'Polytechnique',
    category: 'Exercices',
    price: 3,
    likes: 189,
    downloads: 890,
  },
  {
    id: '4',
    title: 'Biologie Générale - Ouvrage Complet',
    author: 'Prof. Sophie Ndombele',
    faculty: 'Sciences',
    category: 'Ouvrage',
    price: 10,
    likes: 567,
    downloads: 3456,
  },
  {
    id: '5',
    title: 'Littérature Africaine - Analyse',
    author: 'Prof. Laurent Kabila',
    faculty: 'Lettres',
    category: 'Notes',
    price: 4,
    likes: 123,
    downloads: 567,
  },
  {
    id: '6',
    title: 'Économie Politique - Syllabus',
    author: 'Prof. Alain Tshikala',
    faculty: 'Économie',
    category: 'Syllabus',
    price: 6,
    likes: 345,
    downloads: 1678,
  },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState('Tous');
  const [filteredDocs, setFilteredDocs] = useState<Document[]>(SAMPLE_DOCUMENTS);
  const [cart, setCart] = useState<string[]>([]);

  useEffect(() => {
    let filtered = SAMPLE_DOCUMENTS;

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
  }, [searchQuery, selectedFaculty]);

  const addToCart = (docId: string) => {
    setCart([...cart, docId]);
    alert('Document ajouté au panier!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-blue-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-blue-400" />
            <h1 className="text-2xl font-bold text-white">EduLib RDC</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="text-gray-300 hover:text-white transition">
              Connexion
            </Link>
            <Link href="/auth/signup" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              S'inscrire
            </Link>
            <div className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-300 cursor-pointer hover:text-white transition" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Réussir vos études, <span className="text-blue-400">c'est notre mission</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Accédez aux meilleures ressources pédagogiques de la RDC. Syllabus, notes de cours, exercices corrigés.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher un document, un cours, un professeur..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-800 text-white rounded-lg border border-blue-500/30 focus:border-blue-500 focus:outline-none transition"
            />
          </div>

          {/* Faculty Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {FACULTIES.map((faculty) => (
              <button
                key={faculty}
                onClick={() => setSelectedFaculty(faculty)}
                className={`px-4 py-2 rounded-lg transition ${
                  selectedFaculty === faculty
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                }`}
              >
                {faculty}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
          <div className="bg-slate-800/50 border border-blue-500/20 rounded-lg p-6 text-center">
            <BookOpen className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-3xl font-bold text-white">{SAMPLE_DOCUMENTS.length}</p>
            <p className="text-gray-400">Documents disponibles</p>
          </div>
          <div className="bg-slate-800/50 border border-blue-500/20 rounded-lg p-6 text-center">
            <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-3xl font-bold text-white">5000+</p>
            <p className="text-gray-400">Étudiants inscrits</p>
          </div>
          <div className="bg-slate-800/50 border border-blue-500/20 rounded-lg p-6 text-center">
            <Zap className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-3xl font-bold text-white">100%</p>
            <p className="text-gray-400">Gratuit et sécurisé</p>
          </div>
        </div>

        {/* Documents Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-8">
            {selectedFaculty === 'Tous' ? 'Tous les documents' : `Documents - ${selectedFaculty}`}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                className="bg-slate-800/50 border border-blue-500/20 rounded-lg p-6 hover:border-blue-500/50 transition group cursor-pointer"
              >
                <div className="mb-4">
                  <span className="inline-block bg-blue-600/20 text-blue-300 text-xs px-3 py-1 rounded-full mb-2">
                    {doc.category}
                  </span>
                  <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition line-clamp-2">
                    {doc.title}
                  </h4>
                </div>
                <p className="text-sm text-gray-400 mb-4">Par {doc.author}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-blue-400 font-bold">${doc.price}</span>
                  <div className="flex gap-4 text-sm text-gray-400">
                    <span>👍 {doc.likes}</span>
                    <span>⬇️ {doc.downloads}</span>
                  </div>
                </div>
                <button
                  onClick={() => addToCart(doc.id)}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  Ajouter au panier
                </button>
              </div>
            ))}
          </div>
        </div>

        {filteredDocs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">Aucun document trouvé. Essayez une autre recherche.</p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-slate-900/50 border-t border-blue-500/20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
          <p>© 2025 EduLib RDC. Tous droits réservés.</p>
          <p className="mt-2">Plateforme de ressources pédagogiques pour la République Démocratique du Congo</p>
        </div>
      </footer>
    </div>
  );
}
