const { eos } = require(`../config`)
const { getErrorDetail } = require(`../utils`)

async function action() {
    try {
        const now = Date.now() // memo needs to be unique
        await eos.transfer({
            from: `test2`,
            to: process.env.CONTRACT_ACCOUNT,
            quantity: `1.3500 SYS`,
            memo: `displayname;10ba038e-48da-487b-96e8-8d3b99b6d18a;${now}`,
        })
        console.log(`SUCCESS`)
    } catch (error) {
        console.error(`${getErrorDetail(error)}`)
    }
}

action()
