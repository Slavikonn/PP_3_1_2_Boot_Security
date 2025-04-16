package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import ru.kata.spring.boot_security.demo.dto.UserDto;
import ru.kata.spring.boot_security.demo.entities.User;
import ru.kata.spring.boot_security.demo.services.AdminService;
import ru.kata.spring.boot_security.demo.utils.UserMapper;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/api/admin")
public class AdminController {
    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> userDtos = adminService.getAllUsers()
                .stream().map(UserMapper::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(userDtos);
    }

    @PostMapping("/addUser")
    public String addUser(@ModelAttribute User user,
                          @RequestParam(name = "role",
                                  defaultValue = "ROLE_USER") Set<String> roles) {
        adminService.addUser(user, adminService.getRolesByName(roles));
        return "redirect:/admin";
    }

    @PostMapping("/updateUser")
    public String updateUser(@ModelAttribute User user,
                             @RequestParam(name = "role",
                                     defaultValue = "ROLE_USER") Set<String> roles) {
        adminService.updateUser(user, adminService.getRolesByName(roles));
        return "redirect:/admin";
    }

    @PostMapping("/deleteUser")
    public String deleteUser(@RequestParam("id") Long id) {
        adminService.deleteUser(id);
        return "redirect:/admin";
    }
}
