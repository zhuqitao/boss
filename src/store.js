import thunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './redux/reducer';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunkMiddleware),
  // other store enhancers if any
);
const store = createStore(rootReducer, enhancer);
// const store = createStore(
// 	rootReducer,
// 	compose(
// 		applyMiddleware(thunkMiddleware),
// 		reduxDevtools
// 	)
	
// )

export default store;