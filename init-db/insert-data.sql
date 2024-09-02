INSERT INTO land_parcels (id, data) VALUES
(1, '{
    "index": 2067679,
    "parcelId": "10168",
    "areaHa": "5.123",
    "sbi": "999599768",
    "sheetId": "SU5165",
    "landCovers": [
        {
            "type": "ARABLE LAND",
            "coverArea": "5.123"
        }
    ],
    "agreements": [
        {
            "scheme": "CSS_LIVE",
            "actionCode": "SAM1",
            "startDate": "2018-01-01",
            "endDate": "2027-12-31"
        }
    ],
    "landUses": [
        {
            "name": "WHEAT - WINTER",
            "code": "AC66",
            "area": "5.123",
            "cropPlan": "ARABLE LAND"
        }
    ],
    "attributes": {
        "moorlandLineStatus": "below"
    }
}'),
(2, '{
    "index": 2067680,
    "parcelId": "10169",
    "areaHa": "8.4",
    "sbi": "200599768",
    "sheetId": "SU5166",
    "landCovers": [
        {
            "type": "ARABLE LAND",
            "coverArea": "8.4"
        }
    ],
    "agreements": [],
    "landUses": [
        {
            "name": "WHEAT - SPRING",
            "code": "AC32",
            "area": "8.4",
            "cropPlan": "ARABLE LAND"
        }
    ],
    "attributes": {
        "moorlandLineStatus": "below"
    }
}'),
(3, '{
    "index": 2067681,
    "parcelId": "10170",
    "areaHa": "4.2",
    "sbi": "200599768",
    "sheetId": "SU5167",
    "landCovers": [
        {
            "type": "PERMANENT GRASSLAND",
            "coverArea": "4.2"
        }
    ],
    "agreements": [],
    "landUses": [
        {
            "name": "PERMANENT GRASSLAND",
            "code": "PG01",
            "area": "4.2",
            "cropPlan": "PERMANENT GRASSLAND"
        }
    ],
    "attributes": {
        "moorlandLineStatus": "below"
    }
}'),
(4, '{
    "index": 2069980,
    "parcelId": "10998",
    "areaHa": "20",
    "sbi": "106846848",
    "sheetId": "SU6466",
    "landCovers": [
        {
            "type": "ARABLE LAND",
            "coverArea": "20"
        }
    ],
    "agreements": [
        {
            "scheme": "CSS_LIVE",
            "actionCode": "AB3",
            "area": 8.3525,
            "startDate": "2018-01-01",
            "endDate": "2027-12-31"
        }
    ],
    "landUses": [
        {
            "name": "WHEAT - SPRING",
            "code": "AC32",
            "area": "20",
            "cropPlan": "ARABLE LAND"
        }
    ],
    "attributes": {
        "moorlandLineStatus": "below"
    }
}');

INSERT INTO actions (data) VALUES
('{
    "code": "SAM1",
    "description": "Assess soil, test soil organic matter and produce a soil management plan",
    "eligibleLandUses": ["Various arable and horticultural land types"],
    "payment": {
        "amountPerHectare": 5.80,
        "additionalPaymentPerAgreement": 95.0
    }
}'),
('{
    "code": "SAM2",
    "description": "Multi-species winter cover crop",
    "eligibleLandUses": ["TG01", "FA01", "TC01"],
    "payment": {
        "amountPerHectare": 129.0
    }
}'),
('{
    "code": "SAM3",
    "description": "Herbal leys",
    "eligibleLandUses": ["Arable land", "Temporary grassland", "Arable land lying fallow", "Improved permanent grassland"],
    "payment": {
        "amountPerHectare": 382.0
    }
}'),
('{
    "code": "LIG1",
    "description": "Manage grassland with very low nutrient inputs (outside SDAs)",
    "eligibleLandUses": ["Temporary grassland", "Permanent grassland – improved and low input"],
    "payment": {
        "amountPerHectare": 151.0
    }
}'),
('{
    "code": "AB3",
    "description": "Beetle banks",
    "eligibleLandUses": ["Temporary grass buffer strip"],
    "payment": {
        "amountPerHectare": 573.0
    },
    "compatibleActions": ["SAM1"]
}');

