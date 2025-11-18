package com.office.backend.presentation.controllers;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/test")
@CrossOrigin
public class TestController {
    @PostMapping("/receive")
    public String receiveData(@RequestBody MessageRequest request) {
        System.out.println("Received from Frontend: " + request.getMessage());
        return "Received: " + request.getMessage();
    }

    public static class MessageRequest {
        private String message;
        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
    }
}