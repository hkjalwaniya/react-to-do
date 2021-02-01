import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import reducer from './reducers'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
}

const persistedReducer = persistReducer(persistConfig, reducer)

const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware))

const store = createStore(persistedReducer, middleware)

const persistor = persistStore(store)

export { persistor, store }

// export default store;
