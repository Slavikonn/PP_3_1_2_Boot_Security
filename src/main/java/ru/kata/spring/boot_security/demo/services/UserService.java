package ru.kata.spring.boot_security.demo.services;

import ru.kata.spring.boot_security.demo.entities.User;

public interface UserService {
    User getUserByName(String username);
}
