package com.cardealership.backend.service;

import com.cardealership.backend.dto.purchase.PurchaseRequest;
import com.cardealership.backend.dto.purchase.PurchaseResponse;
import com.cardealership.backend.entity.PurchaseTransaction;
import com.cardealership.backend.entity.User;
import com.cardealership.backend.entity.Vehicle;
import com.cardealership.backend.repository.PurchaseTransactionRepository;
import com.cardealership.backend.repository.UserRepository;
import com.cardealership.backend.repository.VehicleRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class PurchaseService {

    private final PurchaseTransactionRepository purchaseTransactionRepository;
    private final VehicleRepository vehicleRepository;
    private final UserRepository userRepository;

    public PurchaseService(
            PurchaseTransactionRepository purchaseTransactionRepository,
            VehicleRepository vehicleRepository,
            UserRepository userRepository) {
        this.purchaseTransactionRepository = purchaseTransactionRepository;
        this.vehicleRepository = vehicleRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public PurchaseResponse purchase(UUID userId, PurchaseRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Vehicle vehicle = vehicleRepository.findById(request.vehicleId())
                .orElseThrow(() -> new IllegalArgumentException("Vehicle not found"));

        if (vehicle.getQuantity() < request.quantity()) {
            throw new IllegalArgumentException("Insufficient vehicle stock");
        }

        var priceAtPurchase = vehicle.getPrice();

        vehicle.setQuantity(vehicle.getQuantity() - request.quantity());
        vehicleRepository.save(vehicle);

        PurchaseTransaction transaction = new PurchaseTransaction();
        transaction.setVehicle(vehicle);
        transaction.setUser(user);
        transaction.setQuantity(request.quantity());
        transaction.setPriceAtPurchase(priceAtPurchase);

        PurchaseTransaction saved = purchaseTransactionRepository.save(transaction);

        return new PurchaseResponse(
                saved.getId(),
                vehicle.getId(),
                user.getId(),
                saved.getQuantity(),
                saved.getPriceAtPurchase(),
                saved.getCreatedAt()
        );
    }
}
