import * as Type from '../constants/ActionTypes';
var initialState = 1;

const rowCalender = (state = initialState, action) => {
    switch (action.type) {
        case Type.INC_ROW_CALENDER:
            state = action.rowCalender;
    }
    return state;
}

export default rowCalender;