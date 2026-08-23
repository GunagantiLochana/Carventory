CREATE TABLE purchase_transactions (
    id UUID PRIMARY KEY,
    vehicle_id UUID NOT NULL,
    user_id UUID NOT NULL,
    quantity INTEGER NOT NULL,
    price_at_purchase NUMERIC(12, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,

    CONSTRAINT fk_purchase_vehicle
        FOREIGN KEY (vehicle_id)
        REFERENCES vehicles(id),

    CONSTRAINT fk_purchase_user
        FOREIGN KEY (user_id)
        REFERENCES users(id),

    CONSTRAINT chk_purchase_quantity
        CHECK (quantity > 0),

    CONSTRAINT chk_purchase_price
        CHECK (price_at_purchase > 0)
);
