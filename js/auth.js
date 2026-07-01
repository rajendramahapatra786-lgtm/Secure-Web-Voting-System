const AUTH_STATE = {
    generatedOTP: null
};

// ================= USER LOGIN =============================

function login() {
    const user = document.getElementById("username").value.trim();
    const msg = document.getElementById("msg");

    const nameError = validateInput(
        user,
        /^[A-Za-z ]+$/,
        "Enter valid name"
    );

    if (nameError) {
        msg.innerText = nameError;
        return;
    }

    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, user);
    window.location.href = "pages/vote.html";
}

function validateInput(value, regex, message) {
    if (!value.trim()) {
        return message;
    }

    if (regex && !regex.test(value)) {
        return message;
    }

    return null;
}

// allow only letters & spaces in username while typing
function initNameValidation() {
    const nameInput = document.getElementById("username");

    if (nameInput) {
        nameInput.addEventListener("input", function () {
            this.value = this.value.replace(/[^A-Za-z ]/g, "");
        });
    }
}

// ================= ADMIN LOGIN =================

function adminLogin() {
    const password = prompt("Enter Admin Password:");

    if (password === ADMIN_CONFIG.PASSWORD){
        document.getElementById("adminPanel").style.display = "block";
        alert("Admin access granted");
    } else {
        alert("Wrong password");
    }
}

// allow only numbers in mobile field (after page loads)
function initMobileValidation() {
    const mobileInput = document.getElementById("mobile");

    if (mobileInput) {
        mobileInput.addEventListener("input", function () {
            this.value = this.value.replace(/[^0-9]/g, "");
        });
    }
}


// ================= OTP SYSTEM =================

let generatedOTP;

function sendOTP() {

    const user = document.getElementById("username").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const msg = document.getElementById("msg");

    const nameError = validateInput(
        user,
        /^[A-Za-z ]+$/,
        "Enter valid name"
    );

    if (nameError) {
        msg.innerText = nameError;
        return;
    }

    const mobileError = validateInput(
        mobile,
        /^[0-9]{10}$/,
        "Enter valid 10-digit mobile number"
    );

    if (mobileError) {
        msg.innerText = mobileError;
        return;
    }

    // prevent duplicate voting
    if (localStorage.getItem(STORAGE_KEYS.VOTED_MOBILE + mobile)) {
        showToast("You already voted!", "warning");
        return;
    }

    // generate OTP
    AUTH_STATE.generatedOTP = Math.floor(
    1000 + Math.random() * 9000
);

    msg.innerText = "🔐 Demo OTP: " + AUTH_STATE.generatedOTP;

    // show OTP box
    document.getElementById("otpBox").classList.add("show");
}

function verifyOTP() {

    const enteredOTP = document.getElementById("otp").value.trim();
    const user = document.getElementById("username").value.trim();
    const mobile = document.getElementById("mobile").value.trim();

    if (enteredOTP == AUTH_STATE.generatedOTP) {

        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, user);
        localStorage.setItem(STORAGE_KEYS.CURRENT_MOBILE, mobile);

        window.location.href = "pages/vote.html";

    } else {
        showToast("Wrong OTP", "error");
    }
}

function initButtons() {
    const sendOtpBtn = document.getElementById("sendOtpBtn");
    const verifyOtpBtn = document.getElementById("verifyOtpBtn");
    const adminBtn = document.getElementById("adminBtn");

    if (sendOtpBtn) {
        sendOtpBtn.addEventListener("click", sendOTP);
    }

    if (verifyOtpBtn) {
        verifyOtpBtn.addEventListener("click", verifyOTP);
    }

    if (adminBtn) {
        adminBtn.addEventListener("click", adminLogin);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    initNameValidation();
    initMobileValidation();
    initButtons();
});