﻿import settings from "./settings.js";
import common from "./common.js";

window.onload = () => {
    "use strict";

    localStorage.removeItem("auth");

    function login() {
        const user = {
            "email": document.getElementById("email").value,
            "password": document.getElementById("password").value
        };

        common.post(settings.uri + "patient-identity/login?d=frontend", (token) => {
            const auth = {
                "email": user.email,
                "token": token
            };
            localStorage.setItem("auth", JSON.stringify(auth));
            location.href = "/services.html";
        }, () => {
            alert("Wrong credentials.");
        }, user);
    };

    document.getElementById("login").onclick = () => {
        login();
    };

    document.getElementById("password").onkeyup = (e) => {
        if (e.key === 'Enter') {
            login();
        }
    };

    document.getElementById("register").onclick = () => {
        location.href = "/register.html";
    };
};