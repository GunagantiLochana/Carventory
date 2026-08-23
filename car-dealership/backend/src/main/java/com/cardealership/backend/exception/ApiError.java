package com.cardealership.backend.exception;

public record ApiError(
        int status,
        String message
) {
}
