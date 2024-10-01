# Example Application Submission

The following is an example of how a flow of events could work in the land grants domain.

It will show an applicant submitting an application for the action [CSAM1](https://www.gov.uk/find-funding-for-land-or-farms/csam1-assess-soil-produce-a-soil-management-plan-and-test-soil-organic-matter). CSAM1 requires the
total available area of the land parcel be applied for. It also requires a Historic Environment Farm Environment Record  (HEFER) from Historic
England if any Historic Features are present on the parcel.

The application will be for too small an area and will not yet have of HEFER for its historical
feature.

The Land Grants System will have configuration for each rule determining what should be done if an
eligibility criterion fail.

## Proposed version

```mermaid
sequenceDiagram
    participant ui as Application UI
    participant lgs as Land Grants System
    participant mgmt as Application Management
    participant as as Agreements Service

    ui->>lgs: Submit application
    Note over lgs: Check eligibility ❌ (hefer-check and whole-parcel)
    lgs->>ui: Request land area update
    ui->>lgs: Resubmit application
    Note over lgs: Check eligibility ❌ (hefer-check)
    lgs->>mgmt: Add task - request-hefer
    Note over mgmt: Task appears for Historic England
    mgmt->>lgs: HEFER added
    Note over lgs: Check eligibility ✅
    lgs->>mgmt: Update status: ready-for-approval
    mgmt->>lgs: Approve application
    lgs->>as: Set up agreement
```

## Architecture vision version

```mermaid
sequenceDiagram
    participant ui as Dynamic Form Generation

    participant re as Rules Engine    
    participant es as Eligibility service
    participant arc as ArcGIS
    participant cs as Calculation Service
    participant sm as Scheme Matrix
    participant fs as Fraud Service
    participant cm as Case Management
    participant as as Agreements Service

    ui->>re: Submit application
    
    activate re
    re->>arc: Get land data 
    arc->>re: Land data
    re->>sm: Action compatibility check needed
    sm->>re: Action compatibility check done
    re->>fs: Fraud check required
    fs->>re: Fraud check done
    re->>cs: Application value calculation required
    cs->>re: Application value calculated
    re->>es: Eligibility check needed
    es->>re: Eligibility check done ❌
    re->>ui: Request land area update
    deactivate re

    ui->>re: Resubmit application
    activate re
    re->>es: Eligibility check needed
    es->>re: Eligibility check done ❌
    re->>cm: Create case to get HEFER
    Note over cm: Historic England add 
    cm->>re: HEFER added
    re->>es: Eligibility check needed
    es->>re: Eligibility check done ✅
    re->>as: Set up agreement
    deactivate re


```
