# 🗳️ Secure Web Voting System

A simple and secure web-based voting system built using **HTML, CSS, and JavaScript**.

---

## 🚀 Features

* 🔐 User Login System
* 🗳️ Vote for Political Parties
* 🚫 Prevent Duplicate Voting (per user)
* 📵 Optional Device-Based Vote Protection
* 🔒 Voting Buttons Disable After Voting
* 🛑 Admin Can Stop / Resume Voting
* 🔄 Restart Voting Option
* 🏆 Winner Highlight After Voting Ends
* 📊 Live Vote Percentage Updates
* 🎨 Modern UI Design
* 📁 Organized Folder Structure

---

## 🏗️ Project Structure

```
SECURE-WEB-VOTING-SYSTEM/
│
├── index.html
│
├── pages/
│   ├── vote.html
│   └── result.html
│
├── css/
│   └── style.css
│
└── js/
    └── app.js
```

---

## 🧠 Technologies Used

* HTML5
* CSS3
* JavaScript
* LocalStorage (for storing votes)

---

## ⚙️ How It Works

1. User logs in from `index.html`
2. User is redirected to the voting page
3. Voting status is checked (OPEN/CLOSED)
4. User selects a party and casts a vote
5. System prevents duplicate voting
6. Voting buttons disable after successful vote
7. Admin can stop or restart voting
8. Results update live and winner is highlighted when voting ends

---

## 🔐 Security Logic

* Each user can vote only once
* Voting closes when admin disables it
* Buttons disable after vote submission
* Optional device-based vote lock can prevent voting from the same device

---

## ⚠️ Note

This project uses **LocalStorage**, so voting data is stored in the browser.

* Each browser/device stores separate voting data
* Clearing browser storage resets votes
* Device-based vote protection can be enabled for stronger security

This project is built for **learning and demonstration purposes**.

---

## 🎓 Viva Explanation

> This is a client-side web voting system developed using HTML, CSS, and JavaScript.
> It includes user authentication, duplicate vote prevention, admin voting control, live result updates, and automatic winner detection.
> LocalStorage is used to simulate a secure data storage mechanism.

---

## 📌 Future Improvements

* Cloud database integration (Firebase / MongoDB)
* Secure admin authentication
* OTP-based voter verification
* Advanced fraud prevention
* Interactive charts & analytics
* Mobile app version

---

## 👨‍💻 Author

**Developed by RAJENDRA**

---
