package com.cardealership.backend.service;

import com.cardealership.backend.dto.vehicle.VehicleRequest;
import com.cardealership.backend.dto.vehicle.VehicleResponse;
import com.cardealership.backend.entity.Vehicle;
import com.cardealership.backend.repository.VehicleRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class VehicleService {

    private final VehicleRepository vehicleRepository;

    public VehicleService(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    @Transactional(readOnly = true)
    public List<VehicleResponse> findAll() {
        return vehicleRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public VehicleResponse findById(UUID id) {
        return toResponse(findVehicle(id));
    }

    @Transactional
    public VehicleResponse create(VehicleRequest request) {
        Vehicle vehicle = new Vehicle();
        applyRequest(vehicle, request);
        return toResponse(vehicleRepository.save(vehicle));
    }

    @Transactional
    public VehicleResponse update(UUID id, VehicleRequest request) {
        Vehicle vehicle = findVehicle(id);
        applyRequest(vehicle, request);
        return toResponse(vehicleRepository.save(vehicle));
    }

    @Transactional
    public void delete(UUID id) {
        Vehicle vehicle = findVehicle(id);
        vehicleRepository.delete(vehicle);
    }

    private Vehicle findVehicle(UUID id) {
        return vehicleRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Vehicle not found"));
    }

    private void applyRequest(Vehicle vehicle, VehicleRequest request) {
        vehicle.setMake(request.make().trim());
        vehicle.setModel(request.model().trim());
        vehicle.setCategory(request.category().trim());
        vehicle.setPrice(request.price());
        vehicle.setQuantity(request.quantity());
        vehicle.setDescription(request.description());
        vehicle.setImageUrl(request.imageUrl());
    }

    private VehicleResponse toResponse(Vehicle vehicle) {
        return new VehicleResponse(
                vehicle.getId(),
                vehicle.getMake(),
                vehicle.getModel(),
                vehicle.getCategory(),
                vehicle.getPrice(),
                vehicle.getQuantity(),
                vehicle.getDescription(),
                vehicle.getImageUrl(),
                vehicle.getCreatedAt(),
                vehicle.getUpdatedAt()
        );
    }
}
