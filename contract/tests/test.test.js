const { makeKingdomKingIndex, unmakeKingdomKingIndex } = require("../utils.js");
const { eos } = require("../config");

const ROWS_LIMIT = 99999;

const getClaims = () =>
  eos.getTableRows(
    true /* as json */,
    "kingofeos",  // code
    "kingofeos",  // scope
    "claims", // table
    "kingdomOrder" /* table key? */,
    0,  // lower bound
    -1, // upper bound
    ROWS_LIMIT  // rows limit
  );

describe("kingofeos", () => {
  let oldClaim;
  let eosiotoken
  beforeAll(async () => {
    eosiotoken = await eos.contract("eosio.token");
  })
  beforeEach(async () => {
    const oldClaims = await getClaims();
    expect(oldClaims.rows.length).toBeGreaterThan(0);
    oldClaim = oldClaims.rows.pop();
  });

  fit("should claim correctly upon correct transfer action | transferCorrect", async () => {
    const nonce = Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "")
      .substr(0, 8);
    const transaction = await eosiotoken.transfer({
      from: "test1",
      to: "kingofeos",
      quantity: "0.0001 EOS",
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
