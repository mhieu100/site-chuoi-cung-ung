package com.project.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;

import com.project.backend.exception.InvalidException;
import com.project.backend.model.User;
import com.project.backend.service.AuthService;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) throws InvalidException {
        return ResponseEntity.ok().body(authService.registerUser(user));
    }

    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody User user, HttpSession session) throws InvalidException {
        session.setAttribute("walletAddress", user.getWalletAddress() != null ? user.getWalletAddress().toLowerCase() : null);
        return ResponseEntity.ok().body(authService.loginUser(user.getWalletAddress()));
    }

    @GetMapping("/account")
    public ResponseEntity<User> getProfile(HttpSession session) throws InvalidException {
        String walletAddress = (String) session.getAttribute("walletAddress");
        return ResponseEntity.ok().body(authService.loginUser(walletAddress));
    }
  
    @PostMapping("/logout")
    public ResponseEntity<String> logoutUser(HttpSession session) {
        session.removeAttribute("walletAddress");
        return ResponseEntity.ok().body("Logout successfully");
    }
}
