//used for managing state of a list
//this was built for storing and updating posts and asks in AppStateContainer
//accomplishes the goal of hooks of removing abstracting away business logic from component
// exposes a simple API to get data, add items (must be an array currently), or update and item

import { useReducer } from 'react';

const initialCustomSpecUIState = {
    image: null,
    scale: null,
    shape: null,
    download: null
}

function reducer(state, action) {
    switch (action.type) {
        case 'add':
            return [...state, ...action.value]
        case 'update':
            // console.log(action.value)
            const updateIndex = state.findIndex((item) => item.id === action.value.id)
            console.log(updateIndex)
            let newState = state;
            newState[updateIndex] = action.value
            return [...newState]
        default:
            throw new Error();
    }
}

export function useCustomReducer(initialState = []) {
    const [items, dispatch] = useReducer(reducer, initialState)
    const add = newItems => {
        dispatch({ type: 'add', value: newItems })
    };
    const update = updateItem => {
        dispatch({ type: 'update', value: updateItem })
    }
    return [items, add, update];
};