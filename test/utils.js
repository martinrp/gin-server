'use strict';

// TODO: Convert to ES6 and get it to work running through babel so that app can be tested

import { assert, expect } from 'chai';
// import app from '../app/index';
import userLang from '../app/utils/user-language.js';

describe('Utils', function() {
    describe('Split languages', function () {
        it('should return an array with 4 languages', function () {
            let testString = 'en-gb,en;q=0.8, ru;q=0.7, uk;q=0.3';
            let testArray = userLang.splitLangs(testString);

            expect(testArray).to.be.an('array');
            expect(testArray).to.have.length(4);
        });
    });

    describe('Get Primary Lang', function () {
        it('should return the string en-gb', function () {
            let testString = 'en-gb,en;q=0.8, ru;q=0.7';
            let primaryLang = userLang.getPrimaryLang(testString);

            expect(primaryLang).to.be.a('string');
            expect(primaryLang).to.equal('en-gb');
        });
    });
});