package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import ru.kata.spring.boot_security.demo.entities.User;
import ru.kata.spring.boot_security.demo.services.AdminService;

import java.util.Set;

@Controller
@RequestMapping("/admin")
public class AdminController {
    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping
    public String getAllUsers(Model model) {
        model.addAttribute("users", adminService.getAllUsers());
        return "admin-page";
    }

    @GetMapping("/createUser")
    public String createUser(Model model) {
        model.addAttribute("user", new User());
        return "add-user-page";
    }

    @PostMapping("/addUser")
    public String addUser(@ModelAttribute User user,
                          @RequestParam(name = "role",
                                  defaultValue = "ROLE_USER") Set<String> roles) {
        adminService.addUser(user, adminService.getRolesByName(roles));
        return "redirect:/admin";
    }

    @GetMapping("/editUser")
    public String editUser(@RequestParam("id") Long id, Model model) {
        model.addAttribute("user", adminService.findById(id));
        return "edit-user-page";
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
