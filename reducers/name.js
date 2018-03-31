import * as Type from '../constants/ActionTypes';
var initialState = [];

const name = (state = initialState, action) => {
    switch (action.type) {
        case Type.GET_LIST_NAME:
            state = action.name;
    }
    return state;
}

export default name;