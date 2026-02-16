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

    if (password === "admin123") {
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
    votes[candidate]++;

    localStorage.setItem("votes", JSON.stringify(votes));
    localStorage.setItem("voted_" + user, candidate);

    document.getElementById("msg").innerText = "✅ Vote recorded!";
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
        if (key.startsWith("voted_")) {
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
    setInterval(updateResults, 1000);
}