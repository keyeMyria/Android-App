import { combineReducers } from 'redux';
import id from './id';
import machine from './machine';
import scanned from './scanned';
import name from './name';

const appReducers = combineReducers({
    id: id,
    machine: machine,
    scanned: scanned,
    name: name
});

export default appReducers;
