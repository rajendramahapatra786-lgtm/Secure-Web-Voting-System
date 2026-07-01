const STORAGE_KEYS = {
    VOTES: "votes",
    VOTER_LIST: "voterList",
    VOTING_STATUS: "votingStatus",
    CURRENT_USER: "currentUser",
    CURRENT_MOBILE: "currentMobile",
    VOTED_USER: "voted_",
    VOTED_MOBILE: "votedMobile_"
};
const DEFAULT_VOTES = {
    BJP: 0,
    BJD: 0,
    Congress: 0
};

const ADMIN_CONFIG = {
    PASSWORD: "admin123"
};


// ================= INIT STORAGE =================

function getVotes() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.VOTES)) || DEFAULT_VOTES;
    } catch (error) {
        console.error("Votes data corrupted:", error);
        return DEFAULT_VOTES;
    }
}

function saveVotes(votes) {
   localStorage.setItem(STORAGE_KEYS.VOTES, JSON.stringify(votes));
}

function getVoterList() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.VOTER_LIST)) || [];
    } catch (error) {
        console.error("Voter list corrupted:", error);
        return [];
    }
}

function saveVoterList(list) {
    localStorage.setItem(STORAGE_KEYS.VOTER_LIST, JSON.stringify(list));
}

function getVotingStatus() {
    return localStorage.getItem(STORAGE_KEYS.VOTING_STATUS)|| "ON";
}

function setVotingStatus(status) {
    localStorage.setItem(STORAGE_KEYS.VOTING_STATUS, status);
}

// ================= FIRST RUN INITIALIZATION =================

if (!localStorage.getItem(STORAGE_KEYS.VOTES)) {
    saveVotes(DEFAULT_VOTES);
}

if (!localStorage.getItem(STORAGE_KEYS.VOTER_LIST)) {
    saveVoterList([]);
}

if (!localStorage.getItem(STORAGE_KEYS.VOTING_STATUS)) {
    setVotingStatus("ON");
}
