package com.shopping.backend.service;

import com.shopping.backend.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtService {

    private final SecretKey key;

    private final long accessExpire;
    private final long refreshExpire;


    public JwtService(
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.access-expiration}") long accessExpire,
            @Value("${jwt.refresh-expiration}") long refreshExpire
    ) {

        this.key = Keys.hmacShaKeyFor(
                secret.getBytes(StandardCharsets.UTF_8)
        );

        this.accessExpire = accessExpire;
        this.refreshExpire = refreshExpire;
    }


    public String generateAccessToken(User user) {

        Date now = new Date();

        return Jwts.builder()
                .subject(user.getUsername())
                .claim("role", user.getRole().name())
                .claim("type", "ACCESS")
                .issuedAt(now)
                .expiration(
                        new Date(now.getTime() + accessExpire)
                )
                .signWith(key)
                .compact();
    }


    public String generateRefreshToken(User user) {

        Date now = new Date();

        return Jwts.builder()
                .subject(user.getUsername())
                .claim("role", user.getRole().name())
                .claim("type", "REFRESH")
                .issuedAt(now)
                .expiration(
                        new Date(now.getTime() + refreshExpire)
                )
                .signWith(key)
                .compact();
    }


    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public String extractType(String token) {
        return extractAllClaims(token).get("type", String.class);
    }

    public boolean isAccessToken(String token) {
        return "ACCESS".equals(extractType(token));
    }

    public boolean isRefreshToken(String token) {
        return "REFRESH".equals(extractType(token));
    }

    public boolean isTokenValid(String token) {

        return !isTokenExpired(token);
    }

    public boolean isTokenExpired(String token) {

        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {

        return extractClaim(token, Claims::getExpiration);
    }

    private <T> T extractClaim(
            String token,
            Function<Claims, T> resolver) {

        Claims claims = extractAllClaims(token);

        return resolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {

        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
    public String extractRole(String token) {
        return extractAllClaims(token).get("role", String.class);
    }
}
