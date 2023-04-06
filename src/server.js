import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/Server';
import RoutesList ,{ routesConfig } from './routes';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet'
import createStoreInstance from './store';

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('dist/public'));//静态目录代理

app.get('*', (req, res) => {
    const store = createStoreInstance();
    console.log("req.url:\n", req.url);

    const promises = routesConfig.map(route => {
        const component = route.component;
        if( route.path === req.url && component.getInitialProps ) {
            return component.getInitialProps(store);
        }else{
            return null;
        }
    })
    console.log("promise:\n", promises);
    Promise.all(promises).then(data => {
        const preloadedState = store.getState();
        const content = ReactDOMServer.renderToString(
            <Provider store={store}>
                <StaticRouter location={req.url}>
                    <RoutesList />
                </StaticRouter>
            </Provider>
        );
        console.log("contant:\n", content);

        const helmet = Helmet.renderStatic();
        const html = `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    ${helmet.title.toString()}
                </head>
                <body>
                    <div id="root">${content}</div>
                    <script>
                        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)};
                    </script>
                    <script src="bundle_client.js"></script>
                </body>
            </html>
        `;
        res.writeHead( 200, {
            'content-type': 'text/html;charset=utf-8',
        })
        res.end(html);
    })

    
})

app.listen( port, ()=> {
    console.log(`Server is running at http://localhost:${port}`);
});
