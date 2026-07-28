package com.shopping.backend.controller;

import com.shopping.backend.dto.request.AuthenticationRequest;
import com.shopping.backend.dto.request.RefreshTokenRequest;
import com.shopping.backend.dto.response.AuthenticationResponse;
import com.shopping.backend.service.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;


    @PostMapping("/login")
    public AuthenticationResponse login(@Valid
            @RequestBody AuthenticationRequest request) {

        return authenticationService.login(request);
    }


    @PostMapping("/refresh")
    public AuthenticationResponse refresh(
            @RequestBody RefreshTokenRequest request) {

        return authenticationService.refreshToken(request.getRefreshToken());
    }

}