package com.cardealership.backend.dto.vehicle;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

public record VehicleResponse(
        UUID id,
        String make,
        String model,
        String category,
        BigDecimal price,
        Integer quantity,
        String description,
        String imageUrl,
        OffsetDateTime createdAt,
        OffsetDateTime updatedAt
) {
}
