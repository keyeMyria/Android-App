import * as Type from '../constants/ActionTypes';
var initialState = [true, true, true, true, true, true, true];

const colorDay = (state = initialState, action) => {
    switch (action.type) {
        case Type.CHANGE_DAY_BAR:
            state = action.colorDay;
            break;
        case Type.RESTORE_COLOR_DAY:
            state = action.data;
            console.log(action.data);
            break;
    }
    return state;
}

export default colorDay;