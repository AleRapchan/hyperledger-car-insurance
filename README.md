# Hyperledger Car Insurance

![Logo](https://alexandrebarros.com/global/car-insurance/hyper-project.png?alt=hyperledger-car-insurance)

[![fabric-contract-api npm module](https://img.shields.io/npm/v/fabric-shim?label=fabric-contract-api)](https://www.npmjs.com/package/fabric-contract-api)
[![fabric-shim npm module](https://img.shields.io/npm/v/fabric-shim?label=fabric-shim)](https://www.npmjs.com/package/fabric-shim)
[![fabric-shim-api npm module](https://img.shields.io/npm/v/fabric-shim?label=fabric-shim-api)](https://www.npmjs.com/package/fabric-shim-api)
[![fabric-shim-crypto npm module](https://img.shields.io/npm/v/fabric-shim?label=fabric-shim-crypto)](https://www.npmjs.com/package/fabric-shim-crypto)

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
claimStatus  |  State or Number  |  Actual status of the process
carInfo.make  |  String  |  Make of the car
carInfo.model  |  String  |  Model of the car
carInfo.year  |  String  |  Year of the car
carInfo.registration  |  String  |  Registration number of the car
carInfo.licensePlateNumber  |  String  |  Licence plate number of the car
driverInfo.name  |  String  |  Name of the driver
driverInfo.licenseNumber  |  String or null  |  License number of the driver
driverInfo.insuranceCompanyName  |  String  |  Name of driver's insurance company 
investigationOfficer.name  |  String  |  Name of the officer
investigationOfficer.badgeNumber  |  String  |  Number of officer's badge
date  |  Date  |  Date of the event
location  |  String  |  Location of the event
passengerCount  |  Number  |  Number of passenger
injuryDetails  |  String  |  Details of the injury
vehicleDamageDetails  |  String  |  Details of the vehicle's damage
driverDescriptionOfAccident  |  [String] or null  |  Driver's drecription of the accident

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

## Notes

### Steps
1. Prerequisites
2. Create a new smart contract project
3. Understand the smart contract
4. Package the smart contract
5. Local Fabric Ops
6. Install the smart contract
7. Instantiate the smart contract
8. Submit and evaluate transactions


### Setting up ...
Fabric Shima is a low level API that communicate with Fabric API
Fabric Contract API is a high level API that abstract some things for you in the chain code. It makes easier for you to work with chaincode and implement your solutions instead of having to deal with the Fabric API itself.

```bash
npm i fabric-shima

npm i fabric-contract-api@1.4.0-snapshot.21 --offline
```

1. start your chaincode
Go to package.json and create a start script. You will need to identify yourself and the name of the chaincode.
You will need the command to start the chaincode and to identify the peer.
```JS
"scripts":
*startDev*: "CORE_CHAINCODE_ID_NAME=numbertransfer: v0 fabric-chaincode-node----peer.address grpc://localhost:7042"
},
```
2. We need a JS to manage the asset's proprety. Construction function.
3. To right in the World State we need to handle Buffer so we will create some helper methods.
```JS

static from(bufferJson)
if (Buffer.isBuffer (buffer0r Json)) {
	if (!bufferOr ]son. length)-s
	return;
buffer0rJson = JSON.parse(buffer0rJson.toString('utf-8'));
return Object.assign (new PhoneNumber(), bufferOr]son);
}

toBuffer() {
	return Buffer. from(JSON.stringify(this));
}
```
4. export your class so you can use in other files as well.

### Help Code

Every chaincode can consist in multiple smart contracts.
We can create a contracte base with some helpful functions to all smart contracts.
We will import some APIs from Fabric
1. Create a new class that extends the Fabric contract. Those methods will help you to implement your use cases.
Every method here will be a public method. 
Javascript doesnt know about public or private methods so hyperledger decide to use a underscore.
We will need a contractor with a namespace. Namespace group functions for our classe .
A stub is a Fabric API to communicate with Fabric (getState,putState, compositeKey).
compositeKey is used cause Fabric store all your date in Word State as key/value.
Normaly you can interate that if you don't know the key but .
We will always be using async methods (async/await) cause we'll never know when the data is coming back.


```JS
use strict';
const { Contract } require('fabric-contract-api'),
PhoneNumber} require('./phone-number');
class ContractBase extends Contract
constructor (namespace) { ... ]
publicMEthod() { ... }
_privateMEthod() { ... ]
_createPhoneNumberCompositeKey(stub, phoneNumber) { ... }
async _getPhoneNumber(stub, phoneNumber) {... }
_require(value, name) { ... }
_toBuffer(obi) { ... }
_fromBuffer (buffer) ( ... }
PA
module. exports 3 { ContractBase};
```


### Smart Contract
`ctx` is the context of the transaction. Every method will have the same signature and start with ctx to know who called our chaincode so we can react to that.
Will build events so if something happens in our chaincoide our clinet can react to that.
ctx.stub.setEvent()

To know who organization called the code, use `ctx.clientIdentity.getMSPID()`

### Implement Events
```JS
module. exports {
Assigned: 'Assigned'
TransferConfirmed: 'TransferConfirmed',
TransferRejected: 'TransferRejected',
TransferRequested: 'TransferRequested',
};
```

### Create the startup file (index.js)
Remember that contracts is important for Hyperledger.

```JS
use strict';
const { NumberTransferContract Mr = require('./contract');
module. exports.contracts 3 [NumberTransferContract];
```

`npm run startDev`
`./assign-number.js regulator telco1 123`
`./show-numbers.js regulator`


## Authors

Name  | Git Hub | LinkedIn | Twitter
------------- | ------------- | ------------- | -------------
Alexandre Rapchan B. Barros  | [@AleRapchan](https://www.github.com/AleRapchan) | [Alexandre-rapchan](https://www.linkedin.com/in/alexandre-rapchan/) | [@rapchan](https://www.twitter.com/rapchan/) 

## Support

For support, email blockchain@alexandrebarros.com or join our Slack channel.
	
## Revisions
Date  |  Revision  |  Description  |  Author
--------  |  --------  |  --------  |  --------	
15/06/2021  |  `0.1`  |  First Draft  |  Alexandre Rapchan B. Barros

## Links
- [Financial Services Regulatory Authority of Ontario - Claims Process](http://fsrao.ca/consumers/auto-insurance/after-accident-understanding-claims-process)
- [Hyperledger Fabric Key Concepts](https://hyperledger-fabric.readthedocs.io/fa/latest/key_concepts.html)

### Code
- [Running Your First a Fabric Application](https://hyperledger-fabric.readthedocs.io/en/latest/write_first_app.html)
- [Key Concepts of Smart Contracts and Chaincode](https://hyperledger-fabric.readthedocs.io/en/latest/smartcontract/smartcontract.html)
- [Developing Applications](https://hyperledger-fabric.readthedocs.io/en/latest/developapps/developing_applications.html)
- [Code Example Tutorial](https://hyperledger-fabric.readthedocs.io/en/latest/tutorial/commercial_paper.html)

### Extra
- [Running and Testing Smart Contracts for Hyperledger Fabric](https://developer.ibm.com/recipes/tutorials/running-and-testing-smart-contracts-for-hyperledger-fabric/)
- [Fabric v2.0 - Decentralized Chaincode Lifecycle Management](https://www.youtube.com/watch?v=XvEMDScFU2M&t=5s)
- [Bitcoin Bay - Hyperledger Fabric](https://www.youtube.com/watch?v=3OxAnTVkUrA)
- [Fabric v2.0 - Decentralized Chaincode Lifecycle Management](https://www.youtube.com/watch?v=XvEMDScFU2M&t=69s)
- [Hyperledger Fabric: Coding the Fabric with Node](https://www.youtube.com/watch?v=wMgWgd-LpVI)

### Tools
- [Connect Your Servers From VSC](https://medium.com/@sujaypillai/connect-to-your-remote-servers-from-visual-studio-code-eb5a5875e348)
- [Yeoman generator for Hyperledger Fabric](https://github.com/AleRapchan/generator-fabric)
- [Yeoman Scaffolding Tool](https://yeoman.io/)
- [Log routing for Docker container logs](https://github.com/AleRapchan/logspout)
