import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";

interface CounterState {
    value: number;
}

export enum CounterActionTypes {
    INCREMENT = "INCREMENT",
    DECREMENT = "DECREMENT"
}

export interface IncrementAction {
    type: typeof CounterActionTypes.INCREMENT;
}

export interface DecrementAction {
    type: typeof CounterActionTypes.DECREMENT;
}

export type CounterAction = IncrementAction | DecrementAction;

const initialState: CounterState = {
    value: 0
};

export function counterReducer(
    state = initialState,
    action: CounterAction
): CounterState {
    switch (action.type) {
        case CounterActionTypes.INCREMENT:
            return {...state, value: state.value + 1};
        case CounterActionTypes.DECREMENT:
            return {...state, value: state.value - 1};
        default:
            return state;
    }
}


export const rootReducer = combineReducers({
    counter: counterReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));
