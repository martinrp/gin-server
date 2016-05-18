'use strict';

import mongoose from 'mongoose';

// Mongoose Schema definition
let Schema = mongoose.Schema;
let UserSchema = new Schema({
    username: String,
    password: String,
    email: String
});

// Mongoose Model definition
let User = mongoose.model('users', UserSchema);

export default User;
