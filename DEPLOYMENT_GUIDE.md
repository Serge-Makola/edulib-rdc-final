# Guide de Déploiement - EduLib RDC

## 🚀 Déploiement sur Vercel (Gratuit)

### Étape 1 : Créer un dépôt GitHub

1. Allez sur https://github.com/new
2. Remplissez :
   - **Repository name** : `edulib-rdc-final`
   - **Description** : EduLib RDC - Plateforme de ressources pédagogiques
   - **Public** : Cochez cette option
3. Cliquez sur "Create repository"

### Étape 2 : Pousser le code sur GitHub

```bash
cd /home/ubuntu/edulib-rdc-final
git remote add origin https://github.com/Serge-Makola/edulib-rdc-final.git
git branch -M main
git push -u origin main
```

### Étape 3 : Déployer sur Vercel

1. Allez sur https://vercel.com/new
2. Cliquez sur "Continue with GitHub"
3. Autorisez Vercel à accéder à votre GitHub
4. Sélectionnez le dépôt `edulib-rdc-final`
5. Cliquez sur "Import"
6. Vercel détectera Next.js automatiquement
7. Cliquez sur "Deploy"

### Étape 4 : Configurer la base de données (Optionnel)

Pour ajouter une vraie base de données PostgreSQL :

1. Dans Vercel, allez dans "Storage"
2. Cliquez sur "Create Database"
3. Sélectionnez "PostgreSQL"
4. Suivez les instructions
5. Vercel ajoutera automatiquement `DATABASE_URL` aux variables d'environnement

## 📋 Fonctionnalités Implémentées

✅ **Page d'accueil** - Recherche, filtrage par faculté, documents de test
✅ **Authentification** - Pages de login/signup (formulaires statiques pour MVP)
✅ **Catalogue de documents** - 6 documents de test avec prix et statistiques
✅ **Panier d'achat** - Ajouter des documents au panier
✅ **Design moderne** - Interface responsive et élégante
✅ **Optimisations** - Performance, animations, UX

## 🔧 Variables d'Environnement

Vercel gère automatiquement les variables d'environnement. Vous pouvez les modifier dans :

**Vercel Dashboard → Settings → Environment Variables**

```
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://votre-domaine.vercel.app
JWT_SECRET=your-jwt-secret
```

## 📝 Prochaines Étapes

1. **Intégrer la vraie base de données** - Connecter PostgreSQL
2. **Authentification réelle** - Implémenter NextAuth.js
3. **Upload de documents** - Permettre aux utilisateurs d'uploader des fichiers
4. **Système de paiement** - Intégrer Mobile Money
5. **Notifications** - Ajouter les emails de confirmation

## 🆘 Dépannage

**Le site ne charge pas ?**
- Vérifiez que le dépôt GitHub est public
- Vérifiez les logs dans Vercel Dashboard

**Erreur de base de données ?**
- Assurez-vous que `DATABASE_URL` est configurée
- Vérifiez que la base de données est accessible

**Problèmes de déploiement ?**
- Allez sur https://vercel.com/docs
- Consultez les logs de déploiement dans Vercel Dashboard

---

**Créé avec ❤️ pour l'éducation en RDC**
