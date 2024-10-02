# Example Application Submission

The following is an example of how a flow of events could work in the land grants domain.

It will show an applicant submitting an application for the action [CSAM1](https://www.gov.uk/find-funding-for-land-or-farms/csam1-assess-soil-produce-a-soil-management-plan-and-test-soil-organic-matter). CSAM1 requires the
total available area of the land parcel be applied for. It also requires a Historic Environment Farm Environment Record  (HEFER) from Historic
England if any Historic Features are present on the parcel.

The application will be for too small an area and will not yet have a HEFER for its historical
feature. Therefore two actions will be required, the user must update the applied for area to whole available area and Historic England must issue a HEFER. The former will prevent the application from being submitted and the latter will not.

The Land Grants System will have configuration for each rule determining what should be done if an
eligibility criterion fails.

## Proposed version

Note: The real process would include the single front door, Defra.id etc. These have been excluded for clarity.

```mermaid
sequenceDiagram
    participant ui as Application UI
    participant aps as Application Service
    participant lgs as Land Grants System
    participant mgmt as Application Management
    participant as as Agreements Service

    ui->>aps: Submit application page
    aps->>ui: Mandatory field missing
    ui->>aps: Calculate available area
    aps->>lgs: Calculate available area
    lgs->>aps: Available area
    aps->>ui: Available area
    ui->>aps: Submit application
    aps->>lgs: Check eligibility
    Note over lgs: Check eligibility ❌ (hefer-check and whole-parcel)
    lgs->>aps: Request land area update
    aps->>ui: Request land area update
    ui->>aps: Resubmit application
    aps->>lgs: Check eligibility
    Note over lgs: Check eligibility ❌ (hefer-check)
    lgs->>mgmt: Add task - request-hefer
    Note over mgmt: Task appears for Historic England
    
    mgmt->>lgs: HEFER added
    mgmt->>lgs: Check eligibility

    Note over lgs: Check eligibility ✅
    lgs->>mgmt: Update status: ready-for-approval
    mgmt->>aps: Approve application
    aps->>as: Set up agreement
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

    ui->>re: Submit application page
    re->>arc: Get land data 
    arc->>re: Land data
    re->>ui: Mandatory field missing
    ui->>re: Calculate available area

    loop available area calculation
    re->>sm: Action compatibility check needed
    sm->>re: Action compatibility check done
    end

    ui->>re: Submit application
    
    activate re

    loop available area calculation
    re->>sm: Action compatibility check needed
    sm->>re: Action compatibility check done
    end
    re->>fs: Fraud check required
    fs->>re: Fraud check done
    re->>cs: Application value calculation required
    cs->>re: Application value calculated
    re->>es: Eligibility check needed
    es->>re: Eligibility check done ❌
    re->>ui: Request land area update

    ui->>re: Resubmit application

    re->>es: Eligibility check needed
    es->>re: Eligibility check done ❌
    re->>cm: Create case to get HEFER
    Note over cm: Historic England add HEFER
    cm->>re: HEFER added
    re->>es: Eligibility check needed
    es->>re: Eligibility check done ✅
    re->>as: Set up agreement
    deactivate re


```
