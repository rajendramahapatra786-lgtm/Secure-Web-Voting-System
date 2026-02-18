// ================= INIT STORAGE =================

if (!localStorage.getItem("votes")) {
    localStorage.setItem("votes", JSON.stringify({
        BJP: 0,
        BJD: 0,
        Congress: 0
    }));
}

if (!localStorage.getItem("votingStatus")) {
    localStorage.setItem("votingStatus", "ON");
}


// ================= LOGIN =================

function login() {
    const user = document.getElementById("username").value.trim();

    if (user === "") {
        document.getElementById("msg").innerText = "Please enter username";
        return;
    }

    localStorage.setItem("currentUser", user);
    window.location.href = "pages/vote.html";
}


// ================= ADMIN LOGIN =================

function adminLogin() {
    const password = prompt("Enter Admin Password:");

    const ADMIN_PASS = "admin123";
    if (password === ADMIN_PASS) {
        document.getElementById("adminPanel").style.display = "block";
        alert("Admin access granted");
    } else {
        alert("Wrong password");
    }
}


// ================= TOGGLE VOTING =================

function toggleVoting() {

    let status = localStorage.getItem("votingStatus");

    if (status === "ON") {
        localStorage.setItem("votingStatus", "OFF");
        alert("🚫 Voting CLOSED");
    } else {
        localStorage.setItem("votingStatus", "ON");
        alert("✅ Voting OPEN");
    }

    location.reload();
}


// ================= SHOW VOTING STATUS =================

function showVotingStatus() {
    const status = localStorage.getItem("votingStatus");
    const msg = document.getElementById("statusMessage");

    if (!msg) return;

    if (status === "OFF") {
        msg.innerText = "🚫 Voting is CLOSED";
        msg.style.color = "red";

        // ✅ disable voting buttons visually
        document.querySelectorAll(".party-btn").forEach(btn =>
            btn.classList.add("closed")
        );

    } else {
        msg.innerText = "✅ Voting is OPEN";
        msg.style.color = "green";

        // ✅ enable buttons again
        document.querySelectorAll(".party-btn").forEach(btn =>
            btn.classList.remove("closed")
        );
    }
    // ✅ disable buttons if already voted
    const user = localStorage.getItem("currentUser");
    if (localStorage.getItem("voted_" + user)) {
        document.querySelectorAll(".party-btn").forEach(btn =>
            btn.disabled = true
        );
    }
}


window.onload = showVotingStatus;


// ================= VOTE =================

function vote(candidate) {

    if (localStorage.getItem("votingStatus") === "OFF") {
        document.getElementById("msg").innerText = "⛔ Voting has ended!";
        return;
    }

    const user = localStorage.getItem("currentUser");

    if (!user) {
        alert("Please login first");
        window.location.href = "../index.html";
        return;
    }

    if (localStorage.getItem("voted_" + user)) {
        document.getElementById("msg").innerText = "You already voted!";
        return;
    }

    let votes = JSON.parse(localStorage.getItem("votes"));
    if (votes[candidate] !== undefined) {
        votes[candidate]++;
    }

    localStorage.setItem("votes", JSON.stringify(votes));
    localStorage.setItem("voted_" + user, candidate);
    const mobile = localStorage.getItem("currentMobile");
    localStorage.setItem("votedMobile_" + mobile, "yes");

    document.getElementById("msg").innerText = "✅ Vote recorded!";


    // ✅ DISABLE BUTTONS AFTER VOTE
    document.querySelectorAll(".party-btn").forEach(btn =>
        btn.disabled = true
    );
}


// ================= RESTART VOTING =================

function restartVoting() {

    if (!confirm("Restart voting?")) return;

    localStorage.setItem("votes", JSON.stringify({
        BJP: 0,
        BJD: 0,
        Congress: 0
    }));

    for (let key in localStorage) {
        if (key.startsWith("voted_") || key.startsWith("votedMobile_")) {
            localStorage.removeItem(key);
        }
    }

    localStorage.setItem("votingStatus", "ON");

    alert("Voting restarted!");
    location.reload();
}



// ================= LIVE RESULTS =================

function updateResults() {

    const votes = JSON.parse(localStorage.getItem("votes"));
    const status = localStorage.getItem("votingStatus");

    const bjpVotes = document.getElementById("bjpVotes");
    const bjdVotes = document.getElementById("bjdVotes");
    const conVotes = document.getElementById("conVotes");

    const bjpPercent = document.getElementById("bjpPercent");
    const bjdPercent = document.getElementById("bjdPercent");
    const conPercent = document.getElementById("conPercent");

    const bjpBox = document.getElementById("bjpBox");
    const bjdBox = document.getElementById("bjdBox");
    const conBox = document.getElementById("conBox");

    const statusText = document.getElementById("statusText");

    let total = votes.BJP + votes.BJD + votes.Congress;
    if (total === 0) total = 1;

    // numbers
    bjpVotes.textContent = votes.BJP;
    bjdVotes.textContent = votes.BJD;
    conVotes.textContent = votes.Congress;

    // percentages
    bjpPercent.textContent = ((votes.BJP / total) * 100).toFixed(1) + "%";
    bjdPercent.textContent = ((votes.BJD / total) * 100).toFixed(1) + "%";
    conPercent.textContent = ((votes.Congress / total) * 100).toFixed(1) + "%";

    // remove old winner highlight
    document.querySelectorAll(".result-box").forEach(box =>
        box.classList.remove("winner-box")
    );

    // detect winner
    let maxVotes = Math.max(votes.BJP, votes.BJD, votes.Congress);

    if (status === "OFF" && maxVotes > 0) {

        if (votes.BJP === maxVotes) bjpBox.classList.add("winner-box");
        if (votes.BJD === maxVotes) bjdBox.classList.add("winner-box");
        if (votes.Congress === maxVotes) conBox.classList.add("winner-box");

        statusText.innerHTML = "🏆 Voting finished";
    }
    else {
        statusText.innerHTML = "🟡 Voting is still in progress...";
    }
}


// ================= RUN ONLY ON RESULT PAGE =================

if (document.getElementById("bjpVotes")) {
    updateResults();
    window.addEventListener("storage", updateResults);
}

let generatedOTP;

function sendOTP() {

    const user = document.getElementById("username").value.trim();
    const mobile = document.getElementById("mobile").value.trim();

    if (user === "" || mobile === "") {
        document.getElementById("msg").innerText = "Enter name & mobile";
        return;
    }

    // ✅ CHECK IF USER ALREADY VOTED
    if (localStorage.getItem("votedMobile_" + mobile)) {
        alert("You already voted!");
        return;
    }

    // generate OTP
    generatedOTP = Math.floor(1000 + Math.random() * 9000);

    alert("OTP: " + generatedOTP); // demo OTP

    document.getElementById("otpBox").style.display = "block";
}

function verifyOTP() {

    const enteredOTP = document.getElementById("otp").value;
    const mobile = document.getElementById("mobile").value.trim();
    const user = document.getElementById("username").value.trim();

    if (enteredOTP == generatedOTP) {

        localStorage.setItem("currentUser", user);
        localStorage.setItem("currentMobile", mobile);

        window.location.href = "pages/vote.html";

    } else {
        alert("Wrong OTP");
    }
}