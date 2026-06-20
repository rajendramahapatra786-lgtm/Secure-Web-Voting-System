// ================= OPEN MANAGE PAGE =================

function openManagePage() {
    window.location.href = "../pages/manage.html";
}

// ================= TOGGLE VOTING =================

function toggleVoting() {

    let status = getVotingStatus();

    if (status === "ON") {
        setVotingStatus("OFF");
        showToast("🚫 Voting CLOSED", "warning");
    } else {
        setVotingStatus("ON"); 
        showToast("✅ Voting OPEN", "success");
    }

    location.reload();
}



// ================= SHOW VOTING STATUS =================

function showVotingStatus() {

    const status = getVotingStatus();
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

// window.onload = showVotingStatus;



// ================= CAST VOTE =================

function vote(candidate) {

    if (getVotingStatus() === "OFF") {
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
    let votes = getVotes();

    votes[candidate]++;

    saveVotes(votes);
    localStorage.setItem("voted_" + user, candidate);
    localStorage.setItem("votedMobile_" + mobile, "yes");

    // store voter info for admin page
    let voterList = getVoterList();

    voterList.push({
        user: user,
        mobile: mobile,
        candidate: candidate,
        time: new Date().toLocaleString()
    });

    saveVoterList(voterList);

    document.getElementById("msg").innerText = "✅ Vote recorded!";

    document.querySelectorAll(".party-btn")
        .forEach(btn => btn.disabled = true);
}

document.addEventListener("DOMContentLoaded", () => {

    showVotingStatus();

    const toggleBtn = document.getElementById("toggleVotingBtn");
    const restartBtn = document.getElementById("restartVotingBtn");
    const manageBtn = document.getElementById("managePageBtn");

    if (toggleBtn) {
        toggleBtn.addEventListener("click", toggleVoting);
    }

    if (restartBtn) {
        restartBtn.addEventListener("click", restartVoting);
    }

    if (manageBtn) {
        manageBtn.addEventListener("click", openManagePage);
    }

    const voteButtons = document.querySelectorAll(".party-btn");

    voteButtons.forEach(button => {
        button.addEventListener("click", function () {
            const party = this.dataset.party;
            vote(party);
        });
    });
});