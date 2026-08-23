package com.cardealership.backend.dto.auth;

public record AuthUserResponse(
        String id,
        String name,
        String email,
        String role
) {
}
