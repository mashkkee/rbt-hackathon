title: "🌍 Golem Travel – Tvoj AI saputnik za savršeno putovanje"
description: >
  Golem Travel je napredna web aplikacija za turizam koju pokreće moćni AI asistent Golem.
  Golem korisnicima pruža personalizovane preporuke, odgovara na pitanja i omogućava direktne rezervacije putovanja.

table_of_contents:
  - 🔍 Uvod
  - 🚀 Tehnologije
  - 📦 Instalacija
  - ⚙️ Konfiguracija
  - 🧠 Kako radi Golem?
  - 💡 Primer korišćenja
  - 🐞 Problemi i rešavanja
  - 
introduction: >
  Golem Travel je aplikacija dizajnirana za planiranje putovanja bez stresa. Golem, AI asistent, 
  pomaže korisnicima da pronađu destinacije, istraže opcije i rezervišu svoja putovanja direktno iz aplikacije.

technologies:
  - React (frontend)
  - Python (backend, AI integracija)
  - MySQL (baza podataka)
  - OpenAI API 

installation:
  steps:
    - git clone https://github.com/mashkkee/rbt-hackathon.git
    - cd golem-travel
    - cd frontend && npm install && npm run dev
    - cd backend && python -m venv venv
    - source venv/bin/activate
    - pip install -r requirements.txt
    - python main.py
  database:
    - Startuj MySQL server
    - Importuj `schema.sql`
    - Konfiguriši `.env` fajl sa pristupnim podacima

golem_features:
  - Odgovara na pitanja o destinacijama i vasim potrebama vezane za destinacije
  - Predlaže putovanja na osnovu korisničkih interesovanja
  - Vodi korisnika kroz proces rezervacije

usage_example: |
  1. Otvori aplikaciju u browser-u
  2. Započni konverzaciju sa Golemom (npr. “Preporuči mi neku destinaciju do 1500 eura”)
  3. Golem predlaže destinacije sa detaljima
  4. Klikom rezerviši termin direktno kroz interfejs


authors:
  - role: UI/UX dizajn
    name: "Haris Gorcevic"
  - role: AI i backend
    name: "Hamza Gorcevic,Erhad Masovic"
  - role: Frontend
    name: "Erhad Masovic"
  
