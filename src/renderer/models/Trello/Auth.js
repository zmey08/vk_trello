export default function () {
    const that = {};

    const COOKIE_NAME = 'trello_token';

    that.run = () => {
        return new Promise((resolve, reject) => {
            const {oauth1Authenticate} = require('@/ElectronOauth1');
            const {BrowserWindow}      = require('electron').remote;
            oauth1Authenticate({
                CONSUMER_KEY:        '124d5a3c38400a7f6be20a26e203ae54',
                CONSUMER_SECRET:     '10f404162d75f6ee2cb68b78c4a706d7b290b07318c86f5f0454cee08f315e61',
                ACCESS_TOKEN_URL:    'https://trello.com/1/OAuthGetAccessToken',
                AUTHORIZE_TOKEN_URL: 'https://trello.com/1/OAuthAuthorizeToken',
                REQUEST_TOKEN_URL:   'https://trello.com/1/OAuthGetRequestToken',
            }, BrowserWindow).then((token) => {
                save(token.oauth_token);
                resolve(token.oauth_token);
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

    const save = (token) => {
        const Cookies         = require('js-cookie');
        const expires_in_days = 86400 / 60 / 60 / 24;
        Cookies.set(COOKIE_NAME, token, {expires: parseInt(expires_in_days)});
    };

    return that;
}