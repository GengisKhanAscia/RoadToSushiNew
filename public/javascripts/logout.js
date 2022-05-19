"use strict";

const logout = document.getElementById("logout");

if (logout) {
    logout.addEventListener("click", () => {
        fetch("/logout", { method: "DELETE" })
            .then(() =>
                window.location = "/");
    });
}