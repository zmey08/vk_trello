import app_config from '@/config';

export default function () {
    const that = {};

    const COOKIE_NAME = 'vk_token';

    that.run = () => {
        return new Promise((resolve, reject) => {
            const {BrowserWindow} = require('electron').remote;
            const authenticateVK  = require('electron-vk-oauth2');
            return authenticateVK({
                appId:  app_config.vk.app_id,
                scope:  'friends,groups',
                revoke: true,
            }, {}, BrowserWindow).then(result => {
                save(result.accessToken, result.expiresIn);
                resolve(result);
            }).catch(error => {
                reject(error);
            });
        });
    };

    that.isAuth = () => {
        return !!that.token();
    };

    that.token = () => {
        const Cookies = require('js-cookie');
        return Cookies.get(COOKIE_NAME);
    };

    const save = (token, expires) => {
        const Cookies         = require('js-cookie');
        const expires_in_days = parseInt(expires) / 60 / 60 / 24;
        Cookies.set(COOKIE_NAME, token, {expires: parseInt(expires_in_days)});
    };

    return that;
}