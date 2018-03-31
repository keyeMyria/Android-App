import * as Type from '../constants/ActionTypes';
var initialState = '';

const scanned = (state = initialState, action) => {
    switch (action.type) {
        case Type.ADD_SCANNED_ID:
            state = action.scanned;
    }
    return state;
}

export default scanned;