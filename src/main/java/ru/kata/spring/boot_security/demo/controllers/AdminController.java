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
import ru.kata.spring.boot_security.demo.services.UserService;

import java.security.Principal;
import java.util.Set;

@Controller
@RequestMapping("/admin")
public class AdminController {
    private final UserService userService;
    private final AdminService adminService;

    public AdminController(UserService userService,
                           AdminService adminService) {
        this.userService = userService;
        this.adminService = adminService;
    }

    @GetMapping
    public String showAdminPage(Principal principal, Model model) {
        model.addAttribute("user", userService.getUserByName(principal.getName()));
        model.addAttribute("users", adminService.getAllUsers());
        return "pages/admin-page";
    }

    @PostMapping("/addUser")
    public String addUser(@ModelAttribute User user,
                          @RequestParam(name = "role",
                                  defaultValue = "ROLE_USER") Set<String> roles) {
        adminService.addUser(user, adminService.getRolesByName(roles));
        return "redirect:/admin";
    }

    @GetMapping("/editUser")
    public String showEditUserForm(@RequestParam("id") Long id, Model model) {
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
