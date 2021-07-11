// The following chaincode is used for a very simple accident reporting system.

'use strict';

const { Contract } = require('fabric-contract-api');

class accidentClaim extends Contract {

 async initLedger(ctx) {
  console.log("Initialized");
 }

 async startClaim(ctx, policyNumber, accidentLocation) {
        console.info('startClaim');

        const claim = {

            docType: "claim",
            policy: policyNumber,
            location: accidentLocation
        };

        await ctx.stub.putState(policyNumber, Buffer.from(JSON.stringify(claim)));
        console.info('completed startClaim');
    }

 async retrieveClaim(ctx, policyNumber) {
    // Write the code for this function to get the first claim record for a policy number
    const policyAsBytes = await ctx.stub.getState(policyNumber); // get the policy from chaincode state
    if (!policyAsBytes || policyAsBytes.length === 0) {
        throw new Error(`${policyNumber} does not exist`);
    }
    console.log(policyAsBytes.toString());
    return policyAsBytes.toString();
}

 async retrieveAllClaims() {
  
  const startKey = '';
  const endKey = '';
  const allResults = [];
  for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
      const strValue = Buffer.from(value).toString('utf8');
      let record;
      try {
          record = JSON.parse(strValue);
      } catch (err) {
          console.log(err);
          record = strValue;
      }
      allResults.push({ Key: key, Record: record });
  }
  console.info(allResults);
  return JSON.stringify(allResults);
 }

 async addPoliceRecord(ctx, policyNumber, policeRecord) {
  
    const policyAsBytes = await ctx.stub.getState(policyNumber); // get the policy from chaincode state
    if (!policyAsBytes || policyAsBytes.length === 0) {
        throw new Error(`${policyNumber} does not exist`);
    }
    const policy = JSON.parse(policyAsBytes.toString());
    policy.policeRecord = policeRecord;
  
    await ctx.stub.putState(policyNumber, Buffer.from(JSON.stringify(policy)));

}

 async addAdjustorReport(ctx, policyNumber, adjustorReport) {
  
    const attributeValid: boolean = ctx.clientIdentity.assertAttributeValue('role', 'adjustor');
        // We can also get the attribute's value using: ctx.clientIdentity.getAttributeValue('role');
        if (!attributeValid) {
            throw new Error('Attribute does not equal the required value');
        } else {
            const policyAsBytes = await ctx.stub.getState(policyNumber); // get the policy from chaincode state
            if (!policyAsBytes || policyAsBytes.length === 0) {
                throw new Error(`${policyNumber} does not exist`);
            }
            const policy = JSON.parse(policyAsBytes.toString());
            policy.adjustorReport = adjustorReport;

            await ctx.stub.putState(policyNumber, Buffer.from(JSON.stringify(policy)));
        }
 }

module.exports = accidentClaim;
