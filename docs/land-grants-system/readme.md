# Land Grants System

Aids the processing of land grant applications.

## Capabilities

### Check action eligibility

Given the data we have about the application and business, are they eligible to apply at this instant in time?

### Check action compatibility

Determine whether two actions can co-exist on a patch of land.

### Calculate available area

Given a patch of land and knowledge of existing funding agreements, calculate the area in hectares the applicant may apply an action to.

### Calculate payment amount

Calculate the amount of money, and payment schedule for an action, given the area applied for.

## Data stored

| Name                        | Description                                                   |
| --------------------------- | ------------------------------------------------------------- |
| Action config               | Includes action code and set of eligibility criteria required |
| Existing agreements         | The set of agreements already set up by businesses            |
| Eligibility criteria config | Values to determine the behaviour of the criteria             |
| In progress applications    | Details of any applications not approved yet                  |
