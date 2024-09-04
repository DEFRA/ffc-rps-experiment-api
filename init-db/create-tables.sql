create table land_parcels
(
    id               serial
        primary key,
    sbi              text,
    parcelId         text,
    areaHa           text,
    sheetId          text,
    landCovers       jsonb,
    agreements       jsonb,
    landUses         jsonb,
    attributes       jsonb,
    geometryWkt      jsonb,
    geometry         jsonb,
    centroidX        text,
    centroidY        text,
    validFrom        timestamp,
    validTo          timestamp,
    geomAreaSqm      text,
    verifiedOn       timestamp,
    verificationType integer,
    createdOn        timestamp,
    createdBy        text,
    validated        text,
    lastRefreshDate  timestamp
);