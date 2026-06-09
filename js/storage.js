// ================= INIT STORAGE =================

function getVotes() {
    return JSON.parse(localStorage.getItem("votes")) || {
        BJP: 0,
        BJD: 0,
        Congress: 0
    };
}

function saveVotes(votes) {
    localStorage.setItem("votes", JSON.stringify(votes));
}

function getVoterList() {
    return JSON.parse(localStorage.getItem("voterList")) || [];
}

function saveVoterList(list) {
    localStorage.setItem("voterList", JSON.stringify(list));
}

function getVotingStatus() {
    return localStorage.getItem("votingStatus") || "ON";
}

function setVotingStatus(status) {
    localStorage.setItem("votingStatus", status);
}

// ================= FIRST RUN INITIALIZATION =================

if (!localStorage.getItem("votes")) {
    saveVotes({
        BJP: 0,
        BJD: 0,
        Congress: 0
    });
}

if (!localStorage.getItem("voterList")) {
    saveVoterList([]);
}

if (!localStorage.getItem("votingStatus")) {
    setVotingStatus("ON");
}
