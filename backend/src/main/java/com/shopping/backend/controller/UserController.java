package com.shopping.backend.controller;

import com.shopping.backend.dto.request.AuthenticationRequest;
import com.shopping.backend.dto.request.User.RequestCreateUser;
import com.shopping.backend.dto.response.ApiResponse;
import com.shopping.backend.entity.User;
import com.shopping.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService  userService;

    @PostMapping("/create")
    public ApiResponse<?> createUser(@RequestBody RequestCreateUser request) {

        ApiResponse<Object> response = new ApiResponse<>();

        try {
            User user = userService.createUser(request);

            response.setCode("200");
            response.setMessage("success");
            response.setResult(user);

        } catch (RuntimeException e) {
            response.setCode("400");
            response.setMessage(e.getMessage());
        }

        return response;
    }
    @GetMapping("/check")
    public String test() {
        return "JWT OK";
    }
}
