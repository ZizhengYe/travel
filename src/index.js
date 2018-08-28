import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { createStore, applyMiddleware} from 'redux'

import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import reducers from './reducers'

import './index.css'
import registerServiceWorker from './registerServiceWorker'
import Plan from "./containers/PlanPage/plan_page"
import HomePage from "./containers/HomePage/home_page"


const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(thunk)
));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path='/plan' component={ Plan }/>
                    <Route path='/' component={ HomePage }/>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root')
)





registerServiceWorker()
