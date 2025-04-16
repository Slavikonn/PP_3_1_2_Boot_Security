function loadFragment(id, url, callback) {
    fetch(url)
        .then(res => res.text())
        .then(html => {
            document.getElementById(id).innerHTML = html;
            if (callback) callback();
        });
}

function loadCurrentUser() {
    fetch("/api/user")
        .then(res => res.json())
        .then(user => {
            const roles = user.roles.map(r => r.replace("ROLE_", "")).join(" ");
            const userInfoElement = document.getElementById("navbarUserInfo");
            userInfoElement.innerHTML = `<span style="font-weight: bold;">${user.email}</span> with roles: ${roles}`;
        })
}

function loadUserInfo() {
    const tbody = document.querySelector("#singleUserTable tbody");
    fetch("/api/user")
        .then(res => res.json())
        .then(user => {
            tbody.innerHTML = "";
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.username}</td>
                <td>${user.surname}</td>
                <td>${user.age}</td>
                <td>${user.email}</td>
                <td>${user.roles.map(r => r.replace("ROLE_", "")).join(", ")}</td>
            `;
            tbody.appendChild(row);
        })
}

document.addEventListener("DOMContentLoaded", () => {
    loadFragment("navbar-container", "/fragments/navbar.html", loadCurrentUser);
    loadFragment("user-info", "/fragments/tables/user-info.html", loadUserInfo);
    loadFragment("all-users", "/fragments/tables/all-users.html", loadUsers);
    loadFragment("new-user", "/fragments/forms/new-user.html", loadNewUser);
    loadFragment("edit-user-modal", "/fragments/modals/edit-user.html");
    loadFragment("delete-user-modal", "/fragments/modals/delete-user.html");
});
