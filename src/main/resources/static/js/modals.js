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
