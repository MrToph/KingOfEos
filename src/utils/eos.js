import { checkServer } from './index'
// import Eos from '../../eosjs/lib/eos.js'
import Eos from 'eosjs'

let host = `127.0.0.1`
let port = 8888
let chainId

if(process.env.NODE_ENV === 'production') {
    host = process.env.EOS_NETWORK_HOST
    port = process.env.EOS_NETWORK_PORT
    chainid = process.env.EOS_NETWORK_CHAINID || `aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906`
}
const network = {
    blockchain: `eos`,
    protocol: `http`,
    host,
    // host: `159.65.161.242`,
    port, // ( or null if defaulting to 80 )
    chainId,
}

// eslint-disable-next-line new-cap
// const eos = checkServer() ? {} : Eos({ httpEndpoint: `${network.host}:${network.port}` })
const eos = Eos({ httpEndpoint: `${network.protocol || 'http'}://${network.host}:${network.port}` })

const ROWS_LIMIT = 99999

const getKings = () =>
    eos.getTableRows({
        json: true,
        code: `kingofeos`,
        scope: `kingofeos`,
        table: `claims`,
        table_key: `kingdomKingIndex`,
        lower_bound: 0,
        upper_bound: -1,
        limit: ROWS_LIMIT,
    })
    .catch(console.err)

export { network, getKings }
