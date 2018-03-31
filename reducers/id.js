import * as Type from '../constants/ActionTypes';
var initialState = '';


const id = (state = initialState, action) => {
    switch (action.type) {
        case Type.ADD_CURRENT_ID:
            state = action.id;
    }
    return state;
}

export default id;