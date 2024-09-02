CREATE TABLE land_parcels (
    id SERIAL PRIMARY KEY,
    data JSONB NOT NULL
);

CREATE TABLE actions (
    id SERIAL PRIMARY KEY,
    data JSONB NOT NULL
);
