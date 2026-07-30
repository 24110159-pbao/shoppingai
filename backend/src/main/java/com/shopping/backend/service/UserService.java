package com.shopping.backend.service;

import com.shopping.backend.dto.request.User.RequestCreateUser;
import com.shopping.backend.dto.response.UserResponse;
import com.shopping.backend.entity.Role;
import com.shopping.backend.entity.User;
import com.shopping.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;



@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;
    private final JwtService jwtService;

    public User createUser(RequestCreateUser request) {

        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username đã tồn tại");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email đã tồn tại");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(encoder.encode(request.getPassword()));
        user.setFullName(request.getFullName());
        user.setRole(Role.USER);

        return userRepository.save(user);
    }
    public UserResponse getCurrentUser(String token) {

        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        if (!jwtService.isAccessToken(token) || !jwtService.isTokenValid(token)) {
            throw new RuntimeException("Access token không hợp lệ");
        }

        String username = jwtService.extractUsername(token);

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User không tồn tại"));

        return new UserResponse(
                user.getUsername(),
                user.getFullName(),
                user.getEmail(),
                user.getCreatedAt()
        );
    }


}
