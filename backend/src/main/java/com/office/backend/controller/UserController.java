package com.office.backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @GetMapping("/me")
    public Object me(@AuthenticationPrincipal UserDetails ud) {
        return ud != null ? ud.getUsername() : "anonymous";
    }
}
