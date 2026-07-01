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

    // update UI without reload
    showVotingStatus();
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

    const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);

    if (localStorage.getItem(STORAGE_KEYS.VOTED_USER + user)) {
        document.querySelectorAll(".party-btn")
            .forEach(btn => btn.disabled = true);
    }
}


// ================= HELPER FUNCTIONS =================

// check if user already voted
function hasUserVoted(user) {
    return localStorage.getItem(STORAGE_KEYS.VOTED_USER + user);
}


// save vote count
function saveVote(candidate) {

    let votes = getVotes();

    votes[candidate]++;

    saveVotes(votes);
}


// save voter record for admin page
function saveVoterRecord(user, mobile, candidate) {

    let voterList = getVoterList();

    voterList.push({
        user: user,
        mobile: mobile,
        candidate: candidate,
        time: new Date().toLocaleString()
    });

    saveVoterList(voterList);
}


// disable vote buttons after vote
function disableVoteButtons() {

    document.querySelectorAll(".party-btn")
        .forEach(btn => btn.disabled = true);
}


// ================= CAST VOTE =================

function vote(candidate) {

    if (getVotingStatus() === "OFF") {
        document.getElementById("msg").innerText = "⛔ Voting has ended!";
        return;
    }

    const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    const mobile = localStorage.getItem(STORAGE_KEYS.CURRENT_MOBILE);

    if (!user) {
        showToast("Please login first", "error");
        window.location.href = "../index.html";
        return;
    }

    if (hasUserVoted(user)) {
        document.getElementById("msg").innerText = "You already voted!";
        return;
    }

    // update vote count
    saveVote(candidate);

    // save duplicate protection
    localStorage.setItem(STORAGE_KEYS.VOTED_USER + user, candidate);
    localStorage.setItem(STORAGE_KEYS.VOTED_MOBILE + mobile, "yes");

    // save voter info
    saveVoterRecord(user, mobile, candidate);

    document.getElementById("msg").innerText = "✅ Vote recorded!";

    disableVoteButtons();
}


// ================= PAGE LOAD =================

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