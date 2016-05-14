'use strict';

let UserLang = require('./user-language');

// Ideally use template engine
function getHtml(req, addHtml) {
    let language = UserLang.getPrimaryLang(req.headers['accept-language']);
    addHtml = (typeof addHtml === 'string') ? addHtml : '';

    let html = `
    <div class="row">
        <div class="col-md-12">
            <h3>Your language is: ${language}</h3>
            <h3>You sent a: ${req.method}</h3>
        </div>
    </div>
    ${addHtml}
    `;

    return _injectIntoContainerHtml(html);
}

function getNoPostVarHtml(content){
    return _injectIntoContainerHtml(content);
}

function _injectIntoContainerHtml(content){
    let html = `
    <!DOCTYPE html>
    <html>
        <head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap.min.css">
            <title>Node simple server</title>
        </head>
        <body>
            <div class="container">
                ${content}
            </div>
        </body>
    </html>
    `;
    return html;
}

module.exports = {
    getHtml: getHtml,
    getNoPostVarHtml: getNoPostVarHtml
}