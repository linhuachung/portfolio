import { combineReducers } from '@reduxjs/toolkit';
import ProductReducer from './Products/reducer.js'
import AuthReducer from './Auth/reducer'

const rootReducer = combineReducers({
    ProductReducer,
    AuthReducer
});

export default rootReducer;