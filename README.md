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

### 6. 🛡️ Zabezpieczenia

- Dostęp do `/dashboard` i jego podstron (np. `patients`, `card`, `recordings`, `profile`) jest chroniony – możliwy **tylko po zalogowaniu przez Entra**
- Użyto komponentu `RequireAuth` do ochrony tras

---

### 7. 📁 Struktura projektu

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

### 8. 🧠 Mikroserwisy i ich funkcje
- 🎧 ha-minio – przechowywanie i pobieranie nagrań audio

- 🧾 ha-postgres – obsługa bazy danych PostgreSQL (informacje o pacjentach)

- 🗣️ ha-speach-to-text – przekształcanie nagrania głosowego na tekst

- 🌐 ha-translator – tłumaczenie tekstu na język angielski (Azure Translator)

-  🏥 ha-health – ekstrakcja informacji medycznych z tekstu (Azure Text Analytics)

### 9. 🔄 Komunikacja frontend ↔ backend

server: {
  proxy: {
    '/api/minio':     'http://localhost:8081',
    '/api/postgres':  'http://localhost:8082',
    '/api/stt':       'http://localhost:8083',
    '/api/translate': 'http://localhost:8084',
    '/api/health':    'http://localhost:8085/health'
  }
}

### 10. 🔁 Przykładowy przepływ danych

1. Lekarz nagrywa notatkę → plik trafia do ha-minio
2. Nagranie jest analizowane przez ha-speach-to-text i zamieniane na tekst
3. Tekst tłumaczony jest na angielski przez ha-translator
4. Przetłumaczony tekst przesyłany jest do ha-health, który wyodrębnia dane:

   - firstName, lastName, age, gender
   - symptoms, diagnosis, treatment

5. Informacje są zapisywane w ha-postgres jako karta pacjenta

### 11. 🧪 Jak uruchomić backend lokalnie
1. 🔧 Wymagania
   Java 17+
   Maven (./mvnw)
   Docker (MinIO, PostgreSQL)

2. 🛠️ Uruchamianie mikroserwisów
   Każdy mikroserwis uruchamiasz osobno:
      cd ha-minio
      ./mvnw spring-boot:run

![flow](image.png)