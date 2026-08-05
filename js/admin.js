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
            <td class="party ${v.candidate.toLowerCase()}"> ${v.candidate}</td>
            <td>${v.time}</td>
            <td>
                <input
    type="checkbox"
    value="${i}"
    class="voterCheck"
    onchange="updateDeleteButton()"
>
            </td>
        `;

        body.appendChild(row);
    });
    updateDeleteButton();
}
// =================== update delet button ================
function updateDeleteButton() {

    const deleteBtn = document.getElementById("deleteBtn");

    if (!deleteBtn) return;

    const count = document.querySelectorAll(".voterCheck:checked").length;

    if (count === 0) {
        deleteBtn.textContent = "🗑 Delete Selected";
    } else {
        deleteBtn.textContent = `🗑 Delete Selected (${count})`;
    }

}


// ================= SEARCH VOTERS =================

function searchVoters() {

    const searchInput = document.getElementById("searchInput");

    if (!searchInput) return;

    searchInput.addEventListener("input", function () {

        const keyword = this.value.trim().toLowerCase();

        const rows = document.querySelectorAll("#voterTableBody tr");

        rows.forEach(row => {

            const cells = row.querySelectorAll("td");

            if (cells.length === 0) return;

            const user = cells[1].textContent.toLowerCase();
            const mobile = cells[2].textContent.toLowerCase();
            const party = cells[3].textContent.toLowerCase();

            if (
                user.includes(keyword) ||
                mobile.includes(keyword) ||
                party.includes(keyword)
            ) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }

        });

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
    searchVoters();

    const deleteBtn = document.getElementById("deleteBtn");

    if (deleteBtn) {
        deleteBtn.addEventListener("click", deleteSelected);
    }
});

