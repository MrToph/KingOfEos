import { checkServer } from './index'
// import Eos from '../../eosjs/lib/eos.js'
import Eos from 'eosjs'

const protocol = process.env.EOS_NETWORK_PROTOCOL || `http`
const host = process.env.EOS_NETWORK_HOST || `127.0.0.1`
const port = process.env.EOS_NETWORK_PORT || 8888
const chainId =
    process.env.EOS_NETWORK_CHAINID ||
    `aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906`

console.log(`eos.js in production`, protocol, host, port, chainId)

const network = {
    blockchain: `eos`,
    protocol,
    host,
    port, // ( or null if defaulting to 80 )
    chainId,
}

// eslint-disable-next-line new-cap
// const eos = checkServer() ? {} : Eos({ httpEndpoint: `${network.host}:${network.port}` })
const eos = Eos({
    httpEndpoint: `${network.protocol}://${network.host}:${network.port}`,
    chainId,
})

const ROWS_LIMIT = 99999

const getKings = () =>
    eos
        .getTableRows({
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
