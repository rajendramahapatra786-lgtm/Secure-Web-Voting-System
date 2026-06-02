// ================= TOAST =================

function showToast(message, type = "success") {

    const toast = document.createElement("div");

    toast.className = `toast ${type}`;

    toast.innerText = message;

    document.getElementById("toastContainer")
        .appendChild(toast);

    setTimeout(() => {

    toast.style.animation = "slideOut 0.5s ease forwards";

    setTimeout(() => {
        toast.remove();
    }, 500);

}, 3000);
}

// ================= CUSTOM ALERT =================

function showAlert(title, message) {

    document.getElementById("modalTitle").innerText = title;

    document.getElementById("modalMessage").innerText = message;

    document.getElementById("modalInputArea").innerHTML = "";

    document.getElementById("customModal").style.display = "flex";

    document.getElementById("modalCancelBtn").style.display = "none";

    document.getElementById("modalOkBtn").onclick = () => {
        document.getElementById("customModal").style.display = "none";
    };
}