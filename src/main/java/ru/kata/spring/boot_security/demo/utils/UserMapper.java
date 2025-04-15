package ru.kata.spring.boot_security.demo.utils;

import ru.kata.spring.boot_security.demo.dto.UserDto;
import ru.kata.spring.boot_security.demo.entities.Role;
import ru.kata.spring.boot_security.demo.entities.User;

import java.util.Set;
import java.util.stream.Collectors;

public class UserMapper {
    public static UserDto toDto(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setSurname(user.getSurname());
        dto.setAge(user.getAge());
        dto.setEmail(user.getEmail());
        dto.setPassword(user.getPassword());

        Set<String> roles = user.getRoles()
                .stream().map(Role::getRoleName)
                .collect(Collectors.toSet());

        dto.setRoles(roles);
        return dto;
    }

    public static User toEntity(UserDto userDto) {
        User user = new User();
        user.setId(userDto.getId());
        user.setUsername(userDto.getUsername());
        user.setSurname(userDto.getSurname());
        user.setAge(userDto.getAge());
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());
        return user;
    }
}
