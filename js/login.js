function login_click() {
    // collect username for use on next page
    sessionStorage.username = document.getElementById("usernameInput").value;

    // the server should return this value after authentication
    location.href = "relax_realty.html";
}