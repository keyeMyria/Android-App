import * as Type from '../constants/ActionTypes';
import { AsyncStorage } from 'react-native';

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

export const getMachineID = (machine) => {
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

/*

export const actGetToken = () => {
    return dispatch => {
        auth.getToken().then(res => {
            dispatch(dispatchGetToken(res));
        })
    }
}




export const actGetState = () => {
    return dispatch => {
        auth.getState().then(res => {
            dispatch(actFetchState(res));
        })
    };
}

export const loginAPI = (email, password) => {
    return dispatch => {
        auth.login(email, password).then(res => {
            dispatch(login(res));
        });
    }
}

export const getRealtimeTempHumAPI = (token) => {
    return dispatch => {
        return callAPI('realtime', 'GET', null, token).then(res => {
            if (typeof (res.data) !== 'string') {
                dispatch(getRealtimeTempHum(res.data[0].status[0]));
            }
        })
    }
}

export const logoutAPI = () => {
    return dispatch => {
        return auth.logout().then(res => {
            dispatch(logout(res));
        })
    }
}

export const actFetchState = (data) => {
    return {
        type: Type.GET_STATE,
        users: data
    }
}

export const login = (data) => {
    return {
        type: Type.LOGIN,
        users: data
    }
}

export const logout = (data) => {
    return {
        type: Type.LOGOUT,
        users: data
    }
}

export const getRealtimeTempHum = (data) => {
    return {
        type: Type.GET_REALTIME_TEMP_HUMIDITY,
        realtimeTempHum: data
    }
}

export const getTempEachDayAPI = (token) => {
    return dispatch => {
        return callAPI('temp/TempByTime/48', 'GET', null, token).then(res => {
            dispatch(getTempEachDay(res.data));
        })
    }
}

export const getTempEachDay = (data) => {
    return {
        type: Type.GET_TEMP_EACH_DAY,
        tempEachDay: data
    }
}

export const getHumidityEachDayAPI = (token) => {
    return dispatch => {
        return callAPI('humidity/HumidityByTime/48', 'GET', null, token).then(res => {
            dispatch(getHumidityEachDay(res.data));
        })
    }
}

export const getHumidityEachDay = (data) => {
    return {
        type: Type.GET_HUMIDITY_EACH_DAY,
        humidityEachDay: data
    }
}

export const getTempByTimeAPI = (level, time, token) => {
    return dispatch => {
        return callAPI(`temp/Temp7Day/${level}/${time}`, 'GET', null, token).then(res => {
            dispatch(getTempByTime(res.data));
        })
    }
}

export const getTempByTime = (data) => {
    return {
        type: Type.GET_TEMP_BY_TIME,
        tempEachMonth: data
    }
}

export const getHumidityByTimeAPI = (level, time, token) => {
    return dispatch => {
        return callAPI(`humidity/Humidity7Day/${level}/${time}`, 'GET', null, token).then(res => {
            dispatch(getHumidity(res.data));
        })
    }
}

export const getHumidity = (data) => {
    return {
        type: Type.GET_HUMIDITY_BY_TIME,
        humidityEachMonth: data
    }
}

export const getBumpWorkingAPI = (token) => {
    return dispatch => {
        return callAPI('bump', 'GET', null, token).then(res => {
            dispatch(getBumpWorking(res.data));
        })
    }
}

export const getBumpWorking = (data) => {
    return {
        type: Type.GET_BUMP_WORKING,
        bumpTask: data
    }
}

export const getRealtimeBumpStatusAPI = (token) => {
    return dispatch => {
        return callAPI('feedback', 'GET', null, token).then(res => {
            dispatch(getRealtimeBumpStatus(res.data));
        })
    }
}

export const getRealtimeBumpStatus = (data) => {
    return {
        type: Type.GET_REALTIME_BUMP_STATUS,
        bumpStatus: data
    }
}

export const getDetailRealtimeSensorAPI = (token) => {
    return dispatch => {
        return callAPI('realtime', 'GET', null, token).then(res => {
            dispatch(getDetailRealtimeSensor(res.data));
        })
    }
}

export const getDetailRealtimeSensor = (data) => {
    return {
        type: Type.GET_DETAIL_REALTIME_SENSOR,
        sensorStatus: data
    }
}

export const postNameBumpAPI = (data, token) => {
    return dispatch => {
        return callAPI('device/name', 'POST', data, token).then(res => {
            dispatch(postNameBump(res.data));
        })
    }
}

export const postNameBump = (data) => {
    return {
        type: Type.POST_NAME_BUMP,
        sendStatus: data
    }
}

export const toggleStatusSend = () => {
    return {
        type: Type.TOGGLE_STATUS_SEND
    }
}

export const postSettingBumpAPI = (data, token) => {
    return dispatch => {
        return callAPI('bump', 'POST', data, token).then(res => {
            dispatch(postSettingBump(res.data))
        })
    }
}

export const postSettingBump = (data) => {
    return {
        type: Type.POST_SETTING_BUMP,
        sendStatus: data
    }
}

export const getErrorCodeAPI = (token) => {
    return dispatch => {
        return callAPI('error', 'GET', null, token).then(res => {
            if (res.data !== 'Error') {
                dispatch(getErrorCode(res.data.status[0]));
            }
        })
    }
}

export const getErrorCode = (data) => {
    return {
        type: Type.GET_ERROR_CODE,
        errorStatus: data
    }
}

export const postErrorCodeAPI = (data, token) => {
    return dispatch => {
        callAPI('error', 'POST', data, token).then(res => {
            dispatch(postErrorCode(res.data));
        })
    }
}

export const postErrorCode = (data) => {
    return {
        type: Type.POST_ERROR_CODE,
        sendStatus: data
    }
}


export const getDoingTaskAPI = (token) => {
    return dispatch => {
        callAPI('bump/doingTask', 'GET', null, token).then(res => {
            if (res.data !== 'Error') {
                dispatch(getDoingTask(res.data));
            }
        })
    }
}

export const getDoingTask = (data) => {
    return {
        type: Type.GET_LIST_DOING_TASK,
        doingTask: data
    }
}

export const deleteCalenderListAPI = (_id, token) => {
    return dispatch => {
        callAPI(`bump/delete/${_id}`, 'DELETE', null, token).then(res => {
            dispatch(deleteCalenderList(res.data));
        })
    }
}

export const deleteCalenderList = (data) => {
    return {
        type: Type.DELETE_CALENDER_LIST,
        sendStatus: data
    }
}
*/