import * as Type from '../constants/ActionTypes';
var initialState = [];

const machine = (state = initialState, action) => {
    switch (action.type) {
        case Type.GET_MACHINE_ID:
            state = action.machine;
    }
    return state;
}

export default machine;