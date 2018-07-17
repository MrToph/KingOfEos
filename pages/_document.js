// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file
import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'

const renderOpenGraphData = () => {
    const description = `King of EOS is a game living on the EOS blockchain. Become a king, get rich or immortalize your kingdom forever.`
    const title = `King of EOS`
    const baseUrl = `https://kingofeos.com`
    const socialImage = `static/social-image.png`
    return (
        <React.Fragment>
            <meta property={`og:image`} content={`${baseUrl}/${socialImage}`} />
            <meta property={`og:type`} content={`article`} />
            <meta poperty={`og:title`} content={title} />
            <meta property={`og:description`} content={description} />
            <meta property={`og:url`} content={baseUrl} />
            <meta property={`og:site_name`} content={title} />
            <meta name="description" content={description} />
            <meta name="keywords" content="EOS,blockchain,game" />
            <meta property={`twitter:title`} content={title} />
            <meta property={`twitter:description`} content={description} />
            <meta property={`twitter:image`} content={`${baseUrl}/${socialImage}`} />
        </React.Fragment>
    )
}

/* eslint-disable react/no-danger */
const renderGoogleAnalytics = () => (
    <React.Fragment>
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-122461559-1" />
        <script
            dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'UA-122461559-1');`,
            }}
        />
    </React.Fragment>
)

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <html>
                <Head>
                    <title>King of EOS</title>
                    <link rel="stylesheet" href="/_next/static/style.css" />
                    <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.ico" />
                    {/* <link rel="preconnect" href="https://fonts.gstatic.com/" crossOrigin /> */}
                    {renderOpenGraphData()}
                    {renderGoogleAnalytics()}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        )
    }
}
