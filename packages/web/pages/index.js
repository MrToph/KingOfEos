// import 'semantic-ui-css/components/modal.css'
// import 'semantic-ui-css/components/header.css'
// import 'semantic-ui-css/components/button.css'
// import 'semantic-ui-css/components/list.css'
// import 'semantic-ui-css/components/icon.css'
// import 'semantic-ui-css/components/table.css'
// import 'semantic-ui-css/components/label.css'
import 'semantic-ui-css/semantic.css'
import 'semantic-ui-css/themes/default/assets/fonts/icons.eot'
import 'semantic-ui-css/themes/default/assets/fonts/icons.woff'
import 'semantic-ui-css/themes/default/assets/fonts/icons.woff2'
import Head from 'next/head'
import { siteBackgroundColor } from '../src/theme'
import { Canvas, CurrentKingdom } from '../src/components/index'

export default () => (
    <div className="root">
        <Head>
            <link rel="stylesheet" href="/_next/static/style.css" />
        </Head>
        <Canvas />
        <CurrentKingdom />
        <style jsx>{`
            .root {
                background-color: ${siteBackgroundColor};
                margin-bottom: 40px;
            }

            * {
                box-sizing: border-box;
            }
            :global(body) {
                font-family: Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;
                margin: 0;
                padding: 0;
            }
        `}</style>
    </div>
)
