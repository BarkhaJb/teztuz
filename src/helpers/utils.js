import axios from 'axios';

const BASE_URL = process.env.API_BASE_URL;

export const getLoggedUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : {};
};

export const getUserId = async (email) => {
    try {
        const url = `${process.env.REACT_APP_BASE_URL}/api/users/email/` + email;
        const id = await axios.get(url);
        console.log(id.data);
        return id.data;
    } catch (err) {
        console.log(err);
    }
};

export const isEmpty = (value) => {
    if (value === null) {
        return true;
    }
    if (typeof value !== 'number' && value === '') {
        return true;
    }
    if (value === 'undefined' || value === undefined) {
        return true;
    }
    if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
        return true;
    }
    return false;
};

export const sendRequest = async (url, data) => {
    console.log('sending request');
    const method = data.method || 'post';
    const payload = data.payload || {};
    const headers = data.headers || {};
    const user = getLoggedUser();

    let axios_config = {
        method: method,
        url: url,
        headers: {
            Authorization: 'Bearer ' + user._token,
            ...headers
        },
        validateStatus: () => true //Always resolve promise on every http status
    };

    if (method == 'get') {
        axios_config['params'] = payload;
    } else {
        axios_config['data'] = payload;
    }

    try {
        console.log('Sending');
        console.log(axios_config);
        const response = await axios(axios_config);
        if (response.status == 401) {
            //User's Token has been expired
            localStorage.removeItem('user');
            window.location.href = '/home';
        }

        return response;
    } catch (error) {
        return error;
    }
};

export const arraysEqual = (a, b) => {
    a = Array.isArray(a) ? a : [];
    b = Array.isArray(b) ? b : [];
    return a.length === b.length && a.every((el, ix) => el === b[ix]);
};

export const generateObjectId = (m = Math, d = Date, h = 16, s = (s) => m.floor(s).toString(h)) => {
    return s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h));
};


export const  getExtension = (filename)=> {
  return filename.split('.').pop()
}
export const allowedImageTypes=['png', 'jpg', 'jpeg']
export const allowedVideoTypes=['mp4', '3gp']
export const allowedAudioTypes=['mp3']