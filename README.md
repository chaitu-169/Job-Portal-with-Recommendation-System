# Full Stack Job Recommendation Website (MERN FullStack + Machine Learning)

A complete **Full Stack Web Application** built using the **MERN stack** with an integrated **Machine Learning module** for job category prediction based on resumes.

This project demonstrates end-to-end development from frontend design, backend API creation, database integration, and machine learning model deployment for real-world applications.

---

## 🧠 Project Overview

This web app allows users to upload their resumes (`.txt` or `.pdf`) and automatically predicts the most suitable job category based on content analysis using a pre-trained machine learning model.

The entire application is split into three major components:
1. **Frontend** – Built with React.js
2. **Backend** – Built with Node.js + Express.js
3. **Job Recommender** – Python-based ML model trained on resume data

---

## 🛠️ Tech Stack

| Layer        | Technology Used      |
|-------------|----------------------|
| Frontend    | React.js              |
| Backend     | Node.js, Express.js   |
| Database    | MongoDB (Optional)   |
| ML Module   | Python, Scikit-learn  |
| Deployment  | Netlify / Vercel (Frontend), Heroku / Render (Backend), Streamlit / Flask (ML) |

---

## 📁 Folder Structure
job-recommender-fullstack/
│
├── frontend/ # React App
│ ├── public/
│ └── src/
│ ├── components/
│ ├── App.js
│ └── index.js
│
├── backend/ # Node.js + Express API
│ ├── routes/
│ ├── controllers/
│ └── server.js
│
├── job_recommender/ # Python ML Model
│ ├── model/
│ │ ├── clf.pkl
│ │ └── tfidf.pkl
│ └── predict.py # Prediction logic
│
├── uploads/ # Stores uploaded resumes (optional)
├── README.md
└── .gitignore


---

## 🔧 Features

- Resume upload via UI (supports `.txt`, `.pdf`)
- File transfer from frontend → backend → ML model
- Text preprocessing (cleaning special characters, URLs, etc.)
- Predict job category using ML classifier
- Display result back to user on the frontend

---

## 🚀 How to Run Locally

### 1. Clone the repo
```bash
git clone https://github.com/chaitu-169/Job-Portal-with-Recommendation-System.git 
cd Job-Portal-with-Recommendation-System

2. Run Frontend
bash


1
2
3
cd frontend
npm install
npm start
3. Run Backend
npm install
npm run dev

📸 Screenshot
![image](https://github.com/user-attachments/assets/4268be33-5929-4092-86bc-c11ae91456b1)

