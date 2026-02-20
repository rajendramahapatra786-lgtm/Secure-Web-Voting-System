// ======================================================
// 🗳️ SECURE WEB VOTING SYSTEM - FINAL SCRIPT
// ======================================================
// ✔ Vote counting
// ✔ OTP login
// ✔ Prevent duplicate voting
// ✔ Admin controls
// ✔ Manage voters page
// ✔ Delete voters & update counts
// ✔ Results page auto update
// ======================================================



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



// ================= USER LOGIN =================

function login() {
    const user = document.getElementById("username").value.trim();

    if (user === "") {
        document.getElementById("msg").innerText = "Please enter username";
        return;
    }

    localStorage.setItem("currentUser", user);
    window.location.href = "pages/vote.html";
}



// ================= ADMIN LOGIN =================

function adminLogin() {
    const password = prompt("Enter Admin Password:");

    if (password === "admin123") {
        document.getElementById("adminPanel").style.display = "block";
        alert("Admin access granted");
    } else {
        alert("Wrong password");
    }
}



// ================= OPEN MANAGE PAGE =================

function openManagePage() {
    window.location.href = "../pages/manage.html";
}



// ================= TOGGLE VOTING =================

function toggleVoting() {

    let status = localStorage.getItem("votingStatus");

    if (status === "ON") {
        localStorage.setItem("votingStatus", "OFF");
        alert("🚫 Voting CLOSED");
    } else {
        localStorage.setItem("votingStatus", "ON");
        alert("✅ Voting OPEN");
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
        alert("Please login first");
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



// ================= RESTART VOTING =================

function restartVoting() {

    if (!confirm("Restart voting?")) return;

    localStorage.setItem("votes", JSON.stringify({
        BJP: 0,
        BJD: 0,
        Congress: 0
    }));

    localStorage.setItem("voterList", JSON.stringify([]));

    for (let key in localStorage) {
        if (key.startsWith("voted_") || key.startsWith("votedMobile_")) {
            localStorage.removeItem(key);
        }
    }

    localStorage.setItem("votingStatus", "ON");

    alert("Voting restarted!");
    location.reload();
}



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



// ================= LOAD VOTERS TABLE (manage.html) =================

function loadVoters() {

    const body = document.getElementById("voterTableBody");
    if (!body) return;

    let list = JSON.parse(localStorage.getItem("voterList")) || [];

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

    let list = JSON.parse(localStorage.getItem("voterList"));
    let votes = JSON.parse(localStorage.getItem("votes"));

    const selected = document.querySelectorAll(".voterCheck:checked");

    selected.forEach(box => {
        const voter = list[box.value];

        if (votes[voter.candidate] > 0) {
            votes[voter.candidate]--;
        }

        list[box.value] = null;
    });

    list = list.filter(v => v !== null);

    localStorage.setItem("voterList", JSON.stringify(list));
    localStorage.setItem("votes", JSON.stringify(votes));

    alert("Selected voters removed ✅");
    location.reload();
}

// allow only numbers in mobile field (after page loads)
document.addEventListener("DOMContentLoaded", () => {
    const mobileInput = document.getElementById("mobile");

    if (mobileInput) {
        mobileInput.addEventListener("input", function () {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }
});

// ================= OTP SYSTEM =================

let generatedOTP;

function sendOTP() {

    const user = document.getElementById("username").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const msg = document.getElementById("msg");

    if (user === "" || mobile === "") {
        msg.innerText = "Enter name & mobile";
        return;
    }

    // ✅ mobile validation (10 digits only)
    if (!/^[0-9]{10}$/.test(mobile)) {
        msg.innerText = "Enter valid 10-digit mobile number";
        return;
    }

    // prevent duplicate voting
    if (localStorage.getItem("votedMobile_" + mobile)) {
        alert("You already voted!");
        return;
    }

    // generate OTP
    generatedOTP = Math.floor(1000 + Math.random() * 9000);

    msg.innerText = "🔐 Demo OTP: " + generatedOTP;

    // show OTP box
    document.getElementById("otpBox").classList.add("show");
}



function verifyOTP() {

    const enteredOTP = document.getElementById("otp").value.trim();
    const user = document.getElementById("username").value.trim();
    const mobile = document.getElementById("mobile").value.trim();

    if (enteredOTP == generatedOTP) {

        localStorage.setItem("currentUser", user);
        localStorage.setItem("currentMobile", mobile);

        window.location.href = "pages/vote.html";

    } else {
        alert("Wrong OTP");
    }
}

// ================= CONFETTI RAIN =================

function startConfetti() {

    const canvas = document.getElementById("confetti");
    if (!canvas) return;

    canvas.style.display = "block";

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let pieces = [];

    for (let i = 0; i < 150; i++) {
        pieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 6 + 4,
            speed: Math.random() * 3 + 2,
            angle: Math.random() * Math.PI * 2,
            color: "hsl(" + Math.random() * 360 + ",100%,50%)"
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        pieces.forEach(p => {
            p.y += p.speed;
            p.x += Math.sin(p.angle);

            if (p.y > canvas.height) {
                p.y = -10;
                p.x = Math.random() * canvas.width;
            }

            ctx.fillStyle = p.color;
            ctx.fillRect(p.x, p.y, p.size, p.size);
        });

        requestAnimationFrame(draw);
    }

    draw();

    // stop after 4 seconds
    setTimeout(() => {
        canvas.style.display = "none";
    }, 4000);
}
