import * as Type from '../constants/ActionTypes';
var initialState = [false, false, false, false];

const tb = (state = initialState, action) => {
    switch (action.type) {
        case Type.CHANGED_SELECTED_DV:
            state = action.TB;
    }
    return state;
}

export default tb;