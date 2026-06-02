'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Plus, Trash2, Users, FileText } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isAdmin: boolean;
}

interface Document {
  id: string;
  title: string;
  author: string;
  faculty: string;
  category: string;
  price: number;
}

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [activeTab, setActiveTab] = useState<'users' | 'documents'>('users');
  const [loading, setLoading] = useState(true);
  const [showNewDocForm, setShowNewDocForm] = useState(false);

  useEffect(() => {
    // Check if user is logged in and is admin
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/auth/login');
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    if (!parsedUser.isAdmin) {
      router.push('/');
      return;
    }

    setUser(parsedUser);
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <p className="text-white">Chargement...</p>
      </div>
    );
  }

  if (!user || !user.isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <p className="text-white">Accès refusé</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 border-b border-blue-500/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-300 text-sm">{user.name}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-blue-500/20">
          <button
            onClick={() => setActiveTab('users')}
            className={`flex items-center gap-2 px-6 py-3 font-medium transition border-b-2 ${
              activeTab === 'users'
                ? 'border-blue-600 text-blue-400'
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
          >
            <Users className="w-5 h-5" />
            Utilisateurs
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`flex items-center gap-2 px-6 py-3 font-medium transition border-b-2 ${
              activeTab === 'documents'
                ? 'border-blue-600 text-blue-400'
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
          >
            <FileText className="w-5 h-5" />
            Documents
          </button>
        </div>

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Gestion des utilisateurs</h2>
            <div className="bg-slate-800/50 border border-blue-500/20 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-700/50 border-b border-blue-500/20">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Nom</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Rôle</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Admin</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                        Aucun utilisateur trouvé
                      </td>
                    </tr>
                  ) : (
                    users.map((u) => (
                      <tr key={u.id} className="border-b border-blue-500/10 hover:bg-slate-700/30 transition">
                        <td className="px-6 py-4 text-white">{u.name}</td>
                        <td className="px-6 py-4 text-gray-400">{u.email}</td>
                        <td className="px-6 py-4 text-gray-400 capitalize">{u.role}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              u.isAdmin
                                ? 'bg-purple-600/30 text-purple-300'
                                : 'bg-gray-600/30 text-gray-300'
                            }`}
                          >
                            {u.isAdmin ? 'Oui' : 'Non'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-red-400 hover:text-red-300 transition">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === 'documents' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Gestion des documents</h2>
              <button
                onClick={() => setShowNewDocForm(!showNewDocForm)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                <Plus className="w-4 h-4" />
                Ajouter un document
              </button>
            </div>

            {showNewDocForm && (
              <div className="bg-slate-800/50 border border-blue-500/20 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">Nouveau document</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Titre</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-blue-500/30 focus:border-blue-500 focus:outline-none transition"
                      placeholder="Titre du document"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Auteur</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-blue-500/30 focus:border-blue-500 focus:outline-none transition"
                        placeholder="Auteur"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Prix ($)</label>
                      <input
                        type="number"
                        className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-blue-500/30 focus:border-blue-500 focus:outline-none transition"
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Faculté</label>
                      <select className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-blue-500/30 focus:border-blue-500 focus:outline-none transition">
                        <option>Droit</option>
                        <option>Médecine</option>
                        <option>Polytechnique</option>
                        <option>Sciences</option>
                        <option>Lettres</option>
                        <option>Économie</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Catégorie</label>
                      <select className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-blue-500/30 focus:border-blue-500 focus:outline-none transition">
                        <option>Syllabus</option>
                        <option>Notes</option>
                        <option>Exercices</option>
                        <option>Ouvrage</option>
                      </select>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
                  >
                    Ajouter
                  </button>
                </form>
              </div>
            )}

            <div className="bg-slate-800/50 border border-blue-500/20 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-700/50 border-b border-blue-500/20">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Titre</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Auteur</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Faculté</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Prix</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                        Aucun document trouvé
                      </td>
                    </tr>
                  ) : (
                    documents.map((doc) => (
                      <tr key={doc.id} className="border-b border-blue-500/10 hover:bg-slate-700/30 transition">
                        <td className="px-6 py-4 text-white">{doc.title}</td>
                        <td className="px-6 py-4 text-gray-400">{doc.author}</td>
                        <td className="px-6 py-4 text-gray-400">{doc.faculty}</td>
                        <td className="px-6 py-4 text-blue-400 font-semibold">${doc.price}</td>
                        <td className="px-6 py-4">
                          <button className="text-red-400 hover:text-red-300 transition">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
