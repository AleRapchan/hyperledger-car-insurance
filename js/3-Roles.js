// driver, broker, agent or insurance company 
FileAccidentReport(JSON accidentReport) -  driver
FillProofLossForm(JSON lossForm); -  driver
DetermineAmountCovered(amount); - insuranceCo
AgreeWithInsurance(); -  driver
DisagreeWithInsurance(); -  driver
ReportFraud(); -  driver
ApplyBenefits(); -  driver
MakeClaimMVACF(); -  driver
DenyPayment(); - insuranceCo
StillDisagree(); -  driver
ApplyAABS();  -  driver

CheckContract(Name, Credit, Phone) - system
CheckStatus(Name) - system