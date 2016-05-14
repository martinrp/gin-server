'use strict';

function getPrimaryLang (langs) {
    let primaryLang = 'No primary language';
    if (typeof langs === 'string'){
        primaryLang = this.splitLangs(langs)[0];
    } else {
        console.log('Error - Not a string');
    }
    return primaryLang;
}

function splitLangs (str) {
    let item;
    let langs = [];
    if (!str) { return; }

    langs = (String(str)).split(',').reduce(function(p, c){
        let splitArr = c.split(';');
        let lang = splitArr[0];
        return p.concat(lang);
    }, []);

    return langs;
}

module.exports = {
    getPrimaryLang: getPrimaryLang,
    splitLangs: splitLangs
}