# BootcampAppFront 💻

> 🎨 **Frontend interface for Bootcamp Management System**  
> Developed by 4TWIN students at **Esprit School of Engineering**.  
> Integrates seamlessly with the [`BootcampAppBack`](https://github.com/your-org/BootcampAppBack) REST API.

---

## 🖼 Overview

**BootcampAppFront** is the user-facing Single Page Application (SPA) built to provide an engaging, accessible, and modern interface for the Bootcamp education platform. Users can browse courses, add items to cart, enroll, and manage sessions—all from an optimized UI that adheres to **WCAG 2.1 accessibility guidelines**.

> This repo also aligns with GitHub Campus Program guidelines to boost Esprit's open-source visibility.

---

## ✨ Key Features

- 🧑‍🎓 Course listing and filtering by price
- 🛒 Dynamic shopping cart with session storage
- ✅ Enroll confirmation with summary
- 🌙 Responsive and mobile-first UI
- ♿ Accessibility best practices
- 🎯 Direct integration with backend API
- 🚀 Built for GitHub Campus visibility

---

## 🛠 Tech Stack

- **React** with Vite
- **Bootstrap 5**
- **Fetch API** for async HTTP calls
- **Local/session storage** for cart handling
- **ESLint + Prettier**
- **WCAG AA-level support**

---

## 📁 Project Structure

```bash
BootcampAppFront/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   ├── main.jsx
├── .env.example
├── index.html
├── vite.config.js
└── README.md
```

---

## ⚙️ Setup Instructions

### 🧩 Prerequisites

- Node.js (use `nvm`)
- Git CLI or GitHub Desktop
- Backend: [`BootcampAppBack`](https://github.com/your-org/BootcampAppBack) running on `http://localhost:5000`

### 🧪 Setup Steps

```bash
# 1. Clone the repository
git clone https://github.com/your-org/BootcampAppFront.git
cd BootcampAppFront

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# App will run on http://localhost:5173
```

### 🌍 Environment Variables

Copy `.env.example` to `.env` and adjust as needed:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🧩 Components Overview

| Component | Purpose |
|----------|---------|
| `ProductList` | Renders all bootcamp courses |
| `CartIcon` | Dynamic cart badge (header) |
| `CartDropdown` | Floating dropdown with selected items |
| `CheckoutPage` | Confirms order and clears cart |
| `FilterForm` | Enables min/max price filtering |

---

## 🎨 UX + Accessibility

This app supports:

- 🧭 Keyboard navigation
- 🎨 High-contrast mode ready (via Bootstrap)
- ✅ Dynamic labels and semantic HTML
- 🧏 WCAG 2.1 compliance effort

---

## 🔁 API Integration

All data interactions happen via REST endpoints provided by [`BootcampAppBack`](https://github.com/your-org/BootcampAppBack).

Example fetch:

```js
fetch(`${import.meta.env.VITE_API_URL}/courses`)
```

---

## ✅ GitHub Visibility Checklist

- `README.md` ✅
- `.env.example` ✅
- Screenshots in `assets/` 📸
- Project topics: `esprit`, `react`, `education`, `bootcamp`, `accessibility`
- GitHub Pages or Vercel planned for public demo (optional) 🌐

---

## 📌 GitHub Topics

```
react
vite
bootcamp
esprit
education
accessibility
shopping-cart
api-integration
jwt-auth
github-campus
```

---

## 🌍 Demo

Coming soon on Vercel / Netlify or GitHub Pages!  
_Want to preview now? Clone and run `npm run dev` locally._

---

## 🧑‍🏫 Esprit GitHub Campus Commitment

This project is a showcase of what Esprit students can build using open-source tools.  
Published as part of our GitHub Campus onboarding and PI project visibility efforts.

🧾 See [Amélioration de la visibilité d’Esprit grâce à GitHub.pdf](../Amélioration%20de%20la%20visibilité%20d’Esprit%20grâce%20à%20GitHub.pdf) for context.

---

## 📚 Related Projects

- [`BootcampAppBack`](https://github.com/your-org/BootcampAppBack) – RESTful backend for this app
- [`PI Accessibility Report`](../C%20accessibilité-PI-TWIN.pdf)

---

## 👏 Credits

Built with ❤️ by 4TWIN engineering students at **Esprit School of Engineering**.

---

## 📄 License

MIT License © 2024 – BootcampAppFront Team – Esprit

---
