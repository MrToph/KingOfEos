const fs = require(`fs`)
const path = require(`path`)
const { eos, keys } = require(`./config`)
const { getErrorDetail } = require(`./utils`)

const { CONTRACT_ACCOUNT } = process.env

async function createAccount(name, publicKey) {
    try {
        await eos.getAccount(name)
        console.log(`"${name}" already exists: ${publicKey}`)
        // no error => account already exists
        return
    } catch (e) {
        // error => account does not exist yet
    }
    console.log(`Creating "${name}" ${publicKey} ...`)
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
            bytes: 1024 * 1024,
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
        // SYS is configured as core symbol for creating accounts etc.
        // use EOS here to pay for contract
        quantity: `10000.0000 EOS`,
        memo: `Happy spending`,
    })
    console.log(`Done.`)
}

// exact approximation of the actual C smart contract prices until kingOrder = 83
const kingOrderToPrice = kingOrder => {
    const price = 1.35 ** kingOrder
    // now truncate the price at 4 decimal digits
    // we need to go the ugly way with strings, because everything else will round at _some_ decimal point
    // making the results inaccurate compared with truncating
    const priceString = price.toString()
    const decimalPosition = priceString.indexOf(`.`)
    if (decimalPosition === -1) return `${priceString}.0000`

    const amountOfDecimalPlaces = priceString.length - decimalPosition - 1
    if (amountOfDecimalPlaces >= 4) return priceString.slice(0, decimalPosition + 5)

    const padding = `0`.repeat(4 - amountOfDecimalPlaces)
    return `${priceString}${padding}`
}

async function deploy() {
    const contractDir = `./contract`
    const wasm = fs.readFileSync(path.join(contractDir, `KingOfEOS.wasm`))
    const abi = fs.readFileSync(path.join(contractDir, `KingOfEOS.abi`))

    // Publish contract to the blockchain
    const codePromise = eos.setcode(CONTRACT_ACCOUNT, 0, 0, wasm)
    const abiPromise = eos.setabi(CONTRACT_ACCOUNT, JSON.parse(abi))

    await Promise.all([codePromise, abiPromise])

    console.log(`Deployment successful.`)
    console.log(`Updating auth ...`)
    const oldPublicKey = keys[CONTRACT_ACCOUNT][1]
    // cleos set account permission kingofeos active \
    // '{"threshold": 1,"keys": [{"key": "EOS5...","weight": 1}],"accounts": [{"permission":{"actor":"kingofeos","permission":"eosio.code"},"weight":1}]}' owner -p kingofeos
    const auth = {
        threshold: 1,
        keys: [{ key: oldPublicKey, weight: 1 }],
        accounts: [
            { permission: { actor: CONTRACT_ACCOUNT, permission: `eosio.code` }, weight: 1 },
        ],
    }
    eos.updateauth({
        account: CONTRACT_ACCOUNT,
        permission: `active`,
        parent: `owner`,
        auth,
    })
    console.log(`Done.`)
}

async function testData() {
    const contract = await eos.contract(CONTRACT_ACCOUNT)
    console.log(`@init`)
    await contract.init({ name: CONTRACT_ACCOUNT }, { authorization: CONTRACT_ACCOUNT })

    /* eslint-disable no-await-in-loop */
    for (let i = 1; i < 30; i += 1) {
        const from = i % 2 ? `test2` : `test1`
        const price = kingOrderToPrice(i)
        console.log(`@transfer\t${i} \t ${from}\t${price}`)
        await eos.transfer({
            from,
            to: CONTRACT_ACCOUNT,
            quantity: `${price} EOS`,
            memo: `displayname;10ba038e-48da-487b-96e8-8d3b99b6d18a;${Date.now()}`,
        })
        // await new Promise(resolve => setTimeout(resolve, 500))
    }
    /* eslint-enable no-await-in-loop */
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
            console.error(typeof error !== `string` ? JSON.stringify(error) : error)
        }
    }
    try {
        await deploy()
        console.log(`Deployment successful. Sending test actions ...`)
        await testData()
    } catch (error) {
        console.error(getErrorDetail(error))
        console.error(typeof error !== `string` ? JSON.stringify(error) : error)
    }
}

init()
