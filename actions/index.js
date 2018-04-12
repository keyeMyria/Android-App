import * as Type from '../constants/ActionTypes';
import { AsyncStorage } from 'react-native';
import { decrypt } from 'react-native-simple-encryption';

export const addCurrentID = (id) => {
    return {
        type: Type.ADD_CURRENT_ID,
        id: id
    }
}

export const getListName = () => {
    return dispatch => {
        try {
            AsyncStorage.getItem('name').then((data) => {
                if (data !== null) {
                    dispatch(dispatchListName(JSON.parse(data)));
                }
            })
        } catch (error) {
            dispatch(dispatchListName([]));
        }
    }
}

export const dispatchListName = (data) => {
    return {
        type: Type.GET_LIST_NAME,
        name: data
    }
}

export const getMachineID = () => {
    return dispatch => {
        try {
            AsyncStorage.getItem('machine').then((data) => {
                if (data !== null) {
                    dispatch(dispatchMachineID(JSON.parse(data)));
                }
            })
        } catch (error) {
            dispatch(dispatchMachineID([]));
        }
    }
}

export const dispatchMachineID = (data) => {
    return {
        type: Type.GET_MACHINE_ID,
        machine: data
    }
}

export const addScannedID = (scanned) => {
    return {
        type: Type.ADD_SCANNED_ID,
        scanned: scanned
    }
}

export const handle_qrcode_read = (data) => {
    return dispatch => {
        AsyncStorage.getItem('machine').then((machines) => {
            var tmp = JSON.parse(machines) || [];
            if (data.data) {
                if (data.type === 256) {
                    var code = decrypt('123456789', data.data);
                    tmp.push(code);
                    AsyncStorage.setItem('machine', JSON.stringify(tmp)).then(() => {
                        dispatch(dispatch_qrcode_read());
                    });
                }
            }
        })
    }
}


export const dispatch_qrcode_read = () => {
    return {
        type: Type.HANDEL_QRCODE_READ,
    }
}

export const status_page = (status) => {
    return {
        type: Type.STATUS_PAGE,
        status: status
    }
}

export const add_name = (name) => {
    return dispatch => {
        AsyncStorage.getItem('name').then(names => {
            let tmp = JSON.parse(names) || [];
            tmp.push(name);
            AsyncStorage.setItem('name', JSON.stringify(tmp));
        });
    }
}

export const inc_row_calender = (number) => {
    return dispatch => {
        dispatch(dispatch_inc_row_calender(0));
        setTimeout(() => {
            dispatch(dispatch_inc_row_calender(number));
        }, 25);
    }
}

export const dispatch_inc_row_calender = (number) => {
    return {
        type: Type.INC_ROW_CALENDER,
        rowCalender: number + 1
    }
}

export const change_selected_dv = (tb) => {
    let tbTable = [false, false, false, false];
    switch (tb) {
        case 'TB1':
            tbTable[0] = true;
            break;
        case 'TB2':
            tbTable[1] = true;
            break;
        case 'TB3':
            tbTable[2] = true;
            break;
        case 'TB4':
            tbTable[3] = true;
            break;
    }
    return {
        type: Type.CHANGED_SELECTED_DV,
        TB: tbTable
    }
}

export const set_hours_run = (array, data, index) => {
    let tmpData = array;
    tmpData[(index - 1)] = data;
    return {
        type: Type.SET_DATA_TIME,
        pointTime: tmpData
    }
}

export const set_run_long = (array, data, index) => {
    let tmpData = array;
    tmpData[(index - 1)] = data;
    return {
        type: Type.SET_RUN_LONG,
        runLong: tmpData
    }
}



export const change_day_bar = (data) => {
    return {
        type: Type.CHANGE_DAY_BAR,
        colorDay: data,
    }
}

export const restore_calender_to_store = (data) => {
    return {
        type: Type.RESTORE_CALENDER_TO_STORE,
        data: data
    }
}

export const restore_timerun_to_store = (data) => {
    return {
        type: Type.RESTORE_TIME_RUN_TO_STORE,
        data: data
    }
}

export const restore_color_day = (data) => {
    return {
        type: Type.RESTORE_COLOR_DAY,
        data: data
    }
}

export const restore_row_calender = (data) => {
    return {
        type: Type.RESTORE_ROW_CALENDER,
        data: data
    }
}