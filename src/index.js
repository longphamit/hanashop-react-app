import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { applyMiddleware, createStore } from 'redux';
import appReducer from './reducer';
import thunk from 'redux-thunk';
import { Provider } from "react-redux";
import rootSaga from "./sagas/index"
import createSagaMiddleware from "redux-saga"
const sagaMiddleware= createSagaMiddleware()
const composeEnhancer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
const store=createStore(appReducer,composeEnhancer(applyMiddleware(thunk),applyMiddleware(sagaMiddleware)))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
sagaMiddleware.run(rootSaga)
// If you want to start measuring performance in youloginString,passwordr app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
