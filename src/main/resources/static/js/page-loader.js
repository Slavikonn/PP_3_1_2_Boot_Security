function loadFragment(id, url, callback) {
    fetch(url)
        .then(res => res.text())
        .then(html => {
            document.getElementById(id).innerHTML = html;
            if (callback) callback();
        });
}

document.addEventListener("DOMContentLoaded", () => {
    loadFragment("navbar-container", "/fragments/navbar.html", loadCurrentUser);
    loadFragment("user-info", "/fragments/tables/user-info.html", loadUserInfo);
    loadFragment("all-users", "/fragments/tables/all-users.html", loadUsers);
    loadFragment("new-user", "/fragments/forms/new-user.html", loadNewUser);
    loadFragment("edit-user-modal", "/fragments/modals/edit-user.html");
});
