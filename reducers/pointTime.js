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

const pointTime = (state = initialState, action) => {
    switch (action.type) {
        case Type.SET_DATA_TIME:
            state = action.pointTime;
    }
    return state;
}

export default pointTime;