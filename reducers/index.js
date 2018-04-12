import { combineReducers } from 'redux';
import id from './id';
import machine from './machine';
import scanned from './scanned';
import name from './name';
import status from './status';
import rowCalender from './rowCalender';
import tb from './tb';
import pointTime from './pointTime';
import runLong from './runLong';
import colorDay from './colorDay';

const appReducers = combineReducers({
    id: id,
    machine: machine,
    scanned: scanned,
    name: name,
    status: status,
    rowCalender: rowCalender,
    tb: tb,
    pointTime: pointTime,
    runLong: runLong,
    colorDay: colorDay
});

export default appReducers;
