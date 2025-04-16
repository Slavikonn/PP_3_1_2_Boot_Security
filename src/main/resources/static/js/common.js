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

function loadUsers() {
    const tbody = document.querySelector("#multiUserTable tbody");
    if (!tbody) return;

    fetch("/api/admin/users")
        .then(res => res.json())
        .then(users => {
            tbody.innerHTML = "";
            users.forEach(user => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.surname}</td>
                    <td>${user.age}</td>
                    <td>${user.email}</td>
                    <td>${user.roles.map(r => r.replace("ROLE_", "")).join(", ")}</td>
                    <td><button class="btn btn-info btn-sm" onclick="...">Edit</button></td>
                    <td><button class="btn btn-danger btn-sm" onclick="...">Delete</button></td>
                `;
                tbody.appendChild(row);
            });
        });
}
