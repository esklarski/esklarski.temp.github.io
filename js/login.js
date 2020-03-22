function login_click() {
    // collect username for use on next page
    var usernameInput = document.getElementById("usernameInput").value;

    // authentication
    location.href = fakeAuthentication(usernameInput);
}

function fakeAuthentication(username) {
    if (usernameInput != "") {
        sessionStorage.username = username.toLowerCase();
    } else {
        sessionStorage.username = "demo_agent";
    }

    return "relax_realty.html";
}