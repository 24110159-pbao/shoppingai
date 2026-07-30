package com.shopping.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class UserResponse {

    private String username;
    private String fullName;
    private String email;
    private LocalDateTime createdAt;
}