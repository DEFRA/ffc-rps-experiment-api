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
    validFrom        text,
    validTo          text,
    geomAreaSqm      text,
    verifiedOn       text,
    verificationType integer,
    createdOn        text,
    createdBy        text,
    validated        text,
    lastRefreshDate  text
);