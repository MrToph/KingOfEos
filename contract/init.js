const { eos, keys } = require(`./config`)
const { getErrorDetail } = require(`./utils`)

async function createAccount(name, publicKey) {
    try {
        await eos.getAccount(name)
        console.log(`"${name}" already exists`)
        // no error => account already exists
        return
    } catch (e) {
        // error => account does not exist yet
    }
    console.log(`Creating "${name}" ...`)
    await eos.transaction(tr => {
        tr.newaccount({
            creator: `eosio`,
            name,
            owner: publicKey,
            active: publicKey,
            deposit: `10000.0000 SYS`,
        })

        tr.buyrambytes({
            payer: `eosio`,
            receiver: name,
            bytes: 8192,
        })

        tr.delegatebw({
            from: `eosio`,
            receiver: name,
            stake_net_quantity: `10.0000 SYS`,
            stake_cpu_quantity: `10.0000 SYS`,
            transfer: 0,
        })
    })
    await eos.transfer({
        from: `eosio`,
        to: name,
        quantity: `10000.0000 SYS`,
        memo: `Happy spending`,
    })
    console.log(`Created`)
}

async function init() {
    const accountNames = Object.keys(keys)
    for (const accountName of accountNames) {
        const [, publicKey] = keys[accountName]
        try {
            // eslint-disable-next-line no-await-in-loop
            await createAccount(accountName, publicKey)
        } catch (error) {
            console.error(`Cannot create account ${accountName} "${getErrorDetail(error)}"`)
        }
    }
}

init()
