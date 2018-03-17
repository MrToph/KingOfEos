const { makeKingdomKingIndex, unmakeKingdomKingIndex } = require("../utils.js");
const { eos } = require("../config");
// eos.contract(code<string>, [options], [callback])

const ROWS_LIMIT = 99999;

const getClaims = () =>
  eos.getTableRows(
    true /* as json */,
    "kingdomOrder" /* table key? */,
    "kingofeos",
    "kingofeos",
    "claims",
    0,
    -1,
    ROWS_LIMIT
  );

describe("kingofeos", () => {
  let oldClaim;
  beforeEach(async () => {
    const oldClaims = await getClaims();
    expect(oldClaims.rows.length).toBeGreaterThan(0);
    oldClaim = oldClaims.rows.pop();
  });

  it("should claim correctly upon correct transfer action | transferCorrect", async () => {
    const nonce = Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "")
      .substr(0, 8);
    const transaction = await eos.transfer({
      from: "test1",
      to: "kingofeos",
      amount: 1,
      memo: `test;test;hello;${nonce}`
    });
    const claims = await getClaims();
    console.log(claims.rows);
    const newClaim = claims.rows.pop();
    // There should always be the default claim on contract initialization
    expect(newClaim.kingdomKingIndex).toBe(oldClaim.kingdomKingIndex + 1);
  });

  it("should not claim upon wrong amount of EOS  | transferIncorrectEOS", async () => {
    expect(false).toBeTruthy();
  });

  // it('should claim correctly upon correct transfer action', async () => {
  // const randomString = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);

  // const transaction = await contract.claim(
  //   "kingofeos",
  //   "kingkong",
  //   "image123",
  //   `song${randomString}`
  // );
  // })

  it("should end kingdom after max_coronation_time  | endKingdom", async () => {
    const contract = await eos.contract("kingofeos");
    const transaction = await contract.end({});
    const claims = await getClaims();
    console.log(claims.rows);
    const newClaim = claims.rows.pop();
    let expectedKingdomIndex = unmakeKingdomKingIndex(
      oldClaim.kingdomKingIndex
    );
    expectedKingdomIndex = makeKingdomKingIndex(expectedKingdomIndex[0] + 1, 0);
    expect(newClaim.kingdomKingIndex).toBe(expectedKingdomIndex);
  });
});
