import * as Type from '../constants/ActionTypes';
var initialState = 'SLASH';

const status = (state = initialState, action) => {
    switch (action.type) {
        case Type.STATUS_PAGE:
            state = action.status;
    }
    return state;
}

export default status;