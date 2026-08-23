CREATE TABLE vehicles (
    id UUID PRIMARY KEY,
    make VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    price NUMERIC(12, 2) NOT NULL,
    quantity INTEGER NOT NULL,
    description TEXT,
    image_url VARCHAR(1000),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL,

    CONSTRAINT chk_vehicles_price
        CHECK (price > 0),

    CONSTRAINT chk_vehicles_quantity
        CHECK (quantity >= 0)
);