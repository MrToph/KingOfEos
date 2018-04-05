import '@kingofeos/theme/dist/semantic.min.css'
import '@kingofeos/theme/dist/themes/default/assets/fonts/icons.eot'
import '@kingofeos/theme/dist/themes/default/assets/fonts/icons.woff'
import '@kingofeos/theme/dist/themes/default/assets/fonts/icons.woff2'
import Head from 'next/head'
import { siteBackgroundColor } from '../src/theme'
import { Canvas, CurrentKingdom, Explanation, HallOfFame, FAQ } from '../src/components/index'

export default () => (
    <div className="root">
        <Head>
            <link rel="stylesheet" href="/_next/static/style.css" />
        </Head>
        <Canvas />
        <CurrentKingdom />
        <div className="divider" />
        <Explanation />
        <div className="divider" />
        <HallOfFame />
        <div className="divider" />
        <FAQ />
        <style jsx>{`
            .root {
                background-color: ${siteBackgroundColor};
                margin-bottom: 40px;
            }

            .divider {
                width: 100%;
                height: calc(50px + 1vw + 40px);
                transform: skew(1.5deg, -1.5deg) ;
                &::before {
                    content: "";
                    background-image: linear-gradient(to right, purple, black);
                    height: 50px;
                    display: block;
                }
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
