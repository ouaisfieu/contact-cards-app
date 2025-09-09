# 📇 Cartes de Visite Numériques

Une application moderne pour créer et gérer des cartes de visite numériques élégantes. Créez des profils publics partageables pour vos contacts professionnels.

## ✨ Fonctionnalités

- 🔐 **Interface d'administration sécurisée**
- 👥 **Gestion complète des contacts**
- 🎨 **Cartes de visite élégantes et responsives**
- 🔗 **URLs publiques uniques** (`/profile/nom-contact`)
- 📱 **Design mobile-first**
- 🚀 **Optimisé pour Vercel**
- 💾 **Stockage local (localStorage)**

## 🚀 Déploiement rapide sur Vercel

### 1. Cloner et installer

```bash
git clone 
cd contact-cards-app
npm install
```

### 2. Lancer en développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000)

### 3. Déployer sur Vercel

**Option A: Via CLI Vercel**
```bash
npm i -g vercel
vercel
```

**Option B: Via GitHub**
1. Push votre code sur GitHub
2. Connectez votre repo à Vercel
3. Deploy automatique !

## 📁 Structure du projet

```
contact-cards-app/
├── pages/
│   ├── index.js              # Dashboard principal
│   ├── profile/[slug].js     # Pages publiques
│   ├── _app.js              # Configuration Next.js
│   └── _document.js         # HTML personnalisé
├── styles/
│   └── globals.css          # Styles Tailwind
├── package.json             # Dépendances
├── tailwind.config.js       # Config Tailwind
├── next.config.js          # Config Next.js
└── vercel.json             # Config Vercel
```

## 🎯 Utilisation

### Connexion admin
- **URL:** `/`
- **Mot de passe:** `admin123`

### Créer un contact
1. Se connecter à l'interface admin
2. Cliquer sur "Nouveau contact"
3. Remplir les informations
4. Sauvegarder

### Profils publics
- **Format:** `/profile/nom-contact`
- **Exemple:** `/profile/marie-dubois`
- URLs automatiquement générées depuis le nom

## 🛠 Technologies

- **Framework:** Next.js 14
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Deployment:** Vercel
- **Storage:** localStorage (navigateur)

## 🎨 Personnalisation

### Modifier les couleurs
Éditez `tailwind.config.js` pour changer le thème :

```js
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      secondary: '#your-color'
    }
  }
}
```

### Ajouter des champs
Modifiez `formData` dans `pages/index.js` :

```js
const [formData, setFormData] = useState({
  // ... champs existants
  nouveauChamp: '',
});
```

## 📈 Améliorations futures

- [ ] Base de données persistante (Supabase/PlanetScale)
- [ ] Authentification OAuth
- [ ] Upload d'images
- [ ] Thèmes personnalisables
- [ ] Export PDF/vCard
- [ ] Analytics des vues
- [ ] QR codes
- [ ] PWA (mode hors ligne)

## 🔧 Configuration avancée

### Variables d'environnement

Créez `.env.local` :

```env
NEXT_PUBLIC_BASE_URL=https://votre-domaine.vercel.app
NEXT_PUBLIC_APP_NAME=Cartes de Visite
```

### Meta tags personnalisés

Modifiez `pages/_app.js` pour personnaliser les meta tags globaux.

## 🐛 Résolution de problèmes

### Images ne s'affichent pas
Ajoutez le domaine dans `next.config.js` :

```js
images: {
  domains: ['votre-domaine.com'],
}
```

### Erreur de build
Vérifiez les dépendances :

```bash
npm install
npm run build
```

## 📝 License

MIT License - Libre d'utilisation et modification

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/amelioration`)
3. Commit (`git commit -m 'Ajouter fonctionnalité'`)
4. Push (`git push origin feature/amelioration`)
5. Ouvrir une Pull Request

---

🚀 **Prêt à déployer !** Cette application est optimisée pour Vercel et prête à l'emploi.
