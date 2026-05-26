// ================= UPDATE RESULTS PAGE =================

function updateResults() {

    const votes = JSON.parse(localStorage.getItem("votes")) || {
        BJP: 0, BJD: 0, Congress: 0
    };

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

    // show numbers
    bjpVotes.textContent = votes.BJP;
    bjdVotes.textContent = votes.BJD;
    conVotes.textContent = votes.Congress;

    // show percentages
    bjpPercent.textContent = ((votes.BJP / total) * 100).toFixed(1) + "%";
    bjdPercent.textContent = ((votes.BJD / total) * 100).toFixed(1) + "%";
    conPercent.textContent = ((votes.Congress / total) * 100).toFixed(1) + "%";

    // remove old highlight
    document.querySelectorAll(".result-box")
        .forEach(box => box.classList.remove("winner-box"));

    // ⭐ WINNER LOGIC
    if (status === "OFF") {

        let maxVotes = Math.max(votes.BJP, votes.BJD, votes.Congress);

        if (maxVotes > 0) {

            if (votes.BJP === maxVotes) bjpBox.classList.add("winner-box");
            if (votes.BJD === maxVotes) bjdBox.classList.add("winner-box");
            if (votes.Congress === maxVotes) conBox.classList.add("winner-box");

            statusText.innerHTML = "🏆 Voting Finished";

            // 🎊 start confetti AFTER winner appears
            setTimeout(() => {
                startConfetti();
            }, 300);
        }

    } else {
        statusText.innerHTML = "🟡 Voting is still in progress...";
    }
}
// ensure results load correctly
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("bjpVotes")) {
        updateResults();
    }
});
