import { createStore, combineReducers } from 'redux';
import listReducer from '../Reducers/listReducer';
import formReducer from '../Reducers/formReducer';

const reducer = combineReducers({
  serviceList: listReducer,
  serviceAdd: formReducer,
});

const store = createStore(reducer);

export default store;