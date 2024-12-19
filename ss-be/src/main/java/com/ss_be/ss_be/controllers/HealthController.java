package com.ss_be.ss_be.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("/health")
    ResponseEntity<String> getHealth() {
        return ResponseEntity.ok("application healthy");
    }
}
