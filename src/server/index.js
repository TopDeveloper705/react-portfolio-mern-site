import express from 'express';
import bodyParser from 'body-parser';

import '@babel/polyfill';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';

import App from '../client/App';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('build/public'));

app.get('*', (req, res) => {
    var title = "My Portfolio";
    var description = "";
    var thumb = "";
    var favicon = "";
    var link = "";

    const context = {}

    const markup = ReactDOMServer.renderToString(
        <StaticRouter location={req.url} context={context}>
            <App />
        </StaticRouter>
    );

    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta content="IE=edge" http-equiv="X-UA-Compatible">
            <meta content="width=device-width, initial-scale=1" name="viewport">
            <title>${title}</title>
            <meta name="description" content="${description}">
        
            <meta name="twitter:card" content="summary_large_image">
            <meta name="twitter:site" content="@anspattnaik">
            <meta name="twitter:title" content="${title}">
            <meta name="twitter:description" content="${description}">
            <meta name="twitter:creator" content="@anspattnaik">
            <meta name="twitter:image" content="${thumb}">
            <meta property="og:title" content="${title}" />
            <meta property="og:description" content="${description}">
            <meta property="og:type" content="article" />
            <meta property="og:url" content="${link}" />
            <meta property="og:image" content="${thumb}" />
            <meta property="og:site_name" content="${title}" />
            <link rel="canonical" href="${link}"/>
            <link rel="shortcut icon" type="image/png" href="${favicon}"/>
            <link rel="apple-touch-icon-precomposed" href="${thumb}"/>
        </head>
        <body>
            <div id="root">${markup}</div>
            <script src="client_bundle.js"></script>
        </body>
        </html>`;

    res.send(html);
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})