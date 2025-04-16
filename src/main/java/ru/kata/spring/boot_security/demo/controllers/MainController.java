package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    @GetMapping("/")
    public String redirectToLoginPage() {
        return "redirect:/login-page.html";
    }

    @GetMapping("/login")
    public String formLogin() {
        return "redirect:/";
    }
}
