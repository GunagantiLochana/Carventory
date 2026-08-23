package com.cardealership.backend.dto.auth;

public record AuthResponse(
        String token,
        AuthUserResponse user
) {
}
