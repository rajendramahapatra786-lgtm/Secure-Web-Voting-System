// ================= INIT STORAGE =================

// create vote storage if not exists
if (!localStorage.getItem("votes")) {
    localStorage.setItem("votes", JSON.stringify({
        BJP: 0,
        BJD: 0,
        Congress: 0
    }));
}

// create voting status
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

// ================= VOTE FUNCTION =================

function vote(candidate) {

    // check if voting stopped
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

    // prevent duplicate voting
    if (localStorage.getItem("voted_" + user)) {
        document.getElementById("msg").innerText = "You already voted!";
        return;
    }

    let votes = JSON.parse(localStorage.getItem("votes"));

    // safe increment (future proof)
    if (!votes[candidate]) {
        votes[candidate] = 0;
    }

    votes[candidate]++;

    localStorage.setItem("votes", JSON.stringify(votes));
    localStorage.setItem("voted_" + user, candidate);

    document.getElementById("msg").innerText = "✅ Vote recorded successfully!";
}

// ================= SHOW RESULTS =================

if (document.getElementById("results")) {

    let votes = JSON.parse(localStorage.getItem("votes"));
    let status = localStorage.getItem("votingStatus");
    let output = "";

    if (status === "OFF") {

        // find winner
        let maxVotes = Math.max(...Object.values(votes));

        for (let name in votes) {
            if (votes[name] === maxVotes && maxVotes > 0) {
                output += `<p style="background:#00f5a0;color:#003;font-weight:bold">
                           🏆 ${name} : ${votes[name]}
                           </p>`;
            } else {
                output += `<p>${name} : ${votes[name]}</p>`;
            }
        }

    } else {
        for (let name in votes) {
            output += `<p>${name} : ${votes[name]}</p>`;
        }

        output += `<p style="margin-top:10px">🟡 Voting is still in progress...</p>`;
    }

    document.getElementById("results").innerHTML = output;
}

// ================= STOP VOTING =================

function stopVoting() {
    localStorage.setItem("votingStatus", "OFF");
    alert("Voting stopped!");
    location.reload();
}

// ================= RESTART VOTING =================

function restartVoting() {

    if (!confirm("Are you sure you want to restart voting?")) return;

    // reset votes
    localStorage.setItem("votes", JSON.stringify({
        BJP: 0,
        BJD: 0,
        Congress: 0
    }));

    // remove voted users
    for (let key in localStorage) {
        if (key.startsWith("voted_")) {
            localStorage.removeItem(key);
        }
    }

    // enable voting again
    localStorage.setItem("votingStatus", "ON");

    alert("Voting restarted!");
    location.reload();
}