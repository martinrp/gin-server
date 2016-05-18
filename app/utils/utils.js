'use strict';

import app from '../index';

export function isDev(){
    return app.get('env') === 'development';
}