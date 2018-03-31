import callApi from './apiCaller';
declare var messaging: any;

export const updateToken = (token, loginToken) => {
    callApi('messaging/token', 'POST', { "token": token }, loginToken).then(res => console.log('Loading finished'));
}

export const getPermission = (loginToken) => {
    messaging.requestPermission()
        .then(() => {
            return messaging.getToken()
        })
        .then(token => {
            updateToken(token.toString(), loginToken);
        })
        .catch((err) => {
            console.log('Unable to get permission to notify.');
        });
}

export const receiveMessage = () => {
    return new Promise((resolve, reject) => {
        messaging.onMessage(payload => {
            resolve(payload);
        });
    })
}