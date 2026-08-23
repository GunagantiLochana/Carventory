package com.cardealership.backend.dto.vehicle;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

public record VehicleRequest(
        @NotBlank @Size(max = 100) String make,
        @NotBlank @Size(max = 100) String model,
        @NotBlank @Size(max = 50) String category,
        @NotNull @DecimalMin(value = "0.01") BigDecimal price,
        @NotNull @Min(0) Integer quantity,
        @Size(max = 5000) String description,
        @Size(max = 1000) String imageUrl
) {
}
