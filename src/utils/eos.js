import Eos from 'eosjs'
import getConfig from 'next/config'
// Only holds serverRuntimeConfig and publicRuntimeConfig from next.config.js nothing else.
const { publicRuntimeConfig } = getConfig()

const httpProtocol = publicRuntimeConfig.EOS_NETWORK_PROTOCOL || `http`
const host = publicRuntimeConfig.EOS_NETWORK_HOST || `127.0.0.1`
const port = publicRuntimeConfig.EOS_NETWORK_PORT || 8888
const chainId = publicRuntimeConfig.EOS_NETWORK_CHAINID

const network = {
    blockchain: `eos`,
    protocol: httpProtocol,
    host,
    port, // ( or null if defaulting to 80 )
    chainId,
}

// eslint-disable-next-line new-cap
const eos = Eos({
    httpEndpoint: `${network.protocol}://${network.host}:${network.port}`,
    chainId,
})

const ROWS_LIMIT = 99999

const getKings = () =>
    eos
        .getTableRows({
            json: true,
            code: publicRuntimeConfig.EOS_CONTRACT_NAME,
            scope: publicRuntimeConfig.EOS_CONTRACT_NAME,
            table: `claims`,
            table_key: `kingdomKingIndex`,
            lower_bound: 0,
            upper_bound: -1,
            limit: ROWS_LIMIT,
        })
        // eslint-disable-next-line no-console
        .catch(console.err)

export { network, getKings }
