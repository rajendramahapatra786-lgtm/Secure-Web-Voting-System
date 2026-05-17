# 🗳️ Secure Web Voting System

A simple and secure web-based voting system built using **HTML, CSS, and JavaScript**.

---

## 🚀 Features

* 🔐 User Login System
* 📱 OTP Verification System
* 🗳️ Vote for Political Parties
* 🚫 Prevent Duplicate Voting (per user)
* 📵 Optional Device-Based Vote Protection
* 🔒 Voting Buttons Disable After Voting
* 🛑 Admin Can Stop / Resume Voting
* 🔄 Restart Voting Option
* 📋 Manage Voter Records
* 🗑️ Delete Selected Voters
* 🏆 Winner Highlight After Voting Ends
* 🎊 Confetti Winner Celebration
* 📊 Live Vote Percentage Updates
* 🎨 Modern Glassmorphism UI Design
* 📁 Organized Folder Structure

---

## 🏗️ Project Structure

```plaintext
SECURE-WEB-VOTING-SYSTEM/
│
├── index.html
│
├── pages/
│   ├── vote.html
│   ├── result.html
│   └── manage.html
│
├── css/
│   └── style.css
│
├── js/
│   └── app.js
│
└── README.md
```

---

## 🧠 Technologies Used

* HTML5
* CSS3
* JavaScript
* LocalStorage (for storing votes)

---

## ⚙️ How It Works

1. User enters username and mobile number
2. System generates demo OTP
3. OTP verification is completed
4. User is redirected to the voting page
5. Voting status is checked (OPEN/CLOSED)
6. User selects a party and casts a vote
7. System prevents duplicate voting
8. Voting buttons disable after successful vote
9. Admin can stop or restart voting
10. Results update live and winner is highlighted when voting ends

---

## 👨‍💼 Admin Access

The system includes an admin control panel for managing the voting process.

### 🔑 Admin Password

```plaintext
admin123
```

### ⚙️ Admin Features

* 🛑 Stop / Resume Voting
* 🔄 Restart Voting System
* 📋 Manage Voter Records
* 🗑️ Delete Selected Voters
* 📊 Monitor Voting Status

> ⚠️ Note:
> The admin password is currently hardcoded for demonstration purposes.
> In a production system, admin authentication should be handled securely using a backend and encrypted credentials.

---

## 🔐 Security Logic

* Each user can vote only once
* Voting closes when admin disables it
* Buttons disable after vote submission
* OTP verification required before voting
* Optional device-based vote lock can prevent voting from the same device

---

## 📊 Result System

The result page includes:

* Live vote count updates
* Percentage calculation
* Winner detection system
* Winner highlight animation
* Confetti celebration effect

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
> It includes OTP-based login, duplicate vote prevention, admin voting control, voter management, live result updates, and automatic winner detection.
> LocalStorage is used to simulate a secure data storage mechanism.

---

## 📌 Future Improvements

* Cloud database integration (Firebase / MongoDB)
* Secure admin authentication
* Real OTP API integration
* Advanced fraud prevention
* Interactive charts & analytics
* Face authentication
* Real-time voting system
* Mobile app version

---

## 👨‍💻 Author

**Developed by RAJENDRA**

---