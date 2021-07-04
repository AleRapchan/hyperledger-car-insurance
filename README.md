# Hyperledger Car Insurance

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


## Identifying the State Data
- For user in Hyperledger Fabric the state can be represented using state data
- It's recommended a variable called state
- The data that controls the state can be stored along with it

### State data
- States: [“No phone”, “Contract Started”, “Contract Awaiting Approval”, “Phone”]
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
- FillInContract(Name, Address)
- SubmitContract(Name)
- Incomplete(Name)
- Rejected(Name)
- Approved(Name, Phone)

### Functions
- CheckContract(Name, Credit, Phone) ○ CheckStatus(Name)

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

## The Chaincode
### Transitions as Chaincode Functions
- The transitions to change the state and state data should be chaincode functions
- The transition inputs are the function parameters
- The function can check to see if the inputs change the state data past the threshold to change the state
- If the threshold is surpassed the function can change the state variable

### Roles as Account
- An account can be assigned to a role
- This can be done at the time of enrollment or after the fact by the administrator account for that organization


## Links
[Claims Process](http://fsrao.ca/consumers/auto-insurance/after-accident-understanding-claims-process)
