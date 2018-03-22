import 'semantic-ui-css/components/modal.css'
import 'semantic-ui-css/components/header.css'
import 'semantic-ui-css/components/button.css'
import 'semantic-ui-css/components/list.css'
import 'semantic-ui-css/components/icon.css'
import 'semantic-ui-css/themes/default/assets/fonts/icons.eot'
import 'semantic-ui-css/themes/default/assets/fonts/icons.woff'
import 'semantic-ui-css/themes/default/assets/fonts/icons.woff2'
import { Modal, Header, Button, List, Icon } from 'semantic-ui-react'
import Head from 'next/head'
import { siteBackgroundColor } from '../src/theme'
import { Canvas } from '../src/components/index'

export default () => (
    <div className="root">
        <Head>
            <link rel="stylesheet" href="/_next/static/style.css" />
        </Head>
        <Canvas />
        <style jsx>{`
            .root {
                background-color: ${siteBackgroundColor};
            }

            * {
                box-sizing: border-box;
            }
            :global(body) {
                margin: 0;
                padding: 0;
            }
        `}</style>
    </div>
)
