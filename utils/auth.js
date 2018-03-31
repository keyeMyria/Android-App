import * as config from '../constants/Config';
import * as firebase from 'firebase';


firebase.initializeApp(config.firebase);


export const createUser = (email, password) => {
    return new Promise((resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                resolve('Finished');
            })
            .catch(error => {
                reject('Fail');
            });
    })
}


export const login = (email, password) => {
    return new Promise((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(res => {
                console.log(res);
                resolve(true);
            })
    })
}


export const logout = () => {
    return new Promise((resolve, reject) => {
        firebase.auth().signOut()
            .then(() => {
                resolve(true);
            })
    })
}

export const getState = () => {
    return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged(user => {
            if (user !== null)
                resolve({ uid: user.uid, displayName: user.displayName, email: user.email, photoURL: user.photoURL })
        });
    })
}

export const getToken = () => {
    return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged(user => {
            if (user !== null)
                resolve(user.pa);
        });
    })
}
