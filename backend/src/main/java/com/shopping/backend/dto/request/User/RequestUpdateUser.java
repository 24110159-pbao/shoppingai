package com.shopping.backend.dto.request.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestUpdateUser {
    private String password;
    private String fullName;
    private String email;
}
