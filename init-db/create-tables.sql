create table land_parcels
(
    id               serial
        primary key,
    sbi              char(20),
    parcelId         char(20),
    areaHa           char(20),
    sheetId          char(20),
    landCovers       jsonb,
    agreements       jsonb,
    landUses         jsonb,
    attributes       jsonb,
    geometryWkt      jsonb,
    geometry         jsonb,
    centroidX        char(20),
    centroidY        char(20),
    validFrom        timestamp,
    validTo          timestamp,
    geomAreaSqm      varchar(20),
    verifiedOn       timestamp,
    verificationtype integer,
    createdOn        timestamp,
    createdBy        char(255),
    validated        char,
    lastRefreshDate  timestamp
);