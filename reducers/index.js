import { combineReducers } from 'redux';
import id from './id';
import machine from './machine';
import scanned from './scanned';
import name from './name';
import status from './status';
import rowCalender from './rowCalender';

const appReducers = combineReducers({
    id: id,
    machine: machine,
    scanned: scanned,
    name: name,
    status: status,
    rowCalender: rowCalender
});

export default appReducers;
