🏥 Health Assistant – Inteligentna Platforma dla Lekarzy

Health Assistant to aplikacja webowa zbudowana w technologii React.js, która wspiera lekarzy w zarządzaniu pacjentami,
analizie danych medycznych i automatyzacji pracy za pomocą sztucznej inteligencji (AI).

1. Funkcjonalności
- Logowanie przez Microsoft Entra ID (Azure AD)

2. Technologie
- Frontend: React.js (Vite) + Sass
- Autoryzacja: Microsoft Entra ID
- Routing: react-router-dom

3. Jak uruchomić projekt lokalnie
  Wymagania
    - Node.js zainstalowany
    - Konto w Microsoft Entra (Azure)

  Rejestracja aplikacji w Entra
    - Przejdź na: https://entra.microsoft.com/
    - Zarejestruj nową aplikację
    - Skopiuj:
    - Application (client) ID
    - Directory (tenant) ID lub użyj organizations
    - Ustaw:
    - Redirect URI: http://localhost:5173/

   Utwórz plik .env, wzór w .env_example

4. Instalacja zależności
    - npm install
5. Uruchomienie lokalnego serwera dla aplikacji, 
    - npm run dev  