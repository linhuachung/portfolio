import {configureStore, Tuple} from '@reduxjs/toolkit'
import rootReducer from "@/store/reducers";
import {thunk} from "redux-thunk";
import {fromJS} from "immutable";

const immutableStateTransformer = (state) => {
    if (state.toJS) {
        return fromJS(state.toJS());
    }
    return state;
};

export const makeStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                immutableCheck: { isImmutable: immutableStateTransformer }
            }).concat(thunk)
    })
}