# 📘 Dictionary API
![HTML](https://img.shields.io/badge/HTML-5-orange)
![CSS](https://img.shields.io/badge/CSS-3-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![License](https://img.shields.io/badge/License-MIT-green)<br>

---

## 👤 Author
Ben Stearns - [@bstearns07](https://github.com/bstearns07)

---

## 📑 Table of Contents
- [📌 Summary](#-summary)
- [⚙️ How It Works](#-how-it-works)
- [🚀 Live Demo](#-live-demo)
- [✨ Features](#-features)
- [🧰 Tech Stack](#-tech-stack)
- [🧠 Topics Covered](#-topics-covered)
- [📘 What I Learned](#-what-i-learned)
- [🖼 Screenshots](#-screenshots)

---

## 📌 Summary

Too lazy to open up the old Webster to look something up? Then this app might just come in handy. The
**Dictionary API** will look it up for you. Featuring an HTML and JavaScript frontend and a JavaScript Express API
server listening on the backend to serve everything up, just type the word you want to look up to read all about 
it. How does it do that? Courtesy of the good old [Free Dictionary API](https://dictionaryapi.dev/?ref=freepublicapis.com).
Feel free to check it out.

For full program details, refer to [Program Requirements](./assets/ProgramInstructions.pdf)

---

## ⚙️ How It Works
Follow the steps below to run the application locally.

### 🚀 Start the Server
1. Run `server.js` or use your IDE’s Node/Express terminal command to start the server.
2. Open your browser and navigate to: http://localhost:3000

### 🔎 Submit a Word
1. Enter the word you want to search for in the input field.
2. Click **Lookup** or press **Enter** to submit your search.

---

### 📊 View Results
1. If the word is not found or an error occurs, an error message will be displayed.
2. If the word is found, its details will appear in a results table below.
3. If pronunciation audio is available, click the **▶ Play** button to listen.
---

## 🚀 Live Demo
[![Open Demo](https://img.shields.io/badge/▶%20Open%20Live%20Demo-ff4b4b?style=for-the-badge)](https://dictionaryapi-5dly.onrender.com)
![Smartwatch FAQ Demo](assets/demo.gif)<br>

---

## ✨ Features
- Free Dictionary API for data retrieval
- Table layout for word information (part of speech, pronunciation, definitions, and example sentences)
- Data validation for user entry and no words found
- Enter key support for word submission
- Play button for word pronunciation if an audio file is available
- Tailwind CSS

---

## 🧰 Tech Stack

### 🖥 Frontend
- HTML5 (Semantic Markup)
- CSS3 (Layout & Styling)
- Vanilla JavaScript (ES6+)

### 🖥 Backend
- Node Express API server
- [Free Dictionary API](https://dictionaryapi.dev/?ref=freepublicapis.com)

### 🧩 Core Concepts
- API requests
- API error handling
- API Data handling
- Node Express Web Applications
- Data Validation

### 🛠 Development Tools
- Git & GitHub
- WebStorm
- Free Dictionary API

---

## 🧠 Topics Covered
- Making API requests and parsing the responses into usable data
- Validating against errors that make occurs during API requests
- Providing default responses if certain data elements didn't return anything from the API
- Creating a node express server web app to serve the application and handle api requests
- Manipulating the DOM to append the information to the web page
- Creating and using Audio objects

---

## 📘 What I Learned


---

## 🖼 Screenshots

### 🖼 Default State
![Default State](assets/default.png)

### Successful Request
![Success](assets/default.png)

### Data Validation
![Empty Field](assets/error1.png)
![Server Error](assets/error2.png)
---

⬆️ [Back to Top](#-dictionary-api)