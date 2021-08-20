import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {Provider} from "react-redux";
import {store} from "./redux/store";
import {BrowserRouter, Redirect, Route} from "react-router-dom";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Route path="/:id" component={App} />
                <Route path="/" >
                    <Redirect to={"/create"}/>
                </Route>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
