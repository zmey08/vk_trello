const request       = require('request');
const querystring   = require('querystring');
const {ipcRenderer} = require('electron');
const url           = require('url');

const protocol_name = 'electron.oauth1';

function oauth1Authenticate({
                                CONSUMER_KEY,
                                CONSUMER_SECRET,
                                ACCESS_TOKEN_URL,
                                AUTHORIZE_TOKEN_URL,
                                REQUEST_TOKEN_URL
                            }, BrowserWindow) {
    const oauth = {consumer_key: CONSUMER_KEY, consumer_secret: CONSUMER_SECRET};

    let oauth_token_secret = '';

    return new Promise((resolve, reject) => {
        request.post({url: `${REQUEST_TOKEN_URL}/?oauth_callback=${protocol_name}://storetoken`, oauth: oauth}, (e, r, body) => {
            const req_data     = querystring.parse(body);
            oauth_token_secret = req_data.oauth_token_secret;
            showAuthorize(req_data.oauth_token);
        });

        const showAuthorize = (oauth_token) => {
            const windowOpts = {
                height:         430,
                width:          655,
                webPreferences: {
                    nodeIntegration: false
                }
            };

            const win = new BrowserWindow(windowOpts);
            win.loadURL(`${AUTHORIZE_TOKEN_URL}/?oauth_token=${oauth_token}`);
            ipcRenderer.on('oauth1_callback', (event, req) => {
                const data            = url.parse(req.url);
                const query           = querystring.parse(data.query);
                const oauth_signature = `${CONSUMER_SECRET}%26${oauth_token_secret}`;
                request.post({url: `${ACCESS_TOKEN_URL}/?oauth_token=${query.oauth_token}&oauth_verifier=${query.oauth_verifier}&oauth_signature_method=PLAINTEXT&oauth_signature=${oauth_signature}`}, (e,
                                                                                                                                                                                                         r,
                                                                                                                                                                                                         body) => {
                    const req_data = querystring.parse(body);
                    resolve(req_data);
                });
                win.destroy();
            });
        };
    });

}

export {oauth1Authenticate as oauth1Authenticate};