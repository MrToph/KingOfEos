const { eos } = require(`../config`)
const { getErrorDetail } = require(`../utils`)

async function action() {
    try {
        const now = Date.now() // memo needs to be unique
        await eos.transfer({
            from: `test2`,
            to: process.env.CONTRACT_ACCOUNT,
            quantity: `2.4603 EOS`,
            memo: `displayname;;${now}`,
        })
        console.log(`SUCCESS`)
    } catch (error) {
        console.error(`${getErrorDetail(error)}`)
    }
}

action()
