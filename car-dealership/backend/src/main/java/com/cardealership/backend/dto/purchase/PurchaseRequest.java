package com.cardealership.backend.dto.purchase;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record PurchaseRequest(
        @NotNull UUID vehicleId,
        @NotNull @Min(1) Integer quantity
) {
}
