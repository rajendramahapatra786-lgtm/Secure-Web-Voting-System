// ================= LOAD VOTERS TABLE (manage.html) =================

function loadVoters() {

    const body = document.getElementById("voterTableBody");
    if (!body) return;

    let list = getVoterList();

    if (list.length === 0) {
        body.innerHTML = "<tr><td colspan='6'>No voters found</td></tr>";
        return;
    }

    let html = "";

    list.forEach((v, i) => {
        html += `
            <tr>
                <td>${i + 1}</td>   <!-- User ID -->
                <td>${v.user}</td>
                <td>${v.mobile}</td>
                <td>${v.candidate}</td>
                <td>${v.time}</td>
                <td>
                    <input type="checkbox" value="${i}" class="voterCheck">
                </td>
            </tr>
        `;
    });

    body.innerHTML = html;
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
    location.reload();
}


// ================= RESTART VOTING =================

function restartVoting() {

    if (!confirm("Restart voting?")) return;

    saveVotes({
        BJP: 0,
        BJD: 0,
        Congress: 0
    });

    saveVoterList([]);
    for (let key in localStorage) {
        if (key.startsWith("voted_") || key.startsWith("votedMobile_")) {
            localStorage.removeItem(key);
        }
    }

    setVotingStatus("ON");

    showToast("Voting restarted!", "success");

    location.reload();
}


