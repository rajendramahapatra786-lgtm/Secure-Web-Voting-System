// ================= INIT STORAGE =================

// vote counts
if (!localStorage.getItem("votes")) {
    localStorage.setItem("votes", JSON.stringify({
        BJP: 0,
        BJD: 0,
        Congress: 0
    }));
}

// store individual voters
if (!localStorage.getItem("voterList")) {
    localStorage.setItem("voterList", JSON.stringify([]));
}

// voting status
if (!localStorage.getItem("votingStatus")) {
    localStorage.setItem("votingStatus", "ON");
}
