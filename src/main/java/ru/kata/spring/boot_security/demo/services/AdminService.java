package ru.kata.spring.boot_security.demo.services;

import ru.kata.spring.boot_security.demo.entities.Role;
import ru.kata.spring.boot_security.demo.entities.User;

import java.util.List;
import java.util.Set;

public interface AdminService {
    List<User> getAllUsers();

    User findById(Long id);

    void addUser(User user, Set<Role> roles);

    void updateUser(User user, Set<Role> roles);

    void deleteUser(Long id);

    Set<Role> getRolesByName(Set<String> roles);
}
