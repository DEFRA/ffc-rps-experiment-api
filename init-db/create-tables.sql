create table land_parcels
(
    id               serial
        primary key,
    sbi              varchar(20),
    parcelId         varchar(20),
    areaHa           varchar(20),
    sheetId          varchar(20),
    landCovers       jsonb,
    agreements       jsonb,
    landUses         jsonb,
    attributes       jsonb,
    geometryWkt      jsonb,
    geometry         jsonb,
    centroidX        varchar(20),
    centroidY        varchar(20),
    validFrom        timestamp,
    validTo          timestamp,
    geomAreaSqm      varchar(20),
    verifiedOn       timestamp,
    verificationtype integer,
    createdOn        timestamp,
    createdBy        varchar(255),
    validated        char,
    lastRefreshDate  timestamp
);