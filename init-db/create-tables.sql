CREATE TABLE land_parcels (
    id SERIAL PRIMARY KEY,
    sbi VARCHAR(20),
    parcelId VARCHAR(20),
    areaHa NUMERIC,
    sheetId VARCHAR(20),
    landCovers JSONB,
    agreements JSONB,
    landUses JSONB,
    attributes JSONB,
    geometrywkt JSONB,
    geometry JSONB
);
