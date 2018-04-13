import * as Type from '../constants/ActionTypes';
var initialState = ['', '', '', ''];

const listDV = (state = initialState, action) => {
    switch (action.type) {
        case Type.CHANGE_NAME_DV:
            state = action.data;
            break;
        case Type.RESTORE_NAME_DV:
            state = action.data;
            break;
    }
    return state;
}

export default listDV;