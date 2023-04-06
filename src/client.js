import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import RoutesList from './routes';
import createStoreInstance from './store';

const store = createStoreInstance(window.__PRELOADED_STATE__);

ReactDOM.hydrate(
    <Provider store={store}>
        <BrowserRouter>
            <RoutesList />
        </BrowserRouter>
    </Provider>
    , document.querySelector("#root")
)