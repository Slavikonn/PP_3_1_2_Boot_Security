package ru.kata.spring.boot_security.demo.utils;

import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.entities.Role;
import ru.kata.spring.boot_security.demo.entities.User;
import ru.kata.spring.boot_security.demo.repositories.RoleRepository;
import ru.kata.spring.boot_security.demo.repositories.UserRepository;

import javax.annotation.PostConstruct;
import java.util.Collections;
import java.util.Set;

@Component
public class DataInitializer {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public DataInitializer(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @PostConstruct
    public void init() {
        if (roleRepository.findByRoleName("ROlE_ADMIN").isEmpty()) {
            roleRepository.save(new Role("ROLE_ADMIN"));
        }
        if (roleRepository.findByRoleName("ROLE_USER").isEmpty()) {
            roleRepository.save(new Role("ROLE_USER"));
        }
        if (userRepository.findByUsername("admin").isEmpty()) {
            Role adminRole = roleRepository.findByRoleName("ROLE_ADMIN").get();
            Role userRole = roleRepository.findByRoleName("ROLE_USER").get();
            User admin = new User("admin", "pass", "admin",
                    (byte) 32, "admin@mail.ru", Set.of(adminRole, userRole));
            userRepository.save(admin);
        }
        if (userRepository.findByUsername("user").isEmpty()) {
            Role userRole = roleRepository.findByRoleName("ROLE_USER").get();
            User user = new User("user", "pass", "user",
                    (byte) 42, "user@mail.ru", Collections.singleton(userRole));
            userRepository.save(user);
        }
    }
}
