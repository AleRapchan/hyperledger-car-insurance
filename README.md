# Hyperledger Car Insurance

![Logo](https://alexandrebarros.com/global/car-insurance/health-insurance.png?alt=hyperledger-car-insurance)


## State machine for a car accident insurance claim
### Finite-State Machine
- Mathematical model of computation
- An abstract machine that can be in only one of a finite number of states at one time.
- It can move from one state to another based on inputs
- Changing a state is called a transition
- An example of a state machine in use is a traffic light

### States
- States are used to represent a step in a process
- The state you are in may be dictated by data
  - Time in state
  - Balance of account
  - Measurement input
- The state can be read or changed

![Logo](https://alexandrebarros.com/global/car-insurance/insurance.png?alt=hyperledger-state-insurance)



## Identifying the State Data
- For user in Hyperledger Fabric the state can be represented using state data
- It's recommended a variable called state
- The data that controls the state can be stored along with it

### State data
- States: [
  "No Accident",
  "Accident Reported",
  "Awaiting Determine Fault",
  "Revise Fault",
  "Repair or Refund",
  "Police",
  "Accident Benefits Application Package",
  "MVACF",
  "Exclusion",
  "Complaint Officer",
  "In Dispute",
];
- State: 0
- Name: “”
- Address: “”
- Phone number: “”
- Good Credit: false

## Identifying the Transition Functions
Transitions are actions that change a state machine from one state to another
- Transitions are triggered by inputs
  - Clock hits a certain time
  - User presses a button
  - Action takes place
- The transition may have conditions that the inputs need to exceed a threshold to move to another state.
  - Must get colder than 0c to freeze
  - Must deposit $50 to no longer have bank account in overdraft
- A state can have zero, one or many transitions to other states

### Transitions
```JS
// File Accident Report
FileAccidentReport();

// Fill in Proof of Loss Form
FillProofLossForm();

// Determine amount to be covered
DetermineAmountCovered();

// Agree with Insurance Co
AgreeWithInsurance();

// Disagree with insurance company
DisagreeWithInsurance();

// Report that you are victim of a scam or fraud
ReportFraud();

// Apply for Accident benefits
ApplyBenefits();

// Make a claim to MVACF
MakeClaimMVACF();

// Deny Payment
DenyPayment();

// Still Disagree
StillDisagree();

// Apply to AABS
ApplyAABS();
```
- FillInContract(Name, Address)
- SubmitContract(Name)
- Incomplete(Name)
- Rejected(Name)
- Approved(Name, Phone)

### Functions
- CheckContract(Name, Credit, Phone) 
- CheckStatus(Name)

## Identify the Roles
- A role is a position that someone holds in a process 
  - User, Administrator, Buyer, Seller, Adjudicator, System
- You may limit who can execute certain transitions based on roles

### Roles
- FillInContract(Name, Address) - buyer
- SubmitContract(Name) - sales agent
- CheckContract(Name, Credit, Phone) - system/manager
- Incomplete(Name) - system
- Rejected(Name) - system
- Approved(Name, Phone) - system
- CheckStatus(Name) - buyer/sales agent/system/manager


## Physical Asset in the Network (Tarun)
- Insurance Claim

## Possible attributes associated with the Asset (Tarun)
Field  |  Type  |  Description
-------  |  -------  |  ------- 
policyNumber  |  String  |  Number of the policy
claimStatus  |  State || Number  |  Actual status of the process
carInfo.make  |  String  |  Make of the car
carInfo.model  |  String  |  Model of the car
carInfo.year  |  String  |  Year of the car
carInfo.registration  |  String  |  Registration number of the car
carInfo.licensePlateNumber  |  String  |  Licence plate number of the car
driverInfo.name  |  String  |  Name of the driver
driverInfo.licenseNumber  |  String || null  |  License number of the driver
driverInfo.insuranceCompanyName  |  String  |  Name of driver's insurance company 
investigationOfficer.name  |  String  |  Name of the officer
investigationOfficer.badgeNumber  |  String  |  Number of officer's badge
date  |  Date  |  Date of the event
location  |  String  |  Location of the event
passengerCount  |  Number  |  Number of passenger
injuryDetails  |  String  |  Details of the injury
vehicleDamageDetails  |  String  |  Details of the vehicle's damage
driverDescriptionOfAccident  |  [String] || null  |  Driver's drecription of the accident

## Model definition for the asset (Tarun)
```JS
const insuraceClaimModal = {
  policyNumber: String,
  claimStatus: State || Number,
  carInfo: {
    make: String,
    model: String,
    year: String,
    registration: String,
    licensePlateNumber: String,
  },
  accidentDetails: {
    driverInfo: [
      {
        name: String,
        licenseNumber: String || null,
        insuranceCompanyName: String,
      },
    ],
    investigationOfficer: {
      name: String,
      badgeNumber: String,
    },
    date: Date,
    location: String,
    passengerCount: Number,
    injuryDetails: String,
    vehicleDamageDetails: String,
    driverDescriptionOfAccident: [String] || null,
  },
};
```

## Instance Description for the Asset
```JSON
{
  "report": {
    "policyNumber": "1321312411",
    "fileDateTime": "2021-04-23T18:25:43.511Z",
    "dateTime": "2021-04-23T18:25:43.511Z",
    "location": "Toronto ON",
    "mandatoryCoverageOnly": false,

    "reportedToPolice": false,
    "officerName": "",
    "badgeNumber": "",
    "registeredOwner": false,
    "driversName": "Alexandre Barros",
    "licenceNumber": "54352343265464324523",

    "vehicle": {
      "make": "BMW",
      "model": "2021",
      "year": "2021",
      "registration": "2425345345234234234021",
      "licence": "432423423424242342342342021"
    },

    "passengers": "4",
    "injuries": "",
    "damage": "",
    "description": "",

    "drivers": [
      {
        "name": "",
        "licence": "",
        "insuranceCompanie": "",
        "insurancePolicies": ""
      },
      {
        "name": "",
        "licence": "",
        "insuranceCompanie": "",
        "insurancePolicies": ""
      }
    ]
  }
}
```


## The Chaincode
### Transitions as Chaincode Functions
- The transitions to change the state and state data should be chaincode functions
- The transition inputs are the function parameters
- The function can check to see if the inputs change the state data past the threshold to change the state
- If the threshold is surpassed the function can change the state variable

### Roles as Account
- An account can be assigned to a role
- This can be done at the time of enrollment or after the fact by the administrator account for that organization

### Implementation - psuedo-code
```JS
FillInContract(Name, Address) { newState=1; putState(Name , {Address: Address, State:
newState)) }
SubmitContract(Name) { newState=2; putState(Name, {State: newState})}
ReviewContract(Name, Credit, Phone) {putState(Name, {Credit: Credit}) if Address is empty
Incomplete() else if Credit Approved(Phone) else Rejected()}
Incomplete(Name) {new State = 1; putState(Name, {State: newState))}
Rejected(Name) {new State = 0; putState(Name, {State: newState))}
Approved(Name, Phone) {new State = 3; putState(Name, {State: newState, Phone: Phone))}
CheckStatus(Name) { return getCurrentState(Name)}
```

## Authors

Name  | Git Hub | LinkedIn
------------- | ------------- | -------------
Alexandre Rapchan B. Barros  | [@AleRapchan](https://www.github.com/AleRapchan) | [Alexandre-rapchan](https://www.linkedin.com/in/alexandre-rapchan/) |

## Support

For support, email blockchain@alexandrebarros.com or join our Slack channel.
	
## Revisions
Date  |  Revision  |  Description  |  Author
--------  |  --------  |  --------  |  --------	
15/06/2021  |  0.1  |  First Draft  |  Alexandre Rapchan B. Barros

## Links
[Claims Process](http://fsrao.ca/consumers/auto-insurance/after-accident-understanding-claims-process)
