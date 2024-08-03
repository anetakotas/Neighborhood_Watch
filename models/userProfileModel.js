// userProfileModel.js

const mongoose = require('mongoose');

const userProfileSchema = mongoose.Schema(
    {
        profile_id: {
            type: String,
            required: true,
            unique: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        member_since: {
            type: String,
            required: true
        },
        profile_picture: {
            type: String,
            default: ''
        },
        bio: {
            type: String,
            default: ''
        },
        first_name: {
            type: String,
            default: ''
        },
        last_name: {
            type: String,
            default: ''
        }
    },
    {
        timestamps: true
    }
);

const UserProfile = mongoose.model('UserProfile', userProfileSchema, 'userprofiles');

module.exports = UserProfile;
