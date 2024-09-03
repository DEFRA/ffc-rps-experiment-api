-- Drop existing tables if they exist
DROP TABLE IF EXISTS land_parcels;
DROP TABLE IF EXISTS actions;

-- Create the modified land_parcels table
CREATE TABLE land_parcels (
    id SERIAL,
    sbi VARCHAR(20),
    parcelId VARCHAR(20),
    areaHa NUMERIC,
    sheetId VARCHAR(20),
    landCovers JSONB,
    agreements JSONB,
    landUses JSONB,
    attributes JSONB,
    PRIMARY KEY (id, sbi)
);