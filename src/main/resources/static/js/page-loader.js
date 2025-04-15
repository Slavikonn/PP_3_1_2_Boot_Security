document.addEventListener("DOMContentLoaded", () => {
    loadFragment("navbar-container", "/fragments/navbar.html", loadCurrentUser);
    loadFragment("user-info", "/fragments/tables/user-info.html", loadUserInfo);
});
