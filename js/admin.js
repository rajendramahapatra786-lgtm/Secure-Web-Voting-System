// ================= LOAD VOTERS TABLE (manage.html) =================

function loadVoters() {

    const body = document.getElementById("voterTableBody");

    if (!body) return;

    let list = getVoterList();

    body.innerHTML = "";

    if (list.length === 0) {
        body.innerHTML = "<tr><td colspan='6'>No voters found</td></tr>";
        return;
    }

    list.forEach((v, i) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${i + 1}</td>
            <td>${v.user}</td>
            <td>${v.mobile}</td>
            <td>${v.candidate}</td>
            <td>${v.time}</td>
            <td>
                <input type="checkbox" value="${i}" class="voterCheck">
            </td>
        `;

        body.appendChild(row);
    });
}


// ================= DELETE SELECTED VOTERS =================

function deleteSelected() {

    if (!confirm("Delete selected voters?")) return;

    let list = getVoterList();
    let votes = getVotes();

    const selected = document.querySelectorAll(".voterCheck:checked");

    selected.forEach(box => {
        const voter = list[box.value];

        if (votes[voter.candidate] > 0) {
            votes[voter.candidate]--;
        }

        list[box.value] = null;
    });

    list = list.filter(v => v !== null);

    saveVoterList(list);
    saveVotes(votes);

    showToast("Selected voters removed ✅", "success");

    document.getElementById("voterTableBody").innerHTML = "";

    loadVoters();
}


// ================= RESTART VOTING =================

function restartVoting() {

    if (!confirm("Restart voting?")) return;

    saveVotes(DEFAULT_VOTES);

    saveVoterList([]);
    for (let key in localStorage) {
        if (key.startsWith("voted_") || key.startsWith("votedMobile_")) {
            localStorage.removeItem(key);
        }
    }

    setVotingStatus("ON");

    showToast("Voting restarted!", "success");

    setTimeout(() => {
        location.reload();
    }, 1000);
}


document.addEventListener("DOMContentLoaded", () => {

    loadVoters();

    const deleteBtn = document.getElementById("deleteBtn");

    if (deleteBtn) {
        deleteBtn.addEventListener("click", deleteSelected);
    }
});

