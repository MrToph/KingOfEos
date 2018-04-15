import Eos from 'eosjs'

const eos = Eos.Localnet({ httpEndpoint: `http://127.0.0.1:8888` })

const ROWS_LIMIT = 99999

export const getKings = () =>
    eos.getTableRows({
        code: `kingofeos`,
        json: true,
        limit: 99999,
        lower_bound: 0,
        scope: `kingofeos`,
        table: `kingofeos`,
        table_key: `claims`,
        upper_bound: -1,
    })
