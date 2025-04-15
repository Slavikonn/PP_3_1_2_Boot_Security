document.addEventListener("DOMContentLoaded", () => {
    loadFragment("navbar-container", "/fragments/navbar.html", loadCurrentUser);
    loadFragment("user-info", "/fragments/user-info.html", loadUserInfo);
});
