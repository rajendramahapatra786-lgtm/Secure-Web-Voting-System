// ================= USER LOGIN =============================

function login() {
    const user = document.getElementById("username").value.trim();

    if (user === "") {
        document.getElementById("msg").innerText = "Please enter username";
        return;
    }

    // ✅ name validation
    if (!/^[A-Za-z ]+$/.test(user)) {
        document.getElementById("msg").innerText = "Name must contain only letters";
        return;
    }

    localStorage.setItem("currentUser", user);
    window.location.href = "pages/vote.html";
}

// allow only letters & spaces in username while typing
document.addEventListener("DOMContentLoaded", () => {
    const nameInput = document.getElementById("username");

    if (nameInput) {
        nameInput.addEventListener("input", function () {
            this.value = this.value.replace(/[^A-Za-z ]/g, '');
        });
    }
});

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
