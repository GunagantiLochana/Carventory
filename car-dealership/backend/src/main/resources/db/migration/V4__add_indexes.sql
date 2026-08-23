CREATE INDEX idx_vehicles_make ON vehicles(make);
CREATE INDEX idx_vehicles_model ON vehicles(model);
CREATE INDEX idx_vehicles_category ON vehicles(category);
CREATE INDEX idx_vehicles_price ON vehicles(price);

CREATE INDEX idx_purchase_vehicle ON purchase_transactions(vehicle_id);
CREATE INDEX idx_purchase_user ON purchase_transactions(user_id);