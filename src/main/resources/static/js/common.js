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
                    <td><button class="btn btn-info btn-sm" onclick="openEditModal(${user.id})">Edit</button></td>
                    <td><button class="btn btn-danger btn-sm" onclick="openDeleteModal(${user.id})">Delete</button></td>
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

function openEditModal(id) {
    fetch(`/api/admin/users/${id}`)
        .then(res => res.json())
        .then(user => {
            document.getElementById("edit-id-hidden").value = user.id;
            document.getElementById("edit-id-disabled").value = user.id;
            document.getElementById("edit-username").value = user.username;
            document.getElementById("edit-surname").value = user.surname;
            document.getElementById("edit-age").value = user.age;
            document.getElementById("edit-email").value = user.email;
            document.getElementById("edit-password").value = "";

            const roleSelect = document.getElementById("edit-roles");
            Array.from(roleSelect.options).forEach(opt => {
                opt.selected = user.roles.includes(opt.value);
            });

            const modal = new bootstrap.Modal(document.getElementById("editUserModal"));
            modal.show();
        });
}

document.addEventListener("submit", function (event) {
    const form = event.target;

    if (form && form.id === "editUserForm") {
        event.preventDefault();

        const id = document.getElementById("edit-id-hidden").value;
        const user = {
            id: parseInt(id),
            username: document.getElementById("edit-username").value,
            surname: document.getElementById("edit-surname").value,
            age: parseInt(document.getElementById("edit-age").value),
            email: document.getElementById("edit-email").value,
            password: document.getElementById("edit-password").value,
            roles: Array.from(document.getElementById("edit-roles").selectedOptions).map(opt => opt.value)
        };

        fetch(`/api/admin/users/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => {
                if (!res.ok) throw new Error("Ошибка при обновлении пользователя");
                return res.json();
            })
            .then(() => {
                loadUsers();
                const modal = bootstrap.Modal.getInstance(document.getElementById("editUserModal"));
                modal.hide();
            })
            .catch(err => {
                console.error(err);
                alert("Ошибка при обновлении пользователя");
            });
    }
});

function openDeleteModal(id) {
    fetch(`/api/admin/users/${id}`)
        .then(res => res.json())
        .then(user => {
            document.getElementById("delete-id-hidden").value = user.id;
            document.getElementById("delete-id-disabled").value = user.id;
            document.getElementById("delete-username").value = user.username;
            document.getElementById("delete-surname").value = user.surname;
            document.getElementById("delete-age").value = user.age;
            document.getElementById("delete-email").value = user.email;

            const modal = new bootstrap.Modal(document.getElementById("deleteUserModal"));
            modal.show();
        })
}

document.addEventListener("submit", function (event) {
    const form = event.target;

    if (form && form.id === "deleteUserForm") {
        event.preventDefault();

        const id = document.getElementById("delete-id-hidden").value;
        fetch(`/api/admin/users/${id}`, {
            method: "DELETE",
        })
            .then(res => {
                if (!res.ok) throw new Error("Ошибка при удалении пользователя");
                res.json();
            })
            .then(() => {
                loadUsers();
                const modal = bootstrap.Modal.getInstance(document.getElementById("deleteUserModal"));
                modal.hide();
            })
            .catch(err => {
                console.error(err);
                alert("Ошибка при удалении пользователя");
            });
    }
});
