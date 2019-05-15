import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import messageReducer from './redux/reducers/messageReducer';
import {insertMessage} from './redux/actions/messageActions';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    messageReducer,
  });

const store = createStore(rootReducer, applyMiddleware(thunk));

const webSocket = new WebSocket('ws://localhost:5000/websocket');

webSocket.onmessage = (message) => {
    store.dispatch(insertMessage(message.data));
  };

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
