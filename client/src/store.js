import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers';
import { insertMessage } from './redux/actions/messageActions';

import { REACT_APP_WEBSOCKET_URL } from './config';

const initialState = {};

const middleware = [thunk];

const webSocket = new WebSocket(REACT_APP_WEBSOCKET_URL);

webSocket.onmessage = (message) => {
  console.log(message);
  store.dispatch(insertMessage(message.data));
};

const store = createStore(
  rootReducer,
  initialState,
  compose(
    // this is needed for async actions to work (e.g. when an action returns a function)
    applyMiddleware(...middleware),
    // this one is needed for Redux DevTools extension to work in Chrome:
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
