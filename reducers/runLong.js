import * as Type from '../constants/ActionTypes';
var initialState = [
    { hour: 0, minute: 0 },
    { hour: 0, minute: 0 },
    { hour: 0, minute: 0 },
    { hour: 0, minute: 0 },
    { hour: 0, minute: 0 },
    { hour: 0, minute: 0 },
    { hour: 0, minute: 0 },
    { hour: 0, minute: 0 }
];

const runLong = (state = initialState, action) => {
    switch (action.type) {
        case Type.SET_RUN_LONG:
            state = action.runLong;
    }
    return state;
}

export default runLong;