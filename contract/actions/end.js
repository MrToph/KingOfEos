const { eos } = require(`../config`);
const { getErrorDetail } = require(`../utils`);

const { CONTRACT_ACCOUNT } = process.env;

async function action() {
  try {
    const contract = await eos.contract(CONTRACT_ACCOUNT);
    const transaction = await contract.end(
      { name: CONTRACT_ACCOUNT },
      { authorization: `test2` }
    );
    console.log(`SUCCESS`)
  } catch (error) {
    console.error(`${error}\n${getErrorDetail(error)}`);
  }
}

action();
