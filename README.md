# Wellbody AI Wellness Coach

An AI-powered voice assistant built using Vapi.ai, designed to support wellness check-ins, guided conversations, and mental health reflection via real-time voice calls.

We developed this project for the **AI Hackathon hosted by Tech:Europe in Berlin**.  
The core of the assistant is built using **OpenAI**, **ElevenLabs**, and **Vapi.ai** for seamless real-time conversation and summarization.

## 🎯 Overview

This project enables users to:

- **Engage in AI voice sessions** for wellness tracking and self-reflection  
- **Summarize conversations** automatically post-call  
- **Track interaction history** and optionally export insights  
- **Support mental fitness** through structured AI-guided dialogue

---

## 🧩 Tech Stack

| Layer       | Tech                          |
|-------------|-------------------------------|
| **Frontend**| React (Vite), Vapi Web SDK    |
| **Backend** | Python Flask, SQLAlchemy      |
| **DB**      | PostgreSQL                    |
| **Auth**    | JWT for user authentication   |
| **AI**      | Vapi.ai for STT/TTS + voice agent logic |

---

## 🚀 Features

- **User signup & login**  
- **Wellness voice sessions** powered by Vapi.ai  
- **Post-call summary generation**  
- **Admin review panel** (WIP)  
- **Export session history**  

Future roadmap includes customizable wellness topics, calendar reminders, and user progress insights.

---

## 📁 Project Structure

/backend — Flask REST API
/frontend — React + Vite app
/structure.txt — Notes and high-level overview
/images — UI screenshots and mockups
README.md — You are here!


---

## 🔧 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/sivaganeshan/VAPI-AI-Voice-Assistant.git

cd VAPI-AI-Voice-Assistant
```
2. Backend Setup
   
```bash

cd backend
python -m venv venv
source venv/bin/activate       # On Windows: venv\Scripts\activate
pip install -r requirements.txt
Create a .env file:

dotenv

VAPI_API_KEY="your_vapi_api_key"
JWT_SECRET="your_jwt_secret"
DATABASE_URI="postgresql://user:password@localhost:5432/yourdb"

```
3.Run the server:

```bash

python main.py
```


4. Frontend Setup
```bash
cd ../frontend
npm install
```

Create .env:
```
VITE_VAPI_API_KEY="your_vapi_public_key"
VITE_ASSISTANT_ID="your_assistant_id"
```

Start the frontend:

```
npm run dev
```

Open http://localhost:5173 in your browser.



⚙️ Usage

Sign in or register

Launch a wellness voice session

Receive AI-generated summaries post-call

(WIP) Admins can review anonymized trends and export data



🤝 Contributing

Contributions are welcome:

Fork the repository

Create a feature branch (git checkout -b feature/...)

Commit your changes

Push and open a pull request



💡 Acknowledgements

Core voice technology by Vapi.ai

Project idea inspired by mental health tech initiatives and voice-first AI coaching

Based on enhancements to the VoIP-AI-Assistant open-source base



📄 License

Licensed under the MIT License — see LICENSE for more info.



🧭 Roadmap

✅ Core voice session and summary

✅Topic-based session types (e.g., stress, focus, gratitude)

✅ Admin dashboard & user analytics

✅ Calendar syncing + session reminders

🔜 Voice customization (tone, pace, accent)
