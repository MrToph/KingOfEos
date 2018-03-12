const { eos } = require("../config");
// eos.contract(code<string>, [options], [callback])

test("adds 1 + 2 to equal 3", async () => {
  const contract = await eos.contract("kingofeos");
  
  const randomString = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
  const transaction = await contract.claim(
    "kingofeos",
    "kingkong",
    "image123",
    `song${randomString}`
  );
  // console.log(transaction)
  const claims = await eos.getTableRows(
    true /* as json */,
    "kingdomOrder" /* table key? */,
    "kingofeos",
    "kingofeos",
    "claims"
  );
  console.log(claims);
  const lastClaim = claims.rows.pop();
  expect(lastClaim.kingdomKingIndex).toBe(0x101);
});
