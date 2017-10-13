const request     = require('request');
const querystring = require('querystring');

function authenticateOauth1({
                                CONSUMER_KEY,
                                CONSUMER_SECRET,
                                ACCESS_TOKEN_URL,
                                AUTHORIZE_TOKEN_URL,
                                REQUEST_TOKEN_URL
                            }, BrowserWindow) {
    const oauth = {consumer_key: CONSUMER_KEY, consumer_secret: CONSUMER_SECRET};

    request.post({url: `${REQUEST_TOKEN_URL}/?oauth_callback=electroauth://storetoken`, oauth: oauth}, (e, r, body) => {
        const req_data = querystring.parse(body);
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
        //win.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl) => {
        //    console.log(newUrl);
        //});
        win.on('closed', () => {
            reject(new Error('Auth window was closed before completing authentication'));
        });
    };
}

function store(token) {
    console.log(token);
}

exports.authenticateOauth1 = authenticateOauth1;
exports.store              = store;