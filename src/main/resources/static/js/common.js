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

function loadNewUser() {
    const form = document.getElementById("newUserForm");
    if (!form) return;

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const selectedRoles = Array.from(form.role.selectedOptions).map(opt => opt.value);

        const user = {
            username: form.username.value,
            surname: form.surname.value,
            age: parseInt(form.age.value),
            email: form.email.value,
            password: form.password.value,
            roles: selectedRoles
        };

        fetch("/api/admin/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => {
                if (!res.ok)
                    return res.json();
            })
            .then(data => {
                form.reset();
                document.querySelector('button[data-bs-target="#allUsers"]')?.click();
                if (typeof loadUsers === "function") loadUsers();
            })
            .catch(err => {
                console.error(err);
            });
    });
}
