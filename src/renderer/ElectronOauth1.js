const request     = require('request');
const querystring = require('querystring');

const protocol_name = 'electron.oauth1';

function oauth1RegisterScheme(protocol) {
    protocol.registerStandardSchemes([protocol_name]);
}

function oauth1RegisterProtocol(protocol) {
    protocol.registerStringProtocol(protocol_name, (req, callback) => {
        console.log(req);
    });
}

function oauth1Authenticate({
                                CONSUMER_KEY,
                                CONSUMER_SECRET,
                                ACCESS_TOKEN_URL,
                                AUTHORIZE_TOKEN_URL,
                                REQUEST_TOKEN_URL
                            }, BrowserWindow) {
    const oauth = {consumer_key: CONSUMER_KEY, consumer_secret: CONSUMER_SECRET};

    request.post({url: `${REQUEST_TOKEN_URL}/?oauth_callback=${protocol_name}://storetoken`, oauth: oauth}, (e, r, body) => {
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
        win.on('closed', () => {
            reject(new Error('Auth window was closed before completing authentication'));
        });
    };
}

exports.oauth1RegisterScheme   = oauth1RegisterScheme;
exports.oauth1RegisterProtocol = oauth1RegisterProtocol;
exports.oauth1Authenticate     = oauth1Authenticate;