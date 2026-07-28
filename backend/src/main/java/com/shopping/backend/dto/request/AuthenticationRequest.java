package com.shopping.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class AuthenticationRequest {
    @NotBlank
    private String username;
    @NotBlank
    private String password;
}
