// FillInContract(Name, Address) { newState=1; putState(Name , {Address: Address, State:
// newState)) }
// SubmitContract(Name) { newState=2; putState(Name, {State: newState})}
// ReviewContract(Name, Credit, Phone) {putState(Name, {Credit: Credit}) if Address is empty
// Incomplete() else if Credit Approved(Phone) else Rejected()}
// Incomplete(Name) {new State = 1; putState(Name, {State: newState))}
// Rejected(Name) {new State = 0; putState(Name, {State: newState))}
// Approved(Name, Phone) {new State = 3; putState(Name, {State: newState, Phone: Phone))}
// CheckStatus(Name) { return getCurrentState(Name)}

const states = {
    NONE: "No Accident",
    REPORTED: "Accident Reported",
    AWAITING: "Awaiting Determine Fault",
    REVISE: "Revise Fault",
    REPAIR: "Repair or Refund",
    POLICE: "Police",
    BENEFITS: "Accident Benefits Application Package",
    MVACF: "MVACF",
    EXCLUSION: "Exclusion",
    OFFICER: "Complaint Officer",
    DISPUTE: "In Dispute",
 };


FileAccidentReport(JSON accidentReport) -  driver {
    newState=REPORTED; 
}

FillProofLossForm(JSON lossForm); -  driver {}

DetermineAmountCovered(); - insuranceCo {}

AgreeWithInsurance(); -  driver {}

DisagreeWithInsurance(); -  driver{}

ReportFraud(); -  driver{}

ApplyBenefits(); -  driver{}

MakeClaimMVACF(); -  driver{}

DenyPayment(); - insuranceCo{}

StillDisagree(); -  driver{}

ApplyAABS();  -  driver{}

CheckContract(Name, Credit, Phone) - system{}

CheckStatus(Name) - system{}
