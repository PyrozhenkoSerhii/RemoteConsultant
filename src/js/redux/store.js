import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunk from 'redux-thunk';

import rootReducer from './reducers/root'

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2,
};

const pReducer = persistReducer(persistConfig, rootReducer)
const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
const store = createStore(pReducer, {}, reduxDevTools(applyMiddleware(thunk)))

export const store = store
export const persistor = persistStore(store)