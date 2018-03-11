const { eos } = require("../config");
// eos.contract(code<string>, [options], [callback])

test("adds 1 + 2 to equal 3", async () => {
  const contract = await eos.contract("kingofeos");
  const transaction = await contract.claim(
    "kingofeos",
    "kingkong",
    "image123",
    "song123"
  );
  const newBalance = await eos.getTableRows(
    true /* as json */,
    "kingdomOrder" /* table key? */,
    "kingofeos",
    "kingofeos",
    "claims"
  );
  console.log(newBalance);
  expect(newBalance).toBe("10.0000 EOS");
});
