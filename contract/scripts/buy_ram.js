const { eos } = require(`../config`)
const { getErrorDetail } = require(`../utils`)

const { CONTRACT_ACCOUNT } = process.env

async function script() {
    try {
        await eos.transaction(tr => {
            tr.buyrambytes({
                payer: CONTRACT_ACCOUNT,
                receiver: CONTRACT_ACCOUNT,
                bytes: 500000,
            })

            // tr.delegatebw({
            //     from: CONTRACT_ACCOUNT,
            //     receiver: CONTRACT_ACCOUNT,
            //     stake_net_quantity: `1.0000 EOS`,
            //     stake_cpu_quantity: `1.0000 EOS`,
            //     transfer: 0,
            // })
        })
    } catch (error) {
        console.error(`Error: ${error}${getErrorDetail(error)}`)
    }
}

script()
