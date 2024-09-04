create table land_parcels
(
    id               serial
        primary key,
    sbi              varchar(20),
    parcelId         varchar(20),
    areaHa           numeric,
    sheetId          varchar(20),
    landCovers       jsonb,
    agreements       jsonb,
    landUses         jsonb,
    attributes       jsonb,
    geometryWkt      jsonb,
    geometry         jsonb,
    centroidX        numeric,
    centroidY        numeric,
    validFrom        timestamp,
    validTo          timestamp,
    geomAreaSqm      numeric,
    verifiedOn       timestamp,
    verificationtype integer,
    createdOn        timestamp,
    createdBy        varchar(255),
    validated        char,
    lastRefreshDate  timestamp
);