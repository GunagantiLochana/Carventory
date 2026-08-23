package com.cardealership.backend.dto.purchase;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

public record PurchaseResponse(
        UUID id,
        UUID vehicleId,
        UUID userId,
        Integer quantity,
        BigDecimal priceAtPurchase,
        OffsetDateTime createdAt
) {
}
