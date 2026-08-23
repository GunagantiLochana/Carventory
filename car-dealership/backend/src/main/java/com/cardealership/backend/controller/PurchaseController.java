package com.cardealership.backend.controller;

import com.cardealership.backend.dto.purchase.PurchaseRequest;
import com.cardealership.backend.dto.purchase.PurchaseResponse;
import com.cardealership.backend.service.PurchaseService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/purchases")
public class PurchaseController {

    private final PurchaseService purchaseService;

    public PurchaseController(PurchaseService purchaseService) {
        this.purchaseService = purchaseService;
    }

    @PostMapping
    public ResponseEntity<PurchaseResponse> purchase(
            @Valid @RequestBody PurchaseRequest request,
            Authentication authentication) {

        UUID userId = UUID.fromString(authentication.getName());

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(purchaseService.purchase(userId, request));
    }
}
