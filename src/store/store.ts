import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  StoreEnhancer,
} from 'redux';

import { counterReducer } from './counter';
import { devToolsEnhancer } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import signupReducer from './auth/signup/reducer';
import { signinReducer } from './auth/signin';
import { profileReducer } from './profile';
import { catalogueReducer } from './catalogue';

const appReducer = combineReducers({
  counter: counterReducer,
  signup: signupReducer,
  signin: signinReducer,
  profile: profileReducer,
  catalogue: catalogueReducer,
});

const allStoreEhancers: StoreEnhancer = compose(
  applyMiddleware(thunk),
  devToolsEnhancer({})
);

const rootReducer = (state: any, action: any) => {
  // Clear all data in redux store to initial.
  // eslint-disable-next-line no-param-reassign
  return appReducer(state, action);
};

const store = createStore(rootReducer, allStoreEhancers);

export default store;
