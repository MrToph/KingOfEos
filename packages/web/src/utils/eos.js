import Eos from 'eosjs'

const network = {
    blockchain: `eos`,
    // host:'127.0.0.1',
    host: `159.65.161.242`,
    port: 8888, // ( or null if defaulting to 80 )
}

// eslint-disable-next-line new-cap
const eos = Eos.Localnet({ httpEndpoint: `http://${network.host}:${network.port}` })

const ROWS_LIMIT = 99999

const getKings = () =>
    eos.getTableRows({
        code: `kingofeos`,
        json: true,
        limit: ROWS_LIMIT,
        lower_bound: 0,
        scope: `kingofeos`,
        table: `claims`,
        table_key: `kingdomKingIndex`,
        upper_bound: -1,
    })

export { network, getKings }
