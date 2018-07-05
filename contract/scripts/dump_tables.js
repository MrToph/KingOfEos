const { eos } = require(`../config`)
const { getErrorDetail } = require(`../utils`)

const { CONTRACT_ACCOUNT } = process.env
const ROWS_LIMIT = 99999

async function script() {
    try {
        const result = await eos.getTableRows({
            json: true,
            code: CONTRACT_ACCOUNT,
            scope: CONTRACT_ACCOUNT,
            table: `claims`,
            table_key: `kingdomOrder` /* is ignored? */,
            lower_bound: 0,
            upper_bound: -1,
            limit: ROWS_LIMIT,
        })
        const { rows } = result
        rows.forEach(row => console.log(JSON.stringify(row, null, 4)))
    } catch (error) {
        console.error(`${getErrorDetail(error)}`)
    }
}

script()
