// ================= OPEN MANAGE PAGE =================

function openManagePage() {
    window.location.href = "../pages/manage.html";
}

// ================= TOGGLE VOTING =================

function toggleVoting() {

    let status = localStorage.getItem("votingStatus");

    if (status === "ON") {
        localStorage.setItem("votingStatus", "OFF");
        showToast("🚫 Voting CLOSED", "warning");
    } else {
        localStorage.setItem("votingStatus", "ON");
        showToast("✅ Voting OPEN", "success");
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
    } else {
        msg.innerText = "✅ Voting is OPEN";
        msg.style.color = "green";
    }

    const user = localStorage.getItem("currentUser");
    if (localStorage.getItem("voted_" + user)) {
        document.querySelectorAll(".party-btn")
            .forEach(btn => btn.disabled = true);
    }
}

window.onload = showVotingStatus;



// ================= CAST VOTE =================

function vote(candidate) {

    if (localStorage.getItem("votingStatus") === "OFF") {
        document.getElementById("msg").innerText = "⛔ Voting has ended!";
        return;
    }

    const user = localStorage.getItem("currentUser");
    const mobile = localStorage.getItem("currentMobile");

    if (!user) {
        showToast("Please login first", "error");
        window.location.href = "../index.html";
        return;
    }

    if (localStorage.getItem("voted_" + user)) {
        document.getElementById("msg").innerText = "You already voted!";
        return;
    }

    // update vote count
    let votes = JSON.parse(localStorage.getItem("votes"));
    votes[candidate]++;

    localStorage.setItem("votes", JSON.stringify(votes));
    localStorage.setItem("voted_" + user, candidate);
    localStorage.setItem("votedMobile_" + mobile, "yes");

    // store voter info for admin page
    let voterList = JSON.parse(localStorage.getItem("voterList"));

    voterList.push({
        user: user,
        mobile: mobile,
        candidate: candidate,
        time: new Date().toLocaleString()
    });

    localStorage.setItem("voterList", JSON.stringify(voterList));

    document.getElementById("msg").innerText = "✅ Vote recorded!";

    document.querySelectorAll(".party-btn")
        .forEach(btn => btn.disabled = true);
}

