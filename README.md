# 🏥 Health Assistant – Inteligentna Platforma dla Lekarzy

**Health Assistant** to aplikacja webowa zbudowana w technologii **React.js**, która wspiera lekarzy w zarządzaniu pacjentami,
analizie danych medycznych i automatyzacji pracy za pomocą sztucznej inteligencji (AI).

---

## 🧠 Funkcjonalności

- 🔐 **Logowanie przez Microsoft Entra ID (Azure AD)**


---

## ⚙️ Technologie

- Frontend: **React.js (Vite) + Sass**
- Autoryzacja: **Microsoft Entra ID**
- Routing: **react-router-dom**

---

## 🚀 Jak uruchomić projekt lokalnie

### 1. 🔧 Wymagania
- Node.js zainstalowany
- Konto w **Microsoft Entra (Azure)**

### 2. 🛠️ Rejestracja aplikacji w Entra

1. Przejdź na: https://entra.microsoft.com/
2. Zarejestruj nową aplikację
3. Skopiuj:
   - `Application (client) ID`
   - `Directory (tenant) ID` lub użyj `organizations`
4. Ustaw:
   - **Redirect URI**: `http://localhost:5173/`

📌 Upewnij się, że dodasz siebie jako użytkownika/testera do aplikacji.

### 3. 🔐 Utwórz plik `.env`

W głównym folderze projektu utwórz plik `.env` i wpisz:

```
VITE_CLIENT_ID=your-client-id-here
VITE_AUTHORITY=https://login.microsoftonline.com/{ you organizations}
VITE_REDIRECT_URI=http://localhost:5173/
```

❗ Plik `.env` jest ignorowany przez Gita i nie trafi do repozytorium.

### 4. 📦 Instalacja zależności

W terminalu:

```bash
npm install
```

### 5. 🧪 Uruchom aplikację

```bash
npm run dev
```

Aplikacja powinna być dostępna pod `http://localhost:5173/`

---

## 🛡️ Zabezpieczenia

- Dostęp do `/dashboard` i jego podstron (np. `patients`, `card`, `recordings`, `profile`) jest chroniony – możliwy **tylko po zalogowaniu przez Entra**
- Użyto komponentu `RequireAuth` do ochrony tras

---

## 📁 Struktura projektu

```
src/
├── assets/                     # Obrazy i logo
├── components/                 # Komponenty wspólne (np. RequireAuth)
├── pages/
│   ├── home/                   # Strona główna
│   ├── about/                  # O aplikacji
│   ├── contact/                # Kontakt
│   ├── layout/                 # Layout nawigacyjny
│   ├── dashboard_layout/       # Layout dla zalogowanych
│   └── dashboard/              # Zawartość dashboardu (patients, card, recordings)
├── App.jsx
└── main.jsx
```

---
